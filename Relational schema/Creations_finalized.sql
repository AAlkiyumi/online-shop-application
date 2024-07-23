CREATE TABLE Customer (
    cust_ID INT,
    name VARCHAR(30),
    balance DECIMAL(10, 2),
    email VARCHAR(30),
    password VARCHAR(20),
    PRIMARY KEY (cust_ID)
);

CREATE TABLE Address (
    address_ID INT,
    street VARCHAR(20),
    city VARCHAR(20),
    state VARCHAR(2),
    zipcode VARCHAR(5),
    country VARCHAR(3),
    type CHAR(1),
    PRIMARY KEY (address_ID)
);

CREATE TABLE Credit_Card (
    card_no INT,
    card_type VARCHAR(15),
    expiry_date VARCHAR(7),
    address_ID INT,
    cust_ID INT,
    PRIMARY KEY (card_no, card_type, expiry_date),
    FOREIGN KEY (address_ID) REFERENCES Address(address_ID),
    FOREIGN KEY (cust_ID) REFERENCES Customer(cust_ID)
);

CREATE TABLE Staff (
    staff_ID INT,
    name VARCHAR(30),
    work_email VARCHAR(30),
    password VARCHAR(20),
    address_ID INT,
    salary DECIMAL(10, 2),
    job_title VARCHAR(30),
    PRIMARY KEY (staff_ID),
    FOREIGN KEY (address_ID) REFERENCES Address(address_ID)
);

CREATE TABLE Product (
    prod_ID INT,
    name VARCHAR(30),
    category VARCHAR(20),
    brand VARCHAR(20),
    size DECIMAL(10, 2),
    size_unit VARCHAR(15),
    description VARCHAR(300),
    price DECIMAL(10, 2),
    PRIMARY KEY (prod_ID)
);

CREATE TABLE Warehouse (
    warehouse_ID INT,
    address_ID INT,
    PRIMARY KEY (warehouse_ID),
    FOREIGN KEY (address_ID) REFERENCES Address(address_ID)
);

CREATE TABLE Stock (
    prod_ID INT,
    warehouse_ID INT,
    quantity INT,
    PRIMARY KEY (prod_ID, warehouse_ID),
    FOREIGN KEY (prod_ID) REFERENCES Product(prod_ID),
    FOREIGN KEY (warehouse_ID) REFERENCES Warehouse(warehouse_ID)
);

CREATE TABLE CustOrder (
    order_ID INT,
    order_date DATE,
    status CHAR(1),
    total_price DECIMAL(10, 2),
    card_no INT,
    card_type VARCHAR(15),
    expiry_date VARCHAR(7),
    cust_ID INT,
    PRIMARY KEY (order_ID),
    FOREIGN KEY (cust_ID) REFERENCES Customer(cust_ID),
    FOREIGN KEY (card_no, card_type, expiry_date) REFERENCES Credit_Card(card_no, card_type, expiry_date)
);

CREATE TABLE OrderItem (
    prod_ID INT,
    quantity INT,
    order_ID INT,
    PRIMARY KEY (prod_ID, order_ID),
    FOREIGN KEY (prod_ID) REFERENCES Product(prod_ID),
    FOREIGN KEY (order_ID) REFERENCES CustOrder(order_ID)
);

CREATE TABLE DeliveryPlan (
    dp_ID INT,
    delivery_type CHAR(1),
    delivery_price DECIMAL(10, 2),
    delivery_date DATE,
    ship_date DATE,
    order_ID INT,
    PRIMARY KEY (dp_ID, order_ID),
    FOREIGN KEY (order_ID) REFERENCES CustOrder(order_ID)
);
