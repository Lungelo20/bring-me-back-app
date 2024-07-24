import React from 'react';
import '../../styles/WelcomeBanner.css';
import { Button } from 'react-bootstrap';

const WelcomeBanner = () => {
  return (
    <div className="welcome-banner">
      <div className="banner-content">
        <h1>Welcome to BringMeBack</h1>
        <p>Your trusted platform for reuniting lost loved ones and items.</p>
        <Button variant="primary" size="lg" href="/get-started">Get Started</Button>
      </div>
    </div>
  );
}

export default WelcomeBanner;
