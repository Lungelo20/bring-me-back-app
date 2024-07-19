import React, { useState, useEffect } from 'react';
import { getReportById, updateReport } from '../../../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReportById(id);
        setReport(data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };
    fetchReport();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReport(id, report);
      navigate('/reports');
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  if (!report) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>User ID:</label>
      <input type="text" name="userId" value={report.userId} onChange={handleChange} required />

      <label>Report Type:</label>
      <input type="text" name="reportType" value={report.reportType} onChange={handleChange} required />

      <label>Description:</label>
      <textarea name="description" value={report.description} onChange={handleChange} maxLength="500" />

      <label>Is Resolved:</label>
      <input
        type="checkbox"
        name="isResolved"
        checked={report.isResolved}
        onChange={() => setReport({ ...report, isResolved: !report.isResolved })}
      />

      <button type="submit">Update Report</button>
    </form>
  );
};

export default UpdateReport;
