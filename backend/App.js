// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ClientManagement from './components/ClientManagement';

const App = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<ClientManagement />} />
            {/* Add more routes as needed */}
        </Routes>
        </Router>
    );
};

export default App;
