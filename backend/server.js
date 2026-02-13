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


const PORT = 5555;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/users', async (req, res) => {
    try {
        // Create and execute our queries
        const query1 = `SELECT Users.userID, Users.userName, Users.email, Users.phoneNumber, Subscriptions.subscriptionName FROM Users \
            LEFT JOIN Subscriptions ON Users.subscriptionID = Subscriptions.subscriptionID;`;
        const query2 = `SELECT * FROM Subscriptions;`;
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
        const query1 = `SELECT Invoices.invoiceID, Invoices.invoiceDate, Invoices.billingAddress, Users.userID, Users.userName, Subscriptions.subscriptionID, Subscriptions.subscriptionName FROM Invoices \
            INNER JOIN Users ON Invoices.userID = Users.userID \ 
            INNER JOIN Subscriptions ON Invoices.subscriptionID = Subscriptions.subscriptionID;`;
        const query2 = `SELECT * FROM Users;`;
        const query3 = `SELECT * FROM Subscriptions;`;
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
        const query1 = `SELECT * FROM Subscriptions;`;
        const query2 = `SELECT * FROM SubscriptionFeatures;`;
        const query3 = `SELECT * FROM Features;`;
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
        const query1 = `SELECT Users.userID, Users.userName, Preferences.settingID, Preferences.settingName, Preferences.settingValue FROM Preferences \
            JOIN Users ON Preferences.userID = Users.userID;`;
        const query2 = `SELECT * FROM Users;`;
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
