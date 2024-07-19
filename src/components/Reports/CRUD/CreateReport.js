import React, { useState } from 'react';
import { createReport } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const CreateReport = () => {
  const [report, setReport] = useState({
    userId: '',
    reportType: '',
    description: '',
    createdAt: new Date().toISOString(),
    isResolved: false,
    isArchived: false,
    associates: [],
    comments: [],
  });

  const [additionalInfo, setAdditionalInfo] = useState({});
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('danger');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: value,
    });
  };

  const handleAdditionalInfoChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo({
      ...additionalInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const combinedReport = { ...report, ...additionalInfo };
      await createReport(combinedReport);
      setAlertMessage('Report created successfully!');
      setAlertVariant('success');
      setShowAlert(true);
      setTimeout(() => navigate('/reports'), 2000);
    } catch (error) {
      setAlertMessage('Error creating report. Please try again.');
      setAlertVariant('danger');
      setShowAlert(true);
      console.error('Error creating report:', error); // Log the error for debugging
    }
  };

  const renderAdditionalFields = () => {
    switch (report.reportType) {
      case 'MissingPerson':
        return (
          <>
            <h3>Missing Person Details</h3>
            <Form.Group>
              <Form.Label>Full Name:</Form.Label>
              <Form.Control type="text" name="fullName" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nickname:</Form.Label>
              <Form.Control type="text" name="nickname" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Gender:</Form.Label>
              <Form.Control as="select" name="gender" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control type="date" name="dateOfBirth" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>ID Number:</Form.Label>
              <Form.Control type="text" name="idNumber" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nationality:</Form.Label>
              <Form.Control type="text" name="nationality" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Height:</Form.Label>
              <Form.Control type="text" name="height" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Weight:</Form.Label>
              <Form.Control type="text" name="weight" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Eye Color:</Form.Label>
              <Form.Control type="text" name="eyeColor" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Hair Color:</Form.Label>
              <Form.Control type="text" name="hairColor" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Distinguishing Marks/Features:</Form.Label>
              <Form.Control type="text" name="distinguishingMarksOrFeatures" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Seen Location:</Form.Label>
              <Form.Control type="text" name="lastSeenLocation" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Seen Date/Time:</Form.Label>
              <Form.Control type="datetime-local" name="lastSeenDateTime" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Clothing Last Seen Wearing:</Form.Label>
              <Form.Control type="text" name="clothingLastSeenWearing" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Possible Destinations:</Form.Label>
              <Form.Control type="text" name="possibleDestinations" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Medical Conditions:</Form.Label>
              <Form.Control type="text" name="medicalConditions" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Medications Required:</Form.Label>
              <Form.Control type="text" name="medicationsRequired" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Mental Health Status:</Form.Label>
              <Form.Control type="text" name="mentalHealthStatus" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Primary Contact Person:</Form.Label>
              <Form.Control type="text" name="primaryContactPerson" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact Phone Number:</Form.Label>
              <Form.Control type="text" name="contactPhoneNumber" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact Email Address:</Form.Label>
              <Form.Control type="email" name="contactEmailAddress" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Social Media Accounts:</Form.Label>
              <Form.Control type="text" name="socialMediaAccounts" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Recent Photos (URLs):</Form.Label>
              <Form.Control type="text" name="recentPhotos" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Brief Description of Circumstances:</Form.Label>
              <Form.Control as="textarea" name="briefDescriptionOfCircumstances" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Video URL:</Form.Label>
              <Form.Control type="url" name="videoUrl" onChange={handleAdditionalInfoChange} />
            </Form.Group>
          </>
        );
        case 'MissingItem':
          return (
            <>
              <h3>Missing Item Details</h3>
              <Form.Group>
                <Form.Label>Item Name:</Form.Label>
                <Form.Control type="text" name="itemName" onChange={handleAdditionalInfoChange} required />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Item Description:</Form.Label>
                <Form.Control as="textarea" name="itemDescription" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Serial Number:</Form.Label>
                <Form.Control type="text" name="serialNumber" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Unique Identifiers:</Form.Label>
                <Form.Control type="text" name="uniqueIdentifiers" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Last Known Location:</Form.Label>
                <Form.Control type="text" name="lastKnownLocation" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Last Seen Date/Time:</Form.Label>
                <Form.Control type="datetime-local" name="lastSeenDateTime" onChange={handleAdditionalInfoChange} required />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Circumstances of Loss:</Form.Label>
                <Form.Control as="textarea" name="circumstancesOfLoss" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Owner Name:</Form.Label>
                <Form.Control type="text" name="ownerName" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Owner Phone Number:</Form.Label>
                <Form.Control type="text" name="ownerPhoneNumber" onChange={handleAdditionalInfoChange} required />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Owner Email Address:</Form.Label>
                <Form.Control type="email" name="ownerEmailAddress" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Recent Photos (URLs):</Form.Label>
                <Form.Control type="text" name="recentPhotos" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Estimated Value:</Form.Label>
                <Form.Control type="number" step="0.01" name="estimatedValue" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Reward Offered:</Form.Label>
                <Form.Control type="number" step="0.01" name="rewardOffered" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Video URL:</Form.Label>
                <Form.Control type="url" name="videoUrl" onChange={handleAdditionalInfoChange} />
              </Form.Group>
            </>
          );
  
        case 'FoundPerson':
          return (
            <>
              <h3>Found Person Details</h3>
              <Form.Group>
                <Form.Label>Full Name:</Form.Label>
                <Form.Control type="text" name="fullName" onChange={handleAdditionalInfoChange} required />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Nickname:</Form.Label>
                <Form.Control type="text" name="nickname" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
                  <Form.Group>
              <Form.Label>Gender:</Form.Label>
              <Form.Control as="select" name="gender" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
  
              <Form.Group>
                <Form.Label>Estimated Age:</Form.Label>
                <Form.Control type="number" name="estimatedAge" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Nationality:</Form.Label>
                <Form.Control type="text" name="nationality" onChange={handleAdditionalInfoChange} required />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Height:</Form.Label>
                <Form.Control type="text" name="height" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Weight:</Form.Label>
                <Form.Control type="text" name="weight" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Eye Color:</Form.Label>
                <Form.Control type="text" name="eyeColor" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Hair Color:</Form.Label>
                <Form.Control type="text" name="hairColor" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Distinguishing Marks/Features:</Form.Label>
                <Form.Control type="text" name="distinguishingMarksOrFeatures" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Found Location:</Form.Label>
                <Form.Control type="text" name="foundLocation" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Found Date/Time:</Form.Label>
                <Form.Control type="datetime-local" name="foundDateTime" onChange={handleAdditionalInfoChange} required />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Clothing at Time of Finding:</Form.Label>
                <Form.Control type="text" name="clothingAtTimeOfFinding" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Condition When Found:</Form.Label>
                <Form.Control type="text" name="conditionWhenFound" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Observed Medical Conditions:</Form.Label>
                <Form.Control as="textarea" name="observedMedicalConditions" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Observed Medications:</Form.Label>
                <Form.Control type="text" name="observedMedications" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Observed Mental Health Status:</Form.Label>
                <Form.Control type="text" name="observedMentalHealthStatus" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Recent Photos (URLs):</Form.Label>
                <Form.Control type="text" name="recentPhotos" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Video URL:</Form.Label>
                <Form.Control type="url" name="videoUrl" onChange={handleAdditionalInfoChange} />
              </Form.Group>
            </>
          );
  
        case 'FoundItem':
          return (
            <>
              <h3>Found Item Details</h3>
              <Form.Group>
                <Form.Label>Item Name:</Form.Label>
                <Form.Control type="text" name="itemName" onChange={handleAdditionalInfoChange} required />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Item Description:</Form.Label>
                <Form.Control as="textarea" name="itemDescription" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Serial Number:</Form.Label>
                <Form.Control type="text" name="serialNumber" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Unique Identifiers:</Form.Label>
                <Form.Control type="text" name="uniqueIdentifiers" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Found Location:</Form.Label>
                <Form.Control type="text" name="foundLocation" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Found Date/Time:</Form.Label>
                <Form.Control type="datetime-local" name="foundDateTime" onChange={handleAdditionalInfoChange} required />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Condition of Item When Found:</Form.Label>
                <Form.Control as="textarea" name="conditionOfItemWhenFound" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Reporting Person Name:</Form.Label>
                <Form.Control type="text" name="reportingPersonName" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Reporting Person Phone Number:</Form.Label>
                <Form.Control type="text" name="reportingPersonPhoneNumber" onChange={handleAdditionalInfoChange} required />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Reporting Person Email Address:</Form.Label>
                <Form.Control type="email" name="reportingPersonEmailAddress" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Recent Photos (URLs):</Form.Label>
                <Form.Control type="text" name="recentPhotos" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Circumstances of Finding:</Form.Label>
                <Form.Control as="textarea" name="circumstancesOfFinding" onChange={handleAdditionalInfoChange} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Video URL:</Form.Label>
                <Form.Control type="url" name="videoUrl" onChange={handleAdditionalInfoChange} />
              </Form.Group>
            </>
          );
  
        default:
          return null;
      }
  };

  return (
    <Container>
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <h2>Create New Report</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Group>
          <Form.Label>User ID:</Form.Label>
          <Form.Control type="text" name="userId" value={report.userId} onChange={handleChange} required />
        </Form.Group>
      <Form.Group>
          <Form.Label>What have you seen today?</Form.Label>
          <Form.Control as="textarea" name="description" value={report.description} onChange={handleChange} maxLength="500" />
      </Form.Group>

        <Form.Group>
          <Form.Label>Would you say it relates to a:</Form.Label>
          <Form.Control as="select" name="reportType" value={report.reportType} onChange={handleChange} required>
            <option value="">Select Report Type</option>
            <option value="MissingPerson">Missing Person</option>
            <option value="FoundPerson">Found Person</option>
            <option value="MissingItem">Missing Item</option>
            <option value="FoundItem">Found Item</option>
          </Form.Control>
        </Form.Group>

        
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Is Resolved"
            name="isResolved"
            checked={report.isResolved}
            onChange={() => setReport({ ...report, isResolved: !report.isResolved })}
          />
        </Form.Group>

        {renderAdditionalFields()}

        <Button variant="primary" type="submit">
          Create Report
        </Button>
      </Form>
    </Container>
  );
};

export default CreateReport;
