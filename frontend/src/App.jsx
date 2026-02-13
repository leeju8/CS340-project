import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Subscriptions from './pages/Subscriptions.jsx';
import Invoices from './pages/Invoices.jsx'
import Users from './pages/Users.jsx'
import Preferences from './pages/Preferences.jsx'

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 6025;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users backendURL={backendURL}/>} />
                <Route path="/subscriptions" element={<Subscriptions backendURL={backendURL}/>} />
                <Route path="/invoices" element={<Invoices backendURL={backendURL}/>} />
                <Route path="/preferences" element={<Preferences backendURL={backendURL}/>} />
            </Routes>
        </>
    );

} export default App;