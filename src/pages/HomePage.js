import React, { useEffect, useState, useContext } from 'react';
import ReportList from '../components/Home/ReportList';
import SearchComponent from '../components/Home/SearchComponent';
import LoginComponent from '../components/Users/Login';
import FilterComponent from '../components/Home/FilterComponent';
import StatisticsComponent from '../components/Home/StatisticsComponent'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';

import {
  fetchFoundPersonReports,
  fetchMissingItemReports,
  fetchMissingPersonReports,
  fetchFoundItemReports
} from '../api/api';
import '../styles/HomePage.css';

const HomePage = () => {
  const [foundPersons, setFoundPersons] = useState([]);
  const [missingPersons, setMissingPersons] = useState([]);
  const [missingItems, setMissingItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const foundPersonsData = await fetchFoundPersonReports();
        const missingPersonsData = await fetchMissingPersonReports();
        const missingItemsData = await fetchMissingItemReports();
        const foundItemsData = await fetchFoundItemReports();
        setFoundPersons(foundPersonsData);
        setMissingPersons(missingPersonsData);
        setMissingItems(missingItemsData);
        setFoundItems(foundItemsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="home-page">
      <div className="left-section">
        {isAuthenticated && <SearchComponent />}
        {!isAuthenticated && <LoginComponent />}
        {isAuthenticated &&  <FilterComponent />}
      </div>
      
      <div className="report-center-section">
        <div className="report-section">          
          <ReportList reports={missingPersons} />
        </div>
        <div className="report-section">          
          <ReportList reports={foundPersons} />
        </div>        
        <div className="report-section">         
          <ReportList reports={missingItems} />
        </div>
        <div className="report-section">          
          <ReportList reports={foundItems} />
        </div>
      </div>
      
      <div className="right-section">
           <Link to="/report/new">
              <Button variant="primary" className="mb-4">
                Create New Report
              </Button>
            </Link>
            {isAuthenticated &&  <StatisticsComponent />}        
      </div>
    </div>
  );
}

export default HomePage;
