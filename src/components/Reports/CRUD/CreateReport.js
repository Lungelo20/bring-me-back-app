import React, { useState, useEffect } from 'react';
import { createMissingPersonReport, createFoundItemReport, compareFoundPersonReport,
  createFoundPersonReport, createMissingItemReport, compareMissingItemReport,
  uploadFiles, compareMissingPersonReport, updateMissingPersonReport, compareFoundItemReport,
  updateMissingItemReport, updateFoundPersonReport, updateFoundItemReport } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Modal } from 'react-bootstrap';

// Define role mapping for conversion
const roleMapping = {
  "General": 0,
  "Organization": 1,
  "CommunityMember": 2,
  "FamilyMember": 3,
  "PublicAuthority": 4,
  "Volunteer": 5,
  "DonorSupporter": 6
};

const CreateReport = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

   // Convert user role to corresponding enum value
  const userRole = user ? roleMapping[user.role] || 0 : 0;

  const [report, setReport] = useState({
    userId: user ? user.id : '',
    userName: user ? user.name : '',
    userEmail: user ? user.email : '',
    userPhoneNumber: user ? user.phoneNumber : '',
    userLocation: user ? user.location : '',
    user: user ? { ...user, role: userRole } : {}, // Ensure role is converted
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
  const [showModal, setShowModal] = useState(false);
  const [existingReport, setExistingReport] = useState(null);
  const [matchPercentage, setMatchPercentage] = useState(null);
 

    // Ensure this effect runs only once when the component mounts
    useEffect(() => {
      if (user) {
        setReport(prev => ({
          ...prev,
          userId: user.id,
          user: { ...user, role: userRole }, // Set converted role
          Name: user.name,
          Email: user.email,
          PhoneNumber: user.phoneNumber,
          Location: user.location,
          Role: userRole,          
        }));
      }
    }, []); // Run only on mount

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
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setReport({
        ...report,
        recentPhotos: files,
    });
};
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {   

      let fileUrls = [];

      // Ensure recentPhotos exists and is an array
      if (report.recentPhotos && Array.isArray(report.recentPhotos) && report.recentPhotos.length > 0) {
          // Upload files and get the URLs
          fileUrls = await uploadFiles(report.recentPhotos);
      }

      const combinedReport = { ...report, ...additionalInfo,
        Name: user.name,
        Email: user.email,
        PhoneNumber: user.phoneNumber,
        Location: user.location,
        Role: userRole,
        RecentPhotos: fileUrls // Include the file URLs here       
       };

      // Check for existing matches
      let comparisonResult ='';            
      switch (combinedReport.reportType) {
        case 'MissingPerson':
          comparisonResult = await compareMissingPersonReport(combinedReport);
          break;
        case 'MissingItem':
          comparisonResult = await compareMissingItemReport(combinedReport);
          break;
        case 'FoundPerson':
          comparisonResult = await compareFoundPersonReport(combinedReport);
          break;
        case 'FoundItem':
          comparisonResult = await compareFoundItemReport(combinedReport);
          break;
        default:
          throw new Error('Invalid report type');
      }
      if (comparisonResult.match) {
        // Show modal for user confirmation
        setMatchPercentage(comparisonResult.matchPercentage);
        setExistingReport(comparisonResult.matchedReport);
        setShowModal(true);
      } else {
        // Create the report if no match is found
        await createReport(combinedReport);
        setAlertMessage('Report created successfully!');
        setAlertVariant('success');
        setShowAlert(true);
        setTimeout(() => navigate('/reports'), 2000);
      }
    } catch (error) {
      setAlertMessage('Error creating report. Please try again.');
      setAlertVariant('danger');
      setShowAlert(true);
      console.error('Error creating report:', error);
    }
  };

  const handleConfirmMatch = async () => {
    try {
      await updateReport(existingReport.id, report);
      setAlertMessage('Report updated successfully!');
      setAlertVariant('success');
      setShowAlert(true);
      setShowModal(false);
      setTimeout(() => navigate('/reports'), 2000);
    } catch (error) {
      setAlertMessage('Error updating report. Please try again.');
      setAlertVariant('danger');
      setShowAlert(true);
      console.error('Error updating report:', error);
    }
  };

  const handleCancelMatch = () => {
    setShowModal(false);
  };

  const createReport = async (combinedReport) => {
    switch (combinedReport.reportType) {
      case 'MissingPerson':
        await createMissingPersonReport(combinedReport);
        break;
      case 'MissingItem':
        await createMissingItemReport(combinedReport);
        break;
      case 'FoundPerson':
        await createFoundPersonReport(combinedReport);
        break;
      case 'FoundItem':
        await createFoundItemReport(combinedReport);
        break;
      default:
        throw new Error('Invalid report type');
    }
  };

  const updateReport = async (id, report) => {
    switch (existingReport.reportType) {
      case 'MissingPerson':
        await updateMissingPersonReport(id, report);
        break;
      case 'MissingItem':
        await updateMissingItemReport(id, report);
        break;
      case 'FoundPerson':
        await updateFoundPersonReport(id, report);
        break;
      case 'FoundItem':
        await updateFoundItemReport(id, report);
        break;
      default:
        throw new Error('Invalid report type');
    }
  
  };

  const renderAdditionalFields = () => {
    switch (report.reportType) {
      case 'MissingPerson':
        return (
          <>
            <h3>Missing Person Details</h3>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control type="text" name="fullName" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group controlId="nickname">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control type="text" name="nickname" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control as="select" name="gender" onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control type="date" name="dateOfBirth" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group controlId="idNumber">
              <Form.Label>ID Number:</Form.Label>
              <Form.Control type="text" name="idNumber" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group controlId="nationality">
              <Form.Label>Nationality:</Form.Label>
              <Form.Control type="text" name="nationality" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group controlId="height">
              <Form.Label>Height:</Form.Label>
              <Form.Control type="text" name="height" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="weight">
              <Form.Label>Weight:</Form.Label>
              <Form.Control type="text" name="weight" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="eyeColor">
              <Form.Label>Eye Color:</Form.Label>
              <Form.Control type="text" name="eyeColor" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="hairColor">
              <Form.Label>Hair Color:</Form.Label>
              <Form.Control type="text" name="hairColor" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="distinguishingMarksOrFeatures">
              <Form.Label>Distinguishing Marks/Features:</Form.Label>
              <Form.Control type="text" name="distinguishingMarksOrFeatures" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="lastSeenLocation">
              <Form.Label>Last Seen Location:</Form.Label>
              <Form.Control type="text" name="lastSeenLocation" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="lastSeenDateTime">
              <Form.Label>Last Seen Date/Time:</Form.Label>
              <Form.Control type="datetime-local" name="lastSeenDateTime" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group controlId="clothingLastSeenWearing">
              <Form.Label>Clothing Last Seen Wearing:</Form.Label>
              <Form.Control type="text" name="clothingLastSeenWearing" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="possibleDestinations">
              <Form.Label>Possible Destinations:</Form.Label>
              <Form.Control type="text" name="possibleDestinations" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="medicalConditions">
              <Form.Label>Medical Conditions:</Form.Label>
              <Form.Control type="text" name="medicalConditions" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="medicationsRequired">
              <Form.Label>Medications Required:</Form.Label>
              <Form.Control type="text" name="medicationsRequired" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="mentalHealthStatus">
              <Form.Label>Mental Health Status:</Form.Label>
              <Form.Control type="text" name="mentalHealthStatus" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="primaryContactPerson">
              <Form.Label>Primary Contact Person:</Form.Label>
              <Form.Control type="text" name="primaryContactPerson" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="contactPhoneNumber">
              <Form.Label>Contact Phone Number:</Form.Label>
              <Form.Control type="text" name="contactPhoneNumber" onChange={handleAdditionalInfoChange} required />
            </Form.Group>

            <Form.Group controlId="contactEmailAddress">
              <Form.Label>Contact Email Address:</Form.Label>
              <Form.Control type="email" name="contactEmailAddress" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="socialMediaAccounts">
              <Form.Label>Social Media Accounts:</Form.Label>
              <Form.Control type="text" name="socialMediaAccounts" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="recentPhotos">
                <Form.Label>Recent Photos:</Form.Label>
                <Form.Control 
                    type="file" 
                    name="recentPhotos" 
                    onChange={handleFileChange} 
                    multiple 
                    accept="image/*"
                />
                <Form.Text className="text-muted">
                    You can upload multiple images. Accepted formats: JPG, PNG, GIF.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="briefDescriptionOfCircumstances">
              <Form.Label>Brief Description of Circumstances:</Form.Label>
              <Form.Control as="textarea" name="briefDescriptionOfCircumstances" onChange={handleAdditionalInfoChange} />
            </Form.Group>

            <Form.Group controlId="videoUrl">
              <Form.Label>Video URL:</Form.Label>
              <Form.Control type="url" name="videoUrl" onChange={handleAdditionalInfoChange} />
            </Form.Group>
          </>
        );
      case 'MissingItem':
        return (
          <>
            <h3>Missing Item Details</h3>
            <Form.Group controlId="itemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control type="text" name="itemName" onChange={handleAdditionalInfoChange} required maxLength="100" />
            </Form.Group>
        
            <Form.Group controlId="itemDescription">
              <Form.Label>Item Description:</Form.Label>
              <Form.Control as="textarea" name="itemDescription" onChange={handleAdditionalInfoChange} maxLength="500" />
            </Form.Group>
        
            <Form.Group controlId="serialNumber">
              <Form.Label>Serial Number:</Form.Label>
              <Form.Control type="text" name="serialNumber" onChange={handleAdditionalInfoChange} maxLength="50" />
            </Form.Group>
        
            <Form.Group controlId="uniqueIdentifiers">
              <Form.Label>Unique Features:</Form.Label>
              <Form.Control type="text" name="uniqueIdentifiers" onChange={handleAdditionalInfoChange} maxLength="200" />
            </Form.Group>
        
            <Form.Group controlId="lastKnownLocation">
              <Form.Label>Last Known Location:</Form.Label>
              <Form.Control type="text" name="lastKnownLocation" onChange={handleAdditionalInfoChange} maxLength="100" />
            </Form.Group>
        
            <Form.Group controlId="lastSeenDateTime">
              <Form.Label>Last Seen Date/Time:</Form.Label>
              <Form.Control type="datetime-local" name="lastSeenDateTime" onChange={handleAdditionalInfoChange} required />
            </Form.Group>
        
            <Form.Group controlId="circumstancesOfLoss">
              <Form.Label>Brief Description of Circumstances:</Form.Label>
              <Form.Control as="textarea" name="circumstancesOfLoss" onChange={handleAdditionalInfoChange} maxLength="500" />
            </Form.Group>
        
            <Form.Group controlId="ownerName">
              <Form.Label>Owner Name:</Form.Label>
              <Form.Control type="text" name="ownerName" onChange={handleAdditionalInfoChange} maxLength="100" />
            </Form.Group>
        
            <Form.Group controlId="ownerPhoneNumber">
              <Form.Label>Owner Contact Phone Number:</Form.Label>
              <Form.Control type="text" name="ownerPhoneNumber" onChange={handleAdditionalInfoChange} required pattern="^\+?\d{10,15}$" />
            </Form.Group>
        
            <Form.Group controlId="ownerEmailAddress">
              <Form.Label>Owner Contact Email Address:</Form.Label>
              <Form.Control type="email" name="ownerEmailAddress" onChange={handleAdditionalInfoChange} />
            </Form.Group>
        
            <Form.Group controlId="recentPhotos">
                <Form.Label>Recent Photos:</Form.Label>
                <Form.Control 
                    type="file" 
                    name="recentPhotos" 
                    onChange={handleFileChange} 
                    multiple 
                    accept="image/*"
                />
                <Form.Text className="text-muted">
                    You can upload multiple images. Accepted formats: JPG, PNG, GIF.
                </Form.Text>
            </Form.Group>
        
            <Form.Group controlId="estimatedValue">
              <Form.Label>Estimated Value:</Form.Label>
              <Form.Control type="number" step="0.01" name="estimatedValue" onChange={handleAdditionalInfoChange} min="0.01" />
            </Form.Group>
        
            <Form.Group controlId="rewardOffered">
              <Form.Label>Reward Offered:</Form.Label>
              <Form.Control type="number" step="0.01" name="rewardOffered" onChange={handleAdditionalInfoChange} min="0.01" />
            </Form.Group>
        
            <Form.Group controlId="videoUrl">
              <Form.Label>Video URL:</Form.Label>
              <Form.Control type="url" name="videoUrl" onChange={handleAdditionalInfoChange} />
            </Form.Group>
          </>
        );
        
      case 'FoundPerson':
        return (
          <>
            <h3>Found Person Details</h3>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control type="text" name="fullName" onChange={handleAdditionalInfoChange} required maxLength="100" />
            </Form.Group>
        
            <Form.Group controlId="nickname">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control type="text" name="nickname" onChange={handleAdditionalInfoChange} maxLength="50" />
            </Form.Group>
        
            <Form.Group controlId="gender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control type="text" name="gender" onChange={handleAdditionalInfoChange} required maxLength="10" />
            </Form.Group>
        
            <Form.Group controlId="estimatedAge">
              <Form.Label>Estimated Age:</Form.Label>
              <Form.Control type="number" name="estimatedAge" onChange={handleAdditionalInfoChange} min="0" max="150" />
            </Form.Group>
        
            <Form.Group controlId="nationality">
              <Form.Label>Nationality:</Form.Label>
              <Form.Control type="text" name="nationality" onChange={handleAdditionalInfoChange} required maxLength="50" />
            </Form.Group>
        
            <Form.Group controlId="height">
              <Form.Label>Height:</Form.Label>
              <Form.Control type="text" name="height" onChange={handleAdditionalInfoChange} maxLength="20" />
            </Form.Group>
        
            <Form.Group controlId="weight">
              <Form.Label>Weight:</Form.Label>
              <Form.Control type="text" name="weight" onChange={handleAdditionalInfoChange} maxLength="20" />
            </Form.Group>
        
            <Form.Group controlId="eyeColor">
              <Form.Label>Eye Color:</Form.Label>
              <Form.Control type="text" name="eyeColor" onChange={handleAdditionalInfoChange} maxLength="20" />
            </Form.Group>
        
            <Form.Group controlId="hairColor">
              <Form.Label>Hair Color:</Form.Label>
              <Form.Control type="text" name="hairColor" onChange={handleAdditionalInfoChange} maxLength="20" />
            </Form.Group>
        
            <Form.Group controlId="distinguishingMarksOrFeatures">
              <Form.Label>Distinguishing Marks/Features:</Form.Label>
              <Form.Control type="text" name="distinguishingMarksOrFeatures" onChange={handleAdditionalInfoChange} maxLength="200" />
            </Form.Group>
        
            <Form.Group controlId="foundLocation">
              <Form.Label>Found Location:</Form.Label>
              <Form.Control type="text" name="foundLocation" onChange={handleAdditionalInfoChange} required maxLength="100" />
            </Form.Group>
        
            <Form.Group controlId="foundDateTime">
              <Form.Label>Found Date/Time:</Form.Label>
              <Form.Control type="datetime-local" name="foundDateTime" onChange={handleAdditionalInfoChange} required />
            </Form.Group>
        
            <Form.Group controlId="clothingAtTimeOfFinding">
              <Form.Label>Clothing at Time of Finding:</Form.Label>
              <Form.Control type="text" name="clothingAtTimeOfFinding" onChange={handleAdditionalInfoChange} maxLength="200" />
            </Form.Group>
        
            <Form.Group controlId="conditionWhenFound">
              <Form.Label>Condition When Found:</Form.Label>
              <Form.Control type="text" name="conditionWhenFound" onChange={handleAdditionalInfoChange} maxLength="200" />
            </Form.Group>
        
            <Form.Group controlId="observedMedicalConditions">
              <Form.Label>Observed Medical Conditions:</Form.Label>
              <Form.Control as="textarea" name="observedMedicalConditions" onChange={handleAdditionalInfoChange} maxLength="500" />
            </Form.Group>
        
            <Form.Group controlId="observedMedications">
              <Form.Label>Observed Medications:</Form.Label>
              <Form.Control type="text" name="observedMedications" onChange={handleAdditionalInfoChange} maxLength="200" />
            </Form.Group>
        
            <Form.Group controlId="observedMentalHealthStatus">
              <Form.Label>Observed Mental Health Status:</Form.Label>
              <Form.Control type="text" name="observedMentalHealthStatus" onChange={handleAdditionalInfoChange} maxLength="200" />
            </Form.Group>
        
            <Form.Group controlId="recentPhotos">
                <Form.Label>Recent Photos:</Form.Label>
                <Form.Control 
                    type="file" 
                    name="recentPhotos" 
                    onChange={handleFileChange} 
                    multiple 
                    accept="image/*"
                />
                <Form.Text className="text-muted">
                    You can upload multiple images. Accepted formats: JPG, PNG, GIF.
                </Form.Text>
            </Form.Group>
        
            <Form.Group controlId="videoUrl">
              <Form.Label>Video URL:</Form.Label>
              <Form.Control type="url" name="videoUrl" onChange={handleAdditionalInfoChange} />
            </Form.Group>
          </>
        );        
      case 'FoundItem':
        return (
          <>
            <h3>Found Item Details</h3>
            <Form.Group controlId="itemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control type="text" name="itemName" onChange={handleAdditionalInfoChange} required maxLength="100" />
            </Form.Group>
        
            <Form.Group controlId="itemDescription">
              <Form.Label>Item Description:</Form.Label>
              <Form.Control as="textarea" name="itemDescription" onChange={handleAdditionalInfoChange} maxLength="500" />
            </Form.Group>
        
            <Form.Group controlId="serialNumber">
              <Form.Label>Serial Number:</Form.Label>
              <Form.Control type="text" name="serialNumber" onChange={handleAdditionalInfoChange} maxLength="50" />
            </Form.Group>
        
            <Form.Group controlId="uniqueIdentifiers">
              <Form.Label>Unique Features:</Form.Label>
              <Form.Control type="text" name="uniqueIdentifiers" onChange={handleAdditionalInfoChange} maxLength="200" />
            </Form.Group>
        
            <Form.Group controlId="foundLocation">
              <Form.Label>Found Location:</Form.Label>
              <Form.Control type="text" name="foundLocation" onChange={handleAdditionalInfoChange} required maxLength="100" />
            </Form.Group>
        
            <Form.Group controlId="foundDateTime">
              <Form.Label>Found Date/Time:</Form.Label>
              <Form.Control type="datetime-local" name="foundDateTime" onChange={handleAdditionalInfoChange} required />
            </Form.Group>
        
            <Form.Group controlId="conditionOfItemWhenFound">
              <Form.Label>Condition of Item When Found:</Form.Label>
              <Form.Control as="textarea" name="conditionOfItemWhenFound" onChange={handleAdditionalInfoChange} maxLength="500" />
            </Form.Group>
        
            <Form.Group controlId="reportingPersonName">
              <Form.Label>Reporting Person Name:</Form.Label>
              <Form.Control type="text" name="reportingPersonName" onChange={handleAdditionalInfoChange} maxLength="100" />
            </Form.Group>
        
            <Form.Group controlId="reportingPersonPhoneNumber">
              <Form.Label>Reporting Person Phone Number:</Form.Label>
              <Form.Control type="text" name="reportingPersonPhoneNumber" onChange={handleAdditionalInfoChange} required pattern="^\+?\d{10,15}$" />
            </Form.Group>
        
            <Form.Group controlId="reportingPersonEmailAddress">
              <Form.Label>Reporting Person Email Address:</Form.Label>
              <Form.Control type="email" name="reportingPersonEmailAddress" onChange={handleAdditionalInfoChange} />
            </Form.Group>
        
            <Form.Group controlId="recentPhotos">
                <Form.Label>Recent Photos:</Form.Label>
                <Form.Control 
                    type="file" 
                    name="recentPhotos" 
                    onChange={handleFileChange} 
                    multiple 
                    accept="image/*"
                />
                <Form.Text className="text-muted">
                    You can upload multiple images. Accepted formats: JPG, PNG, GIF.
                </Form.Text>
            </Form.Group>
        
            <Form.Group controlId="circumstancesOfFinding">
              <Form.Label>Circumstances of Finding:</Form.Label>
              <Form.Control as="textarea" name="circumstancesOfFinding" onChange={handleAdditionalInfoChange} maxLength="500" />
            </Form.Group>
        
            <Form.Group controlId="videoUrl">
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
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Create a New Report</h2>
          {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reportType">
              <Form.Label>Report Type</Form.Label>
              <Form.Control as="select" name="reportType" onChange={handleChange} required>
                <option value="">Select Report Type</option>
                <option value="MissingPerson">Missing Person</option>
                <option value="MissingItem">Missing Item</option>
                <option value="FoundPerson">Found Person</option>
                <option value="FoundItem">Found Item</option>
              </Form.Control>
            </Form.Group>

            {renderAdditionalFields()}

            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" onChange={handleChange} rows={3} />
            </Form.Group>

            <Form.Group className="mt-4">
              <Button variant="primary" type="submit">
                Submit Report
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Report Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>An existing report was found that matches the one you are trying to create.</p>
          <p>Match Percentage: {matchPercentage}%</p>
          <div className="mt-3">
            <h5>Existing Report Details:</h5>
            <p><strong>Report Type:</strong> {existingReport?.reportType}</p>
            <p><strong>Full Name:</strong> {existingReport?.fullName}</p>
            <p><strong>Description:</strong> {existingReport?.description}</p>
            <p><strong>Last Seen Date/Time:</strong> {existingReport?.lastSeenDateTime}</p>
          </div>
          <p>Do you want to update the existing report with the new data?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelMatch}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmMatch}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateReport;
