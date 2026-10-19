"""Synthetic query checks with a narrow Oracle-to-SQLite test adapter."""
from pathlib import Path
import re,sqlite3,unittest

BASE=Path(__file__).resolve().parents[2]/'sql/collection-targeting'

def adapt(sql):
    sql=re.sub(r'--[^\n]*','',sql)
    sql=re.sub(r"DATE\s+'([^']+)'",r"'\1'",sql)
    sql=sql.replace('&inventory_date','30.09.2026').replace('&period_start','01.10.2026').replace('&period_end','31.12.2026')
    sql=re.sub(r'TRUNC\((\w+\.\w+)\)-TRUNC\((\w+\.\w+)\)',r'(julianday(\1)-julianday(\2))',sql,flags=re.I)
    sql=re.sub(r'(\b\w+\.(?:inventory_date|period_end))\+1',r"datetime(\1,'+1 day')",sql,flags=re.I)
    return sql

def database():
    db=sqlite3.connect(':memory:'); db.row_factory=sqlite3.Row
    db.execute("ATTACH DATABASE ':memory:' AS DEMO_FINANCE")
    db.execute('CREATE TABLE DUAL (dummy INTEGER)');db.execute('INSERT INTO DUAL VALUES (1)')
    db.create_function('TO_DATE',2,lambda x,fmt:'-'.join(reversed(x.split('.'))))
    db.create_function('TO_CHAR',1,str)
    db.create_function('NVL',2,lambda x,y:y if x is None else x)
    db.create_function('TRUNC',1,lambda x:x[:10] if isinstance(x,str) else x)
    for name in ['00_demo_schema.sql','05_synthetic_seed.sql']:
        db.executescript(adapt((BASE/name).read_text()))
    return db

class SyntheticSQLTests(unittest.TestCase):
    def setUp(self):self.db=database()
    def tearDown(self):self.db.close()
    def query(self,name):return [dict(r) for r in self.db.execute(adapt((BASE/name).read_text()))]
    def test_four_queries_execute_with_import_aliases(self):
        for name in ['01_region_portfolio.sql','02_center_portfolio.sql','03_daily_collections.sql','04_daily_reconciliation.sql']:
            with self.subTest(name=name):
                rows=self.query(name);self.assertTrue(rows);self.assertIn('SUBEKODU',rows[0]);self.assertIn('EYO',rows[0])
    def test_regional_stocks_and_collections(self):
        rows=self.query('01_region_portfolio.sql')
        self.assertEqual(sum(r['STOK'] for r in rows),2300000)
        self.assertEqual(sum(r['TAHSILAT'] for r in rows),31500)
    def test_center_has_three_risk_bands(self):
        rows=self.query('02_center_portfolio.sql')
        self.assertEqual({r['KIRILIM'] for r in rows},{1,2,3})
        self.assertEqual(sum(r['STOK'] for r in rows),37000000)
    def test_daily_unmatched_is_retained(self):
        rows=self.query('03_daily_collections.sql')
        missing=[r for r in rows if r['ESLESME_DURUMU']=='REFERANS_ENVANTERDE_YOK']
        self.assertEqual(len(missing),1);self.assertEqual(missing[0]['TOPLAMTAHSILAT'],7350)
    def test_last_day_included_next_day_excluded(self):
        self.db.execute("INSERT INTO DEMO_FINANCE.demo_events VALUES ('DEMO-A1','2026-12-31 23:59:59',1,100,0,5,1,1)")
        self.db.execute("INSERT INTO DEMO_FINANCE.demo_events VALUES ('DEMO-A1','2027-01-01 00:00:00',1,900,0,5,1,1)")
        self.assertEqual(sum(r['TAHSILAT'] for r in self.query('01_region_portfolio.sql')),31600)
    def test_duplicate_snapshot_blocks_target_amount(self):
        self.db.execute("INSERT INTO DEMO_FINANCE.demo_snapshot SELECT * FROM DEMO_FINANCE.demo_snapshot WHERE account_key='DEMO-A1'")
        rows=self.query('01_region_portfolio.sql')
        self.assertTrue(all(r['STOK'] is None and r['MUKERRER_HESAP_ADEDI']>0 for r in rows))
    def test_customer_risk_calculated_before_unit_filter(self):
        self.db.execute("UPDATE DEMO_FINANCE.demo_snapshot SET customer_key='DEMO-C1' WHERE account_key='DEMO-A3'")
        self.db.execute("UPDATE DEMO_FINANCE.demo_snapshot SET original_principal=22000000 WHERE account_key='DEMO-A1'")
        row=next(r for r in self.query('02_center_portfolio.sql') if r['SUBEKODU']=='DEMO-S001')
        self.assertEqual(row['KIRILIM'],3)

if __name__=='__main__':unittest.main(verbosity=2)
