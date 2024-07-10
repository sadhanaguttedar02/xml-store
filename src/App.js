import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Listall from './Listall.jsx';
import Starred from './Starred';
import Home from './Home';


export default function App() {
    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <Navbar /> {/* Ensure Navbar is imported correctly and used */}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path="/" element={<Home />} /> {/* Route for root path */}
                        <Route path="/listall" element={<Listall />} />
                        <Route path="/starred" element={<Starred />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}
