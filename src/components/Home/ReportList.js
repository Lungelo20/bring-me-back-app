import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/ReportList.css';


const ReportList = ({ reports }) => {
  // Ensure $values array exists and is an array
  const reportsArray = reports && reports.$values && Array.isArray(reports.$values)
    ? reports.$values
    : [];

  return (
    <div className="report-list">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name/Item</th>
            <th>Location</th>
            <th>Condition</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportsArray.map(report => (
            <tr key={report.reportId}>
              <td>
                {report.recentPhotos ? (
                  <img src={report.recentPhotos} alt={report.fullName} className="report-image" />
                ) : (
                  <img src="https://placehold.co/600x400.png" alt={report.fullName} className="report-image" />
                )}
              </td>
              <td>{report.fullName || report.itemName || 'Name not specified'}</td>
              <td>
                 {report.foundLocation || report.lastSeenLocation || report.lastKnownLocation || 'Location not specified'}
              </td>
              <td>{report.conditionWhenFound || report.medicalConditions || report.uniqueIdentifiers || 'Condition not specified'}</td>
              <td>{new Date(report.foundDateTime || report.lastSeenDateTime).toLocaleString()}</td>
              <td>{report.reportType}</td>
              <td>
                <Link to={`/report/${report.reportId}`}>
                  <Button variant="primary" className="mr-2">Details</Button>
                </Link>
                <Link to={`/report/edit/${report.reportId}`}>
                  <Button variant="info" className="mr-2">Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReportList;
