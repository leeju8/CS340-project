-- Stored Procedures
-- Reset tables
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