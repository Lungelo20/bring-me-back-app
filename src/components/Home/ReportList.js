import React, { useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faGenderless } from '@fortawesome/free-solid-svg-icons';
import '../../styles/ReportList.css';

const ReportList = ({ reports }) => {
  const [expandedReportId, setExpandedReportId] = useState(null);

  const reportsArray = reports && reports.$values && Array.isArray(reports.$values)
    ? reports.$values
    : [];

  const ImageURL = "http://localhost:5157/";

  const toggleDescription = (reportId) => {
    setExpandedReportId(expandedReportId === reportId ? null : reportId);
  };

  return (
    <div className="report-list">
      {reportsArray.length > 0 ? (
        reportsArray.map(report => {
          const isExpanded = expandedReportId === report.reportId;
          return (
            <Card key={report.reportId} className="mb-4 report-card border rounded bg-light shadow-sm">
              <Card.Img
                variant="top"
                src={report.recentPhotos && report.recentPhotos.$values
                  ? `${ImageURL}${report.recentPhotos.$values}`
                  : "https://placehold.co/600x400.png"}
                alt={report.fullName || report.itemName || 'Image'}
                className="card-img"
              />
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title>{report.fullName || report.itemName}</Card.Title>
                  <span className="badge badge-info">
                    {report.reportType || 'Unknown'}
                  </span>
                </div>
                <Card.Text>
                  {isExpanded
                    ? report.description
                    : `${report.description ? `${report.description.substring(0, 100)}... ` : 'No description available. '}
                      `}
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => toggleDescription(report.reportId)}
                  >
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </Button>
                </Card.Text>
                <ul className="list-unstyled">
                  <li>
                  <span className="pdr-2 text-primary"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                    {report.lastKnownLocation || 'Unknown location'}
                  </li>
                  <li>
                  <span className="pdr-2 text-primary"><FontAwesomeIcon icon={faCalendarAlt} /></span>
                    {report.lastSeenDateTime || 'Unknown date'}
                  </li>
                  <li>
                    <span className="pdr-2 text-primary"><FontAwesomeIcon icon={faGenderless} /></span>
                    {report.gender || 'Unknown gender'}
                  </li>
                  {/* Add additional list items as needed */}
                </ul>
                <Button
                  as={Link}
                  to={`/report/${report.reportId}`}
                  variant="primary"
                  className="mt-auto align-self-end"
                >
                  Full Report
                </Button>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <p>No reports found.</p>
      )}
    </div>
  );
};

export default ReportList;
