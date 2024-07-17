import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeComponent from './components/Home/HomeComponent'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
            </Routes>
        </Router>
    );
};

export default App;