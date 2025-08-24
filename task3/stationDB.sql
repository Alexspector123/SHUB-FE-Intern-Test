 CREATE DATABASE IF NOT EXISTS station_management;

use station_management;
CREATE TABLE Stations (
    station_id INT AUTO_INCREMENT PRIMARY KEY,
    stationName VARCHAR(100) NOT NULL
);

CREATE TABLE Products (
    Product_id INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    Unit VARCHAR(20) DEFAULT 'L',
    Price DECIMAL(10,2) NOT NULL
);

CREATE TABLE Pillars (
    Pillar_id INT AUTO_INCREMENT PRIMARY KEY,
    Station_id INT NOT NULL,
    Product_id INT NOT NULL,
    PillarCode VARCHAR(50),
    FOREIGN KEY (Station_id) REFERENCES Stations(Station_id),
    FOREIGN KEY (Product_id) REFERENCES Products(Product_id)
);

CREATE TABLE Customers (
    Customer_id INT AUTO_INCREMENT PRIMARY KEY,
    CustomerCode VARCHAR(100) NOT NULL UNIQUE DEFAULT 'KhachLe',
    CustomerName VARCHAR(100),
    CustomerType VARCHAR(100),
    LicensePlate VARCHAR(20)
);

CREATE TABLE Staffs (
    Staff_id INT AUTO_INCREMENT PRIMARY KEY,
    StaffName VARCHAR(100) NOT NULL,
    Station_id INT,
    FOREIGN KEY (Station_id) REFERENCES Stations(Station_id)
);

CREATE TABLE Transactions (
    Transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    TransactionDate DATETIME NOT NULL,
    Station_id INT NOT NULL,
    Pillar_id INT NOT NULL,
    Product_id INT NOT NULL,
    Customer_id INT,
    Staff_id INT,
    Quantity DECIMAL(10,2) NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    TotalCost DECIMAL(12,2) GENERATED ALWAYS AS (Quantity * UnitPrice) STORED,
    PaymentStatus ENUM('pending','paid', 'cash') DEFAULT 'cash',
    BillStatus INT,
    PaymentDate DATETIME,
    FOREIGN KEY (Station_id) REFERENCES Stations(Station_id),
    FOREIGN KEY (Pillar_id) REFERENCES Pillars(Pillar_id),
    FOREIGN KEY (Product_id) REFERENCES Products(Product_id),
    FOREIGN KEY (Customer_id) REFERENCES Customers(Customer_id),
    FOREIGN KEY (Staff_id) REFERENCES Staffs(Staff_id),
    INDEX idx_station_date (Station_id, TransactionDate),
    INDEX idx_pillar_date (Pillar_id, TransactionDate)
);

INSERT INTO Stations (stationName) VALUES
('Station A'),
('Station B'),
('Station C');

INSERT INTO Pillars (Station_id, Product_id, PillarCode)
VALUES
(1, 1, '01'),
(1, 2, '02'),
(2, 3, '03');

INSERT INTO Products (ProductName, Unit, Price)
VALUES
('Gasoline RON95', 'L', 23000.00),
('Gasoline E5 RON92', 'L', 21000.00),
('Diesel', 'L', 18000.00);

INSERT INTO Customers (CustomerCode, CustomerName, CustomerType, LicensePlate)
VALUES
('KhachLe', 'Khách lẻ', NULL, NULL),
('CUST001', 'Công ty Vận tải A', 'Khách công nợ', '51A-12345'),
('CUST002', 'Anh Nam', 'Khách công nợ', '59B1-67890');

INSERT INTO Staffs (StaffName, Station_id)
VALUES
('Nguyễn Văn A', 1),
('Trần Thị B', 2);

INSERT INTO Transactions 
(TransactionDate, Station_id, Pillar_id, Product_id, Customer_id, Staff_id, Quantity, UnitPrice, PaymentStatus, BillStatus, PaymentDate)
VALUES
('2025-08-23 08:30:00', 1, 1, 1, 1, 1, 10.5, 23000.00, 'cash', 1, '2025-08-23 08:35:00'),
('2025-08-23 09:00:00', 1, 2, 2, 3, 1, 5.0, 21000.00, 'paid', 1, '2025-08-23 09:05:00'),
('2025-08-23 10:15:00', 2, 3, 3, 2, 2, 50.0, 18000.00, 'pending', 0, NULL);

SELECT * 
FROM Transactions
WHERE station_id = 1 AND TransactionDate BETWEEN '2025-08-01' AND '2025-08-31';

SELECT DATE(TransactionDate) AS Ngay, SUM(TotalCost)
FROM Transactions
WHERE pillar_id = 1
GROUP BY Ngay
ORDER BY Ngay;

SELECT DATE(TransactionDate) AS Ngay, SUM(TotalCost)
FROM Transactions
WHERE station_id = 1
GROUP BY Ngay
ORDER BY Ngay;

SELECT p.ProductName, SUM(t.Quantity)
FROM Transactions t
JOIN Products p ON t.product_id = p.product_id
WHERE t.station_id = 1 AND MONTH(t.TransactionDate) = 8 AND YEAR(t.TransactionDate) = 2025
GROUP BY p.ProductName
ORDER BY SUM(t.Quantity)
LIMIT 3;