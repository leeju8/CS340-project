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

// CREATE ROUTES
app.post('/features', async (req, res) => {
    try {
        // Call the stored procedure
        const { featureName, featureDescription } = req.body
        const query = `CALL sp_create_feature(?, ?)`;
        const result = await db.query(query, [featureName, featureDescription]);
        res.status(200).json({ result });
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries."); 
    }
});

app.post('/subscriptions', async (req, res) => {
    try {
        const { subscriptionName, subscriptionCost } = req.body
        const query = `CALL sp_create_subscription(?, ?)`;
        const result = await db.query(query, [subscriptionName, subscriptionCost]);
        res.status(200).json({result});
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries."); 
    }
});

app.post('/subscriptions/features', async (req, res) => {
    try {
        const { subscriptionID, featureID } = req.body
        const query = `CALL sp_create_subscription_feature(?, ?)`;
        const result = await db.query(query, [subscriptionID, featureID]);
        res.status(200).json({result});
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries."); 
    }
});

app.post('/reset', async (req, res) => {
    try {
        // Create and execute our queries
        const query = `CALL sp_reset_tables()`;
        const [reset_status] = await db.query(query)
    
        res.status(200).json({ reset_status });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// READ ROUTES
app.get('/users', async (req, res) => {
    try {
        // Create and execute our queries
        const query1 = `CALL sp_select_users_table()`;
        const query2 = `CALL sp_select_users_table_helper()`;
        const [usersResult] = await db.query(query1);
        const users = usersResult[0];
        const [subscriptionsResult] = await db.query(query2);
        const subscriptions = subscriptionsResult[0];
    
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
        const query1 = `CALL sp_select_invoices_table()`;
        const query2 = `CALL sp_select_invoices_table_helper1()`;
        const query3 = `CALL sp_select_invoices_table_helper2()`;
        const [invoicesResult] = await db.query(query1);
        const invoices = invoicesResult[0];
        const [usersResult] = await db.query(query2);
        const users = usersResult[0];
        const [subscriptionsResult] = await db.query(query3);
        const subscriptions = subscriptionsResult[0];
    
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
        const query1 = `CALL sp_select_subscriptions_table()`;
        const query2 = `CALL sp_select_subscriptions_table_helper1()`;
        const query3 = `CALL sp_select_subscriptions_table_helper2()`;
        const [subscriptionsResult] = await db.query(query1);
        const subscriptions = subscriptionsResult[0];
        const [subscriptionFeaturesResult] = await db.query(query2);
        const subscriptionFeatures = subscriptionFeaturesResult[0];
        const [featuresResult] = await db.query(query3);
        const features = featuresResult[0];
    
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
        const query1 = `CALL sp_select_features_table()`;
        const query2 = `CALL sp_select_features_table_helper1()`;
        const [preferencesResult] = await db.query(query1)
        const preferences = preferencesResult[0]
        const [usersResult] = await db.query(query2)
        const users = usersResult[0]
    
        res.status(200).json({ preferences, users });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// UPDATE ROUTES
app.put('/features', async (req, res) => {
    try {
        // Call the stored procedure
        const { featureID, featureName, featureDescription } = req.body
        const query = `CALL sp_update_feature(?, ?, ?)`;
        const result = await db.query(query, [featureID, featureName, featureDescription]);
        res.status(200).json({ result });
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries."); 
    }
});

app.put('/subscriptions', async (req, res) => {
    try {
        // Call the stored procedure
        const { subscriptionID, subscriptionName, subscriptionCost } = req.body
        const query = `CALL sp_update_subscription(?, ?, ?)`;
        const result = await db.query(query, [subscriptionID, subscriptionName, subscriptionCost]);
        res.status(200).json({ result });
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries."); 
    }
});

// DELETE ROUTES
app.delete('/delete', async (req, res) => {
    try {
        // Create and execute our queries
        const { table, id } = req.query;
        if (!table || !id) {
            return res.status(400).send("Missing 'table' or 'id' query parameter.");
        }

        // Call the stored procedure
        const query = `CALL sp_universal_delete(?, ?)`;
        const [result] = await db.query(query, [table, id]);
        res.status(200).json({ result });
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
