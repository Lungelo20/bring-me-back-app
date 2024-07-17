import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchMissingItemReports, filterMissingItemReports } from '../api';
import ReportFilter from './ReportFilter';
import '../styles/ReportList.css';

const MissingItemReportList = ({ reports }) => {
  return (
    <div className="report-list">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Found Location</th>
            <th>Found DateTime</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.itemName}</td>
              <td>{report.itemDescription}</td>
              <td>{report.foundLocation}</td>
              <td>{new Date(report.foundDateTime).toLocaleString()}</td>
              <td>{report.conditionOfItemWhenFound}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const MissingItemReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await fetchMissingItemReports();
      setReports(data);
    };

    fetchReports();
  }, []);

  const handleFilter = async (filterParams) => {
    const data = await filterMissingItemReports(filterParams);
    setFilteredReports(data);
  };

  return (
    <div>
      <ReportFilter onFilter={handleFilter} />
      <MissingItemReportList reports={filteredReports.length ? filteredReports : reports} />
    </div>
  );
};

export default MissingItemReports;
