import React from 'react';
import '../../styles/InformativeSection.css';
import { Button } from 'react-bootstrap';

const InformativeSection = ({ title, content, layout = 'default', image }) => {
  return (
    <div className={`informative-section ${layout}`}>
      {layout === 'image-left' && (
        <div className="section-content image-left">
          <div className="image">
            <img src={image} alt={title} />
          </div>
          <div className="text">
            <h2>{title}</h2>
            <p>{content}</p>
            <Button variant="primary" size="lg" className="cta-button" href="/learn-more">Learn More</Button>
          </div>
        </div>
      )}
      {layout === 'image-right' && (
        <div className="section-content image-right" >
          <div className="text">
            <h2>{title}</h2>
            <p>{content}</p>
            <Button variant="primary" size="lg" className="cta-button" href="/learn-more">Learn More</Button>
          </div>
          <div className="image">
            <img src={image} alt={title} />
          </div>
        </div>
      )}
      {layout === 'full-width' && (
        <div className="section-content full-width">
          <h2>{title}</h2>
          <p>{content}</p>         
          <Button variant="primary" size="lg" className="cta-button" href="/learn-more">Learn More</Button>
        </div>
      )}
      {layout === 'support-us' && (
        <div className="section-content support-us">
          <h2>{title}</h2>
          <p>{content}</p>          
          <Button variant="primary" className="cta-button" size="lg" href="/donate">Donate Now</Button>
        </div>
      )}
      {layout === 'join-us' && (
        <div className="section-content join-us">
          <h2>{title}</h2>
          <p>{content}</p>          
          <Button variant="primary" className="cta-button" size="lg" href="/register">Join Us</Button>
        </div>
      )}
    </div>
  );
}

export default InformativeSection;
