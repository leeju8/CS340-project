-- Stored Procedures

-- =====================================================
-- SELECT PROCEDURES
-- =====================================================
-- Users table
DROP PROCEDURE IF EXISTS sp_select_users_table;
DELIMITER //
CREATE PROCEDURE sp_select_users_table()
BEGIN
    SELECT Users.userID AS "User ID", Users.userName AS "User Name", Users.email AS "Email", Users.phoneNumber AS "Phone Number", Subscriptions.subscriptionName AS "Subscription Name" FROM Users \
        LEFT JOIN Subscriptions ON Users.subscriptionID = Subscriptions.subscriptionID;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_select_users_table_helper;
DELIMITER //
CREATE PROCEDURE sp_select_users_table_helper()
BEGIN
    SELECT Subscriptions.subscriptionName AS "Subscription Name" FROM Subscriptions;
END //
DELIMITER ;

-- Invoices table
DROP PROCEDURE IF EXISTS sp_select_invoices_table;
DELIMITER //
CREATE PROCEDURE sp_select_invoices_table()
BEGIN
    SELECT Invoices.invoiceID AS "Invoice ID", Invoices.invoiceDate AS "Invoice Date", Invoices.billingAddress AS "Billing Address", Users.userID AS "User ID", Users.userName AS "User Name", Subscriptions.subscriptionID AS "Subscription ID", Subscriptions.subscriptionName AS "Subscription Name" FROM Invoices \
        INNER JOIN Users ON Invoices.userID = Users.userID \
        INNER JOIN Subscriptions ON Invoices.subscriptionID = Subscriptions.subscriptionID;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_select_invoices_table_helper1;
DELIMITER //
CREATE PROCEDURE sp_select_invoices_table_helper1()
BEGIN
    SELECT Users.userID AS "User ID", Users.userName AS "User Name" FROM Users;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_select_invoices_table_helper2;
DELIMITER //
CREATE PROCEDURE sp_select_invoices_table_helper2()
BEGIN
    SELECT Subscriptions.subscriptionID AS "Subscription ID", Subscriptions.subscriptionName AS "Subscription Name" FROM Subscriptions;
END //
DELIMITER ;

-- Subscriptions table
DROP PROCEDURE IF EXISTS sp_select_subscriptions_table;
DELIMITER //
CREATE PROCEDURE sp_select_subscriptions_table()
BEGIN
    SELECT Subscriptions.subscriptionID AS "Subscription ID", Subscriptions.subscriptionName AS "Subscription Name", Subscriptions.subscriptionCost AS "Subscription Cost" FROM Subscriptions;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_select_subscriptions_table_helper1;
DELIMITER //
CREATE PROCEDURE sp_select_subscriptions_table_helper1()
BEGIN
    SELECT SubscriptionFeatures.subscriptionID AS "Subscription ID", SubscriptionFeatures.featureID AS "Feature ID" FROM SubscriptionFeatures;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_select_subscriptions_table_helper2;
DELIMITER //
CREATE PROCEDURE sp_select_subscriptions_table_helper2()
BEGIN
    SELECT Features.featureID AS "Feature ID", Features.featureName AS "Feature Name", Features.featureDescription AS "Feature Description" FROM Features;
END //
DELIMITER ;

-- Features table
DROP PROCEDURE IF EXISTS sp_select_features_table;
DELIMITER //
CREATE PROCEDURE sp_select_features_table()
BEGIN
    SELECT Users.userID AS "User ID", Users.userName AS "User Name", Preferences.settingID AS "Setting ID", Preferences.settingName AS "Setting Name", Preferences.settingValue AS "Setting Value" FROM Preferences \
        JOIN Users ON Preferences.userID = Users.userID;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_select_features_table_helper1;
DELIMITER //
CREATE PROCEDURE sp_select_features_table_helper1()
BEGIN
    SELECT Users.userID AS "User ID", Users.userName AS "User Name" FROM Users;
END //
DELIMITER ;

-- =====================================================
-- RESET TABLES PROCEDURE
-- =====================================================
DROP PROCEDURE IF EXISTS sp_reset_tables;
DELIMITER //
CREATE PROCEDURE sp_reset_tables()
BEGIN
    -- SQL and procedural logic
    SET FOREIGN_KEY_CHECKS = 0;
    START TRANSACTION;

    DROP TABLE IF EXISTS SubscriptionFeatures;
    DROP TABLE IF EXISTS Preferences;
    DROP TABLE IF EXISTS Invoices;
    DROP TABLE IF EXISTS Features;
    DROP TABLE IF EXISTS Users;
    DROP TABLE IF EXISTS Subscriptions;

    CREATE TABLE Subscriptions (
        subscriptionID INT AUTO_INCREMENT PRIMARY KEY,
        subscriptionName VARCHAR(50) NOT NULL UNIQUE,
        subscriptionCost DECIMAL(6,2) NOT NULL
    ) ENGINE=InnoDB;

    CREATE TABLE Users (
        userID INT AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        phoneNumber VARCHAR(20),
        subscriptionID INT NOT NULL,
        FOREIGN KEY (subscriptionID)
            REFERENCES Subscriptions(subscriptionID)
            ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE Features (
        featureID INT AUTO_INCREMENT PRIMARY KEY,
        featureName VARCHAR(50) NOT NULL UNIQUE,
        featureDescription VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB;

    CREATE TABLE SubscriptionFeatures (
        subscriptionID INT NOT NULL,
        featureID INT NOT NULL,
        PRIMARY KEY (subscriptionID, featureID),
        FOREIGN KEY (subscriptionID)
            REFERENCES Subscriptions(subscriptionID)
            ON DELETE CASCADE,
        FOREIGN KEY (featureID)
            REFERENCES Features(featureID)
            ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE Preferences (
        settingID INT AUTO_INCREMENT PRIMARY KEY,
        settingName VARCHAR(50) NOT NULL,
        settingValue VARCHAR(50) NOT NULL,
        userID INT NOT NULL,
        FOREIGN KEY (userID)
            REFERENCES Users(userID)
            ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE Invoices (
        invoiceID INT AUTO_INCREMENT PRIMARY KEY,
        invoiceDate DATETIME NOT NULL,
        billingAddress VARCHAR(255) NOT NULL,
        userID INT NOT NULL,
        subscriptionID INT NOT NULL,
        FOREIGN KEY (userID)
            REFERENCES Users(userID)
            ON DELETE CASCADE,
        FOREIGN KEY (subscriptionID)
            REFERENCES Subscriptions(subscriptionID)
            ON DELETE CASCADE
    ) ENGINE=InnoDB;

    INSERT INTO Subscriptions VALUES
    (1,'Free',0.00),
    (2,'Pro',5.00),
    (3,'Max',10.00);

    INSERT INTO Users VALUES
    (1,'alice01','alice@example.com','333-871-8431',1),
    (2,'scott12','scott@gmail.com','111-541-5441',2),
    (3,'toliver03','toliver@yahoo.com','444-274-5271',3),
    (4,'dave04','dave@outlook.com','222-808-1343',2);

    INSERT INTO Features VALUES
    (1,'Basic Analytics','Access to basic usage analytics'),
    (2,'Advanced Analytics','Detailed analytics and reports'),
    (3,'Priority Support','24/7 priority customer support'),
    (4,'Custom Branding','Ability to customize branding');

    INSERT INTO SubscriptionFeatures VALUES
    (1,1),
    (2,1),(2,2),
    (3,1),(3,2),(3,3),(3,4);

    INSERT INTO Preferences VALUES
    (1,'theme','dark',1),
    (2,'notifications','enabled',1),
    (3,'theme','light',2),
    (4,'language','en',3),
    (5,'notifications','disabled',4);

    INSERT INTO Invoices VALUES
    (1,'2026-01-01 10:00:00','123 Birch St, Portland, OR',2,2),
    (2,'2026-01-15 12:30:00','456 Spur Ave, New York , NY',3,3),
    (3,'2026-02-01 09:45:00','456 Oak Ave, Miami, FL',3,3),
    (4,'2026-02-01 14:00:00','789 Pine Rd, San Jose, CA',4,2);

    SET FOREIGN_KEY_CHECKS = 1;
    COMMIT;
END //
DELIMITER ;

-- =====================================================
-- UNIVERSAL DELETE PROCEDURE
-- =====================================================

DROP PROCEDURE IF EXISTS sp_universal_delete;
DELIMITER //

CREATE PROCEDURE sp_universal_delete(
    IN p_table_name VARCHAR(64),
    IN p_id INT
)
BEGIN
    DECLARE v_pk_column VARCHAR(64);
    DECLARE v_table_exists INT;

    -- Validate table exists
    SELECT COUNT(*)
    INTO v_table_exists
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = p_table_name;

    IF v_table_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid table name.';
    END IF;

    -- Map table to primary key column
    CASE p_table_name
        WHEN 'Subscriptions' THEN SET v_pk_column = 'subscriptionID';
        WHEN 'Users' THEN SET v_pk_column = 'userID';
        WHEN 'Features' THEN SET v_pk_column = 'featureID';
        WHEN 'Preferences' THEN SET v_pk_column = 'settingID';
        WHEN 'Invoices' THEN SET v_pk_column = 'invoiceID';
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Delete not supported for this table.';
    END CASE;

    -- Build and execute dynamic DELETE
    SET @sql = CONCAT(
        'DELETE FROM ',
        p_table_name,
        ' WHERE ',
        v_pk_column,
        ' = ?'
    );

    PREPARE stmt FROM @sql;
    SET @id_value = p_id;
    EXECUTE stmt USING @id_value;
    DEALLOCATE PREPARE stmt;

END //

DELIMITER ;