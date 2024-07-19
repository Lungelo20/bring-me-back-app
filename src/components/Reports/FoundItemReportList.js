import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchFoundItemReports, filterFoundItemReports } from '../api';
import ReportFilter from './ReportFilter';
import '../styles/ReportList.css';

const FoundItemReportList = ({ reports }) => {
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
            <tr key={report.reportId}>
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

const FoundItemReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await fetchFoundItemReports();
      setReports(data);
    };

    fetchReports();
  }, []);

  const handleFilter = async (filterParams) => {
    const data = await filterFoundItemReports(filterParams);
    setFilteredReports(data);
  };

  return (
    <div>
      <ReportFilter onFilter={handleFilter} />
      <FoundItemReportList reports={filteredReports.length ? filteredReports : reports} />
    </div>
  );
};

export default FoundItemReports;
