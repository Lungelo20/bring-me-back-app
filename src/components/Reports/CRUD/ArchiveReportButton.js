import React from 'react';
import { archiveReport } from '../../api/reportService';
import { useHistory } from 'react-router-dom';

const ArchiveReportButton = ({ id }) => {
  const history = useHistory();

  const handleArchive = async () => {
    try {
      await archiveReport(id);
      history.push('/reports');
    } catch (error) {
      console.error('Error archiving report:', error);
    }
  };

  return (
    <button onClick={handleArchive}>Archive Report</button>
  );
};

export default ArchiveReportButton;
