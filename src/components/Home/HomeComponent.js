// HomeComponent.js
import React, { useEffect, useState } from 'react';
import InformativeSection from './InformativeSection';
import ReportList from './ReportList';
import WelcomeBanner from '../Home/WelcomeBanner';
import sampleImage from '../../assets/sample-image.jpg.jpeg'; // Replace with your image path

import {
  fetchFoundPersonReports,
  fetchMissingItemReports,
  fetchMissingPersonReports,
  fetchFoundItemReports
} from '../../api/api';
import '../../styles/HomeComponent.css';

const HomeComponent = () => {
  const [foundPersons, setFoundPersons] = useState([]);
  const [missingPersons, setMissingPersons] = useState([]);
  const [missingItems, setMissingItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

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
       <WelcomeBanner />
       <InformativeSection
        title="About BringMeBack"
        content="BringMeBack is dedicated to reuniting lost loved ones and items with their rightful owners."
        layout="image-left"
        image={sampleImage}
      />
      <div className="report-section">
        <h2 className="report-section-header">Found Persons</h2>
        <ReportList reports={foundPersons} />
      </div>
      <InformativeSection
        title="Join Us"
        content="Become a part of our mission to reunite lost loved ones and items. Get involved today!"
        layout="full-width"
      />
       <div className="report-section">
        <h2 className="report-section-header">Missing Persons</h2>
        <ReportList reports={missingPersons} />
      </div>
      <InformativeSection
        title="Our Mission"
        content="Our mission is to leverage technology to bring families back together and recover lost items."
        layout="image-right"
        image={sampleImage}
      />
        <div className="report-section">
        <h2 className="report-section-header">Missing Items</h2>
        <ReportList reports={missingItems} />
      </div>
      <InformativeSection
        title="Support Us"
        content="Your support helps us continue our important work. Donate now to make a difference."
        layout="support-us"
      />
       <div className="report-section">
        <h2 className="report-section-header">Found Items</h2>
        <ReportList reports={foundItems} />
      </div>
    </div>
  );
}

export default HomeComponent;
