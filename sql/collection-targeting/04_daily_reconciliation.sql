-- PUBLIC DEMO ONLY: fictional schema, tables, source columns and unit codes.
-- Oracle-compatible SELECT example. No connection, credentials or real data.
-- Inputs: &inventory_date, &period_start, &period_end (DD.MM.YYYY).
-- Final aliases are the generic HTML import contract, not source column names.
SELECT q.snapshot_date AS TARIH,
       q.inventory_date AS ENVANTER_TARIHI,
       q.period_start AS ILK_TARIH,
       q.period_end AS SON_TARIH,
       q.branch_key AS SUBEKODU,
       q.unit_key AS TAKIPBIRIMKODU,
       q.risk_band AS KIRILIM,
       q.segment_key AS EYO,
       q.case_status AS TAKIPDOSYADURUMKODU,
       q.match_status AS ESLESME_DURUMU,
       q.daily_collection AS TOPLAMTAHSILAT,
       q.principal_paid AS ANAPARA_TAHSILATI,
       q.null_component_count AS NULL_BILESEN_ADEDI,
       q.duplicate_count AS MUKERRER_HESAP_ADEDI,
       q.missing_count AS EKSIK_ALAN_ADEDI,
       q.snapshot_count AS ENVANTER_SATIR_ADEDI
FROM (
WITH
demo_parameters AS (
 SELECT TO_DATE('&inventory_date','DD.MM.YYYY') AS inventory_date,
        TO_DATE('&period_start','DD.MM.YYYY') AS period_start,
        TO_DATE('&period_end','DD.MM.YYYY') AS period_end
 FROM DUAL
),
demo_inventory AS (
 SELECT E.customer_key,E.account_key,E.branch_key,E.unit_key,
        E.case_status,E.original_principal,E.balance_amount,
        E.customer_type,E.collateral_tag,E.default_date,
        TRUNC(E.snapshot_date)-TRUNC(E.default_date) AS age_days
 FROM DEMO_FINANCE.demo_snapshot E CROSS JOIN demo_parameters P
 WHERE E.snapshot_date>=P.inventory_date AND E.snapshot_date<P.inventory_date+1
 AND E.case_status IN (1,2,3,4,5,14)
 AND EXISTS (SELECT 1 FROM DEMO_FINANCE.demo_cases D
             WHERE D.case_id=E.case_key AND D.is_current=1 AND NVL(D.case_group,0)<>2)
),
demo_uniqueness AS (
 SELECT account_key,COUNT(*) AS row_count FROM demo_inventory GROUP BY account_key
),
demo_controls AS (
 SELECT (SELECT COUNT(*) FROM demo_uniqueness WHERE row_count>1) AS duplicate_count,
        (SELECT COUNT(*) FROM demo_inventory WHERE account_key IS NULL OR customer_key IS NULL
          OR original_principal IS NULL OR balance_amount IS NULL) AS missing_count,
        (SELECT COUNT(*) FROM demo_inventory) AS snapshot_count
 FROM DUAL
),
demo_exposure AS (
 SELECT E.*,
 SUM(original_principal) OVER(PARTITION BY customer_key) AS customer_exposure
 FROM demo_inventory E
),
demo_classification AS (
 SELECT R.*,
 CASE WHEN customer_key IS NULL OR customer_exposure IS NULL THEN NULL
      WHEN customer_exposure>20000000 THEN 3
      WHEN customer_exposure>10000000 THEN 2 ELSE 1 END AS risk_band,
 CASE WHEN TRIM(collateral_tag) IS NULL THEN 'BILINMIYOR'
      WHEN TRIM(collateral_tag) LIKE '%77' OR TRIM(collateral_tag) LIKE '%88' THEN 'TEMINATLI'
      ELSE 'TEMINATSIZ' END AS security_kind,
 CASE WHEN age_days IS NULL OR age_days<0 THEN 'BILINMIYOR'
      WHEN age_days<365 THEN 'YENI' WHEN age_days<1095 THEN 'ORTA' ELSE 'ESKI' END AS commercial_age
 FROM demo_exposure R
),
demo_segments AS (
 SELECT S.*,
 CASE WHEN age_days IS NULL OR age_days<0 THEN 'SINIFLANDIRILAMADI'
 WHEN customer_type='1' THEN
   CASE WHEN age_days<90 THEN 'Bireysel90' WHEN age_days<180 THEN 'Bireysel180'
        WHEN age_days<270 THEN 'Bireysel270' WHEN age_days<365 THEN 'Bireysel365'
        WHEN age_days<1095 THEN 'Bireysel Orta' ELSE 'Bireysel Eski' END
 WHEN customer_type='2' AND security_kind<>'BILINMIYOR' THEN
   CASE WHEN security_kind='TEMINATLI' THEN 'Teminatlı Ticari ' ELSE 'Teminatsız Ticari ' END ||
   CASE commercial_age WHEN 'YENI' THEN 'Yeni' WHEN 'ORTA' THEN 'Orta' ELSE 'Eski' END
 ELSE 'SINIFLANDIRILAMADI' END AS segment_key
 FROM demo_classification S
),
total_collection AS (
 SELECT THD.account_key, TRUNC(THD.posted_date) AS snapshot_date,
 SUM(CASE WHEN THD.component_type=1 THEN NVL(THD.applied_amount,0) ELSE 0 END) AS principal_paid,
 SUM(CASE WHEN THD.component_type=3 THEN NVL(THD.applied_amount,0) ELSE 0 END) AS fee_paid,
 SUM(CASE WHEN THD.component_type=2 THEN NVL(THD.applied_amount,0) ELSE 0 END) AS fixed_interest_paid,
 SUM(CASE WHEN THD.component_type IN (1,2) THEN NVL(THD.accrued_amount,0) ELSE 0 END) AS accrued_interest_paid,
 SUM(CASE WHEN (THD.component_type IN (1,2,3) AND THD.applied_amount IS NULL)
               OR (THD.component_type IN (1,2) AND THD.accrued_amount IS NULL)
          THEN 1 ELSE 0 END) AS null_component_count
 FROM DEMO_FINANCE.demo_events THD CROSS JOIN demo_parameters P
 WHERE THD.settlement_type=5 AND THD.event_status IN (1,3)
 AND THD.posted_date >= P.period_start AND THD.posted_date < P.period_end+1
 AND EXISTS (
   SELECT 1 FROM DEMO_FINANCE.demo_cases D
   WHERE D.case_id=THD.case_key AND D.is_current=1 AND NVL(D.case_group,0)<>2
 )
 GROUP BY THD.account_key, TRUNC(THD.posted_date)
),
demo_assignment AS (
 SELECT S.* FROM demo_segments S JOIN demo_uniqueness U ON U.account_key=S.account_key AND U.row_count=1
)
SELECT T.snapshot_date,P.inventory_date,P.period_start,P.period_end,
 S.branch_key,S.unit_key,S.risk_band,S.segment_key,S.case_status,
 CASE WHEN U.row_count>1 THEN 'MUKERRER_ENVANTER'
      WHEN S.account_key IS NULL THEN 'REFERANS_ENVANTERDE_YOK'
      ELSE 'ESLESTI' END AS match_status,
 SUM(T.principal_paid+T.fee_paid+T.fixed_interest_paid+T.accrued_interest_paid) AS daily_collection,
 SUM(T.principal_paid) AS principal_paid,
 SUM(T.null_component_count) AS null_component_count,
 K.duplicate_count,K.missing_count,K.snapshot_count
FROM total_collection T CROSS JOIN demo_parameters P CROSS JOIN demo_controls K
LEFT JOIN demo_assignment S ON S.account_key=T.account_key
LEFT JOIN demo_uniqueness U ON U.account_key=T.account_key
GROUP BY T.snapshot_date,P.inventory_date,P.period_start,P.period_end,
 S.branch_key,S.unit_key,S.risk_band,S.segment_key,S.case_status,
 CASE WHEN U.row_count>1 THEN 'MUKERRER_ENVANTER' WHEN S.account_key IS NULL THEN 'REFERANS_ENVANTERDE_YOK' ELSE 'ESLESTI' END,
 K.duplicate_count,K.missing_count,K.snapshot_count
) q;
