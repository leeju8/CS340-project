// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 6022;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/users', async (req, res) => {
    try {
        // Create and execute our queries
        const query1 = `SELECT Users.userID AS "User ID", Users.userName AS "User Name", Users.email AS "Email", Users.phoneNumber AS "Phone Number", Subscriptions.subscriptionName AS "Subscription Name" FROM Users \
            LEFT JOIN Subscriptions ON Users.subscriptionID = Subscriptions.subscriptionID;`;
        const query2 = `SELECT Subscriptions.subscriptionName AS "Subscription Name" FROM Subscriptions;`;
        const [users] = await db.query(query1)
        const [subscriptions] = await db.query(query2)
    
        res.status(200).json({ users, subscriptions });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/invoices', async (req, res) => {
    try {
        // Create and execute our queries
        const query1 = `SELECT Invoices.invoiceID AS "Invoice ID", Invoices.invoiceDate AS "Invoice Date", Invoices.billingAddress AS "Billing Address", Users.userID AS "User ID", Users.userName AS "User Name", Subscriptions.subscriptionID AS "Subscription ID", Subscriptions.subscriptionName AS "Subscription Name" FROM Invoices \
            INNER JOIN Users ON Invoices.userID = Users.userID \
            INNER JOIN Subscriptions ON Invoices.subscriptionID = Subscriptions.subscriptionID;`;
        const query2 = `SELECT Users.userID AS "User ID", Users.userName AS "User Name" FROM Users;`;
        const query3 = `SELECT Subscriptions.subscriptionID AS "Subscription ID", Subscriptions.subscriptionName AS "Subscription Name" FROM Subscriptions;`;
        const [invoices] = await db.query(query1)
        const [users] = await db.query(query2)
        const [subscriptions] = await db.query(query3)
    
        res.status(200).json({ invoices, users, subscriptions });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/subscriptions', async (req, res) => {
    try {
        // Create and execute our queries
        const query1 = `SELECT Subscriptions.subscriptionID AS "Subscription ID", Subscriptions.subscriptionName AS "Subscription Name", Subscriptions.subscriptionCost AS "Subscription Cost" FROM Subscriptions;`;
        const query2 = `SELECT SubscriptionFeatures.subscriptionID AS "Subscription ID", SubscriptionFeatures.featureID AS "Feature ID" FROM SubscriptionFeatures;`;
        const query3 = `SELECT Features.featureID AS "Feature ID", Features.featureName AS "Feature Name", Features.featureDescription AS "Feature Description" FROM Features;`;
        const [subscriptions] = await db.query(query1)
        const [subscriptionFeatures] = await db.query(query2)
        const [features] = await db.query(query3)
    
        res.status(200).json({ subscriptions, subscriptionFeatures, features });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/preferences', async (req, res) => {
    try {
        // Create and execute our queries
        const query1 = `SELECT Users.userID AS "User ID", Users.userName AS "User Name", Preferences.settingID AS "Setting ID", Preferences.settingName AS "Setting Name", Preferences.settingValue AS "Setting Value" FROM Preferences \
            JOIN Users ON Preferences.userID = Users.userID;`;
        const query2 = `SELECT Users.userID AS "User ID", Users.userName AS "User Name" FROM Users;`;
        const [preferences] = await db.query(query1)
        const [users] = await db.query(query2)
    
        res.status(200).json({ preferences, users });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
