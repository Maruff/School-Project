
---

### **1. Currency Master (`currency`)**
| Field Name     | Data Type      | Constraints               | Description                   |
|---------------|---------------|---------------------------|-------------------------------|
| id            | INT           | PRIMARY KEY, AUTO_INCREMENT | Unique ID for currency       |
| code          | VARCHAR(3)     | UNIQUE, NOT NULL         | ISO Currency Code (e.g., INR, USD) |
| name          | VARCHAR(100)   | NOT NULL                 | Currency Name (e.g., Indian Rupee) |
| symbol        | VARCHAR(10)    | NOT NULL                 | Currency Symbol (e.g., ₹, $) |
| exchange_rate | DECIMAL(10,4)  | DEFAULT 1.0000           | Exchange rate relative to base currency |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP | Timestamp of creation        |
| updated_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update |

---

### **2. Company Master (`company`)**
| Field Name  | Data Type     | Constraints               | Description                    |
|------------|--------------|---------------------------|--------------------------------|
| id         | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique ID for company        |
| name       | VARCHAR(255) | NOT NULL                 | Name of the company           |
| legal_name | VARCHAR(255) | NOT NULL                 | Registered legal name         |
| gst_number | VARCHAR(20)  | UNIQUE, NULLABLE         | GST Number                    |
| pan_number | VARCHAR(10)  | UNIQUE, NULLABLE         | PAN Number                    |
| currency_id| INT          | FOREIGN KEY REFERENCES `currency(id)` | Default currency for company |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Timestamp of creation         |
| updated_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update |

---

### **3. Chart of Accounts (`coa_master`)**
| Field Name  | Data Type      | Constraints               | Description                      |
|------------|---------------|---------------------------|----------------------------------|
| id         | INT           | PRIMARY KEY, AUTO_INCREMENT | Unique ID for Chart of Account |
| code       | VARCHAR(20)   | UNIQUE, NOT NULL         | Account Code                    |
| name       | VARCHAR(255)  | NOT NULL                 | Account Name                    |
| type       | ENUM('Asset', 'Liability', 'Equity', 'Revenue', 'Expense') | NOT NULL | Account Type |
| parent_id  | INT           | FOREIGN KEY REFERENCES `coa_master(id)` NULLABLE | Parent Account (if any) |
| created_at | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Timestamp of creation           |
| updated_at | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update |

---

### **4. Financial Year (`financial_year`)**
| Field Name  | Data Type   | Constraints               | Description                      |
|------------|------------|---------------------------|----------------------------------|
| id         | INT        | PRIMARY KEY, AUTO_INCREMENT | Unique ID for financial year   |
| start_date | DATE       | NOT NULL                 | Start date of financial year    |
| end_date   | DATE       | NOT NULL                 | End date of financial year      |
| status     | ENUM('Open', 'Closed') | DEFAULT 'Open' | Status of the financial year    |
| created_at | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP | Timestamp of creation           |
| updated_at | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update |

---

### **5. Address Type Master (`address_type`)**
| Field Name  | Data Type      | Constraints               | Description                       |
|------------|---------------|---------------------------|-----------------------------------|
| id         | INT           | PRIMARY KEY, AUTO_INCREMENT | Unique ID for address type      |
| name       | VARCHAR(100)  | UNIQUE, NOT NULL         | Address Type (Billing, Shipping, Contact Person, etc.) |
| created_at | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Timestamp of creation           |
| updated_at | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update |

---

### **6. Address Master (`address`)**
| Field Name   | Data Type      | Constraints               | Description                     |
|-------------|---------------|---------------------------|---------------------------------|
| id          | INT           | PRIMARY KEY, AUTO_INCREMENT | Unique ID for address         |
| party_id    | INT           | FOREIGN KEY REFERENCES `parties(id)` | Reference to Party |
| address_type_id | INT       | FOREIGN KEY REFERENCES `address_type(id)` | Address type (Billing, Shipping, etc.) |
| line_1      | VARCHAR(255)  | NOT NULL                 | Address Line 1                 |
| line_2      | VARCHAR(255)  | NULLABLE                 | Address Line 2                 |
| city_id     | INT           | FOREIGN KEY REFERENCES `city(id)` | Reference to city             |
| state_id    | INT           | FOREIGN KEY REFERENCES `state(id)` | Reference to state            |
| country_id  | INT           | FOREIGN KEY REFERENCES `country(id)` | Reference to country          |
| postal_code | VARCHAR(10)   | NOT NULL                 | Postal Code                    |
| created_at  | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Timestamp of creation          |
| updated_at  | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update |

---

### **7. Parties (`parties`)**
| Field Name  | Data Type     | Constraints               | Description                   |
|------------|--------------|---------------------------|-------------------------------|
| id         | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique ID for party          |
| name       | VARCHAR(255) | NOT NULL                 | Name of Party                 |
| type       | ENUM('Customer', 'Supplier', 'Employee', 'Shareholder') | NOT NULL | Party Type |
| gst_number | VARCHAR(20)  | UNIQUE, NULLABLE         | GST Number (if applicable)    |
| pan_number | VARCHAR(10)  | UNIQUE, NULLABLE         | PAN Number (if applicable)    |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Timestamp of creation         |
| updated_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update |

---

### **8. Transaction Type (`transaction_type`)**
| Field Name  | Data Type      | Constraints               | Description                      |
|------------|---------------|---------------------------|----------------------------------|
| id         | INT           | PRIMARY KEY, AUTO_INCREMENT | Unique ID for transaction type |
| name       | VARCHAR(100)  | UNIQUE, NOT NULL         | Transaction Type (Invoice, Receipt, Payment, etc.) |
| created_at | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Timestamp of creation           |
| updated_at | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update |

---

### **9. Exchange Rate (`exchange_rate`)**
| Field Name      | Data Type      | Constraints               | Description                     |
|----------------|---------------|---------------------------|---------------------------------|
| id             | INT           | PRIMARY KEY, AUTO_INCREMENT | Unique ID for exchange rate   |
| currency_id    | INT           | FOREIGN KEY REFERENCES `currency(id)` | Foreign key to Currency      |
| date           | DATE          | NOT NULL                 | Date of exchange rate          |
| rate           | DECIMAL(10,4) | NOT NULL                 | Exchange rate value            |
| created_at     | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Timestamp of creation          |
| updated_at     | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update |

---

