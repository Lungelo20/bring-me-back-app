// InformativeSection.js
import React from 'react';
import '../../styles/InformativeSection.css';

const InformativeSection = ({ title, content }) => {
  return (
    <div className="informative-section">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default InformativeSection;
