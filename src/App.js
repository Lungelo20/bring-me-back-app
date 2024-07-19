import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeComponent from './components/Home/HomeComponent';
import ReportDetailsPage from './pages/ReportDetailsPage';
import CreateReport from './components/Reports/CRUD/CreateReport'; 
import UpdateReport from './components/Reports/CRUD/UpdateReport';
import UserManagement from './components/Users/UserManagement';
import LoginComponent from './components/Users/Login'; // Replace with your actual components
import RegisterComponent from './components/Users/Register'; // Replace with your actual components


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/report/:id" element={<ReportDetailsPage />} />
                <Route path="/report/new" element={<CreateReport />} />
                <Route path="/report/edit/:id" element={<UpdateReport />} />
                <Route path="/users" element={<UserManagement />} /> 
                <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            </Routes>
        </Router>
    );
};

export default App;