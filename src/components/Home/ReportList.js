import React from 'react';
import { Table } from 'react-bootstrap';
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
            <th>Excerpt</th>
          </tr>
        </thead>
        <tbody>
          {reportsArray.map(report => (
            <tr key={report.$id}>
              <td>
                {report.recentPhotos ? (
                  <img src={report.recentPhotos} alt={report.fullName} className="report-image" />
                ) : (
                  <img src="https://placehold.co/600x400.png" alt={report.fullName} className="report-image" />
                )}
              </td>
              <td>{report.fullName}</td>
              <td>{report.foundLocation}</td>
              <td>{report.conditionWhenFound}</td>
              <td>{new Date(report.foundDateTime).toLocaleString()}</td>
              <td>{report.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReportList;
