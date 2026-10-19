-- Fictional Oracle schema. Run only in an isolated DEMO_FINANCE sandbox.
-- The schema/user must already exist. No production connection is provided.
CREATE TABLE DEMO_FINANCE.demo_cases (
    case_id NUMBER PRIMARY KEY,
    is_current NUMBER,
    case_group NUMBER
);
CREATE TABLE DEMO_FINANCE.demo_snapshot (
    customer_key VARCHAR2(40),
    account_key VARCHAR2(40),
    branch_key VARCHAR2(40),
    unit_key VARCHAR2(40),
    case_status NUMBER,
    original_principal NUMBER(18,2),
    balance_amount NUMBER(18,2),
    customer_type VARCHAR2(2),
    collateral_tag VARCHAR2(20),
    default_date DATE,
    snapshot_date DATE,
    case_key NUMBER
);
CREATE TABLE DEMO_FINANCE.demo_events (
    account_key VARCHAR2(40),
    posted_date DATE,
    component_type NUMBER,
    applied_amount NUMBER(18,2),
    accrued_amount NUMBER(18,2),
    settlement_type NUMBER,
    event_status NUMBER,
    case_key NUMBER
);
