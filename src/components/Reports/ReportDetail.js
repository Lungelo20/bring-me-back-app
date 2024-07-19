import React from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/ReportDetail.css';

const ReportDetail = ({ report }) => {
  const { id } = useParams();

  if (!report) {
    return <div>Report not found</div>;
  }

  const {
    fullName,
    itemName,
    foundLocation,
    lastSeenLocation,
    lastKnownLocation,
    conditionWhenFound,
    medicalConditions,
    uniqueIdentifiers,
    foundDateTime,
    lastSeenDateTime,
    description,
    gender,
    dateOfBirth,
    primaryContactPerson,
    contactPhoneNumber,
    contactEmailAddress,
    socialMediaAccounts,
    recentPhotos,
  } = report;

  return (
    <div className="report-detail container">
      <div className="row">
        <div className="col-md-6">
        {report.recentPhotos ? (
                  <img src={report.recentPhotos} alt={report.fullName} className="report-image" />
                ) : (
                  <img src="https://placehold.co/600x400.png" alt={report.fullName} className="report-image" />
                )}
        </div>
        <div className="col-md-6">
          <h2>{fullName || itemName || 'Name not specified'}</h2>
          <p><strong>Location:</strong> {foundLocation || lastSeenLocation || lastKnownLocation || 'Location not specified'}</p>
          <p><strong>Condition:</strong> {conditionWhenFound || medicalConditions || uniqueIdentifiers || 'Condition not specified'}</p>
          <p><strong>Date:</strong> {new Date(foundDateTime || lastSeenDateTime).toLocaleString()}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Contact:</strong> {primaryContactPerson} ({contactPhoneNumber}, {contactEmailAddress})</p>
          <p><strong>Social Media:</strong> {socialMediaAccounts}</p>
        </div>
      </div>
    </div>
  );
}

export default ReportDetail;