-- Project Step 3 Draft - SaaS Internal Administrative Dashboard
-- Course: CS340
-- Group 23
-- Team Members: Justin Lee, Tyler Quach

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Database Manpulation Queries for the Subscriptions, Features, and SubscriptionFeatures Intersection Table
--     Variables denoted with @ are being used to denote the variables that will have data from the backend programming language.

-- CREATE
-- Create a new Subscription
INSERT INTO Subscriptions (subscriptionName, subscriptionCost) VALUES (@subscriptionNameInput, @subscriptionCostInput);
-- Create a new Feature
INSERT INTO Features (featureName, featureDescription) VALUES (@featureNameInput, @featureDescriptionInput);
-- Create a new SubscriptionFeature
INSERT INTO SubscriptionFeatures (subscriptionID, featureID) VALUES (@subscriptionIDInput, @featureIDInput);

-- READ
-- Get all subscription IDs to populate the Subscription dropdown
SELECT subscriptionID, subscriptionName FROM Subscriptions;
-- Get all feature IDs to populate the Feature dropdown
SELECT featureID, featureName FROM Features;
-- Get all information from Subscriptions
SELECT * FROM Subscriptions;
-- Get all information from Features
SELECT * FROM Features;
-- Get all information from SubscriptionFeatures
SELECT * FROM SubscriptionFeatures;

-- UPDATE
-- Update a Subscription name and cost based on the subscriptionID
UPDATE Subscriptions SET subscriptionName = @subscriptionNameInput, subscriptionCost = @subscriptionCostInput WHERE subscriptionID = @subscriptionIDInput;
-- Update a Feature name and description based on the featureID
UPDATE Features SET featureName = @featureNameInput, featureDescription = @featureDescriptionInput WHERE featureID = @featureIDInput;
-- Update a SubscriptionFeature based on the subscriptionID and featureID
UPDATE SubscriptionFeatures
SET subscriptionID = @newSubscriptionIDInput,
    featureID = @newFeatureIDInput
WHERE subscriptionID = @oldSubscriptionIDInput
AND featureID = @oldFeatureIDInput;

-- DELETE
-- Delete a Subscription based on the subscriptionID
DELETE FROM Subscriptions WHERE subscriptionID = @subscriptionIDInput;
-- Delete a Feature based on the featureID
DELETE FROM Features WHERE featureID = @featureIDInput;
-- Delete a SubscriptionFeature based on the subscriptionID and featureID
DELETE FROM SubscriptionFeatures WHERE subscriptionID = @subscriptionIDInput AND featureID = @featureIDInput;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;