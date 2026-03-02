/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.5.29-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_leeju8
-- ------------------------------------------------------
-- Server version	10.11.15-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Features`
--

DROP TABLE IF EXISTS `Features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Features` (
  `featureID` int(11) NOT NULL AUTO_INCREMENT,
  `featureName` varchar(50) NOT NULL,
  `featureDescription` varchar(255) NOT NULL,
  PRIMARY KEY (`featureID`),
  UNIQUE KEY `featureName` (`featureName`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Features`
--

LOCK TABLES `Features` WRITE;
/*!40000 ALTER TABLE `Features` DISABLE KEYS */;
INSERT INTO `Features` VALUES (1,'Basic Analytics','Access to basic usage analytics'),(2,'Advanced Analytics','Detailed analytics and reports'),(3,'Priority Support','24/7 priority customer support'),(4,'Custom Branding','Ability to customize branding');
/*!40000 ALTER TABLE `Features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Invoices`
--

DROP TABLE IF EXISTS `Invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Invoices` (
  `invoiceID` int(11) NOT NULL AUTO_INCREMENT,
  `invoiceDate` datetime NOT NULL,
  `billingAddress` varchar(255) NOT NULL,
  `userID` int(11) NOT NULL,
  `subscriptionID` int(11) NOT NULL,
  PRIMARY KEY (`invoiceID`),
  KEY `userID` (`userID`),
  KEY `subscriptionID` (`subscriptionID`),
  CONSTRAINT `Invoices_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `Invoices_ibfk_2` FOREIGN KEY (`subscriptionID`) REFERENCES `Subscriptions` (`subscriptionID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoices`
--

LOCK TABLES `Invoices` WRITE;
/*!40000 ALTER TABLE `Invoices` DISABLE KEYS */;
INSERT INTO `Invoices` VALUES (1,'2026-01-01 10:00:00','123 Birch St, Portland, OR',2,2),(2,'2026-01-15 12:30:00','456 Spur Ave, New York , NY',3,3),(3,'2026-02-01 09:45:00','456 Oak Ave, Miami, FL',3,3),(4,'2026-02-01 14:00:00','789 Pine Rd, San Jose, CA',4,2);
/*!40000 ALTER TABLE `Invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preferences`
--

DROP TABLE IF EXISTS `Preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Preferences` (
  `settingID` int(11) NOT NULL AUTO_INCREMENT,
  `settingName` varchar(50) NOT NULL,
  `settingValue` varchar(50) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`settingID`),
  KEY `userID` (`userID`),
  CONSTRAINT `Preferences_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preferences`
--

LOCK TABLES `Preferences` WRITE;
/*!40000 ALTER TABLE `Preferences` DISABLE KEYS */;
INSERT INTO `Preferences` VALUES (1,'theme','dark',1),(2,'notifications','enabled',1),(3,'theme','light',2),(4,'language','en',3),(5,'notifications','disabled',4);
/*!40000 ALTER TABLE `Preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SubscriptionFeatures`
--

DROP TABLE IF EXISTS `SubscriptionFeatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SubscriptionFeatures` (
  `subscriptionID` int(11) NOT NULL,
  `featureID` int(11) NOT NULL,
  PRIMARY KEY (`subscriptionID`,`featureID`),
  KEY `featureID` (`featureID`),
  CONSTRAINT `SubscriptionFeatures_ibfk_1` FOREIGN KEY (`subscriptionID`) REFERENCES `Subscriptions` (`subscriptionID`) ON DELETE CASCADE,
  CONSTRAINT `SubscriptionFeatures_ibfk_2` FOREIGN KEY (`featureID`) REFERENCES `Features` (`featureID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubscriptionFeatures`
--

LOCK TABLES `SubscriptionFeatures` WRITE;
/*!40000 ALTER TABLE `SubscriptionFeatures` DISABLE KEYS */;
INSERT INTO `SubscriptionFeatures` VALUES (1,1),(2,1),(2,2),(3,1),(3,2),(3,3),(3,4);
/*!40000 ALTER TABLE `SubscriptionFeatures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subscriptions`
--

DROP TABLE IF EXISTS `Subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subscriptions` (
  `subscriptionID` int(11) NOT NULL AUTO_INCREMENT,
  `subscriptionName` varchar(50) NOT NULL,
  `subscriptionCost` decimal(6,2) NOT NULL,
  PRIMARY KEY (`subscriptionID`),
  UNIQUE KEY `subscriptionName` (`subscriptionName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subscriptions`
--

LOCK TABLES `Subscriptions` WRITE;
/*!40000 ALTER TABLE `Subscriptions` DISABLE KEYS */;
INSERT INTO `Subscriptions` VALUES (1,'Free',0.00),(2,'Pro',5.00),(3,'Max',10.00);
/*!40000 ALTER TABLE `Subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `subscriptionID` int(11) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userName` (`userName`),
  UNIQUE KEY `email` (`email`),
  KEY `subscriptionID` (`subscriptionID`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`subscriptionID`) REFERENCES `Subscriptions` (`subscriptionID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'alice01','alice@example.com','871-8431',1),(2,'scott12','scott@gmail.com','541-5441',2),(3,'toliver03','toliver@yahoo.com',NULL,3),(4,'dave04','dave@outlook.com','808-1343',2);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-01 20:04:52
