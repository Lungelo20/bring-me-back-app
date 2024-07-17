import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchFoundPersonReports, filterFoundPersonReports } from '../api';
import ReportFilter from './ReportFilter';
import '../styles/ReportList.css';

const FoundPersonReportList = ({ reports }) => {
  return (
    <div className="report-list">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Nickname</th>
            <th>Gender</th>
            <th>Estimated Age</th>
            <th>Found Location</th>
            <th>Found DateTime</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.fullName}</td>
              <td>{report.nickname}</td>
              <td>{report.gender}</td>
              <td>{report.estimatedAge}</td>
              <td>{report.foundLocation}</td>
              <td>{new Date(report.foundDateTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const FoundPersonReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await fetchFoundPersonReports();
      setReports(data);
    };

    fetchReports();
  }, []);

  const handleFilter = async (filterParams) => {
    const data = await filterFoundPersonReports(filterParams);
    setFilteredReports(data);
  };

  return (
    <div>
      <ReportFilter onFilter={handleFilter} />
      <FoundPersonReportList reports={filteredReports.length ? filteredReports : reports} />
    </div>
  );
};

export default FoundPersonReports;
