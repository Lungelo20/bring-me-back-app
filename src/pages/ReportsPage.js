import React from 'react';
import { Link } from 'react-router-dom';
import ReportList from '../components/Reports/ReportList';

const ReportsPage = () => {
  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <nav>
        <ul>
          <li>
            <Link to="/report/new">Create Report</Link>
          </li>
        </ul>
      </nav>
      <ReportList />
    </div>
  );
};

export default ReportsPage;
