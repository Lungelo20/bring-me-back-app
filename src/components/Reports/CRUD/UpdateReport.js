import React, { useState, useEffect } from 'react';
import { getReportById, updateMissingPersonReport, updateMissingItemReport, updateFoundPersonReport, updateFoundItemReport } from '../../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const UpdateReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState({});
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('danger');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReportById(id);
        setReport(data);
          // Based on the reportType, set additionalInfo accordingly
          if (data.reportType === 'FoundPerson') {
            setAdditionalInfo({
              fullName: data.fullName,
              nickname: data.nickname,
              gender: data.gender,
              estimatedAge: data.estimatedAge,
              nationality: data.nationality,
              height: data.height,
              weight: data.weight,
              eyeColor: data.eyeColor,
              hairColor: data.hairColor,
              distinguishingMarksOrFeatures: data.distinguishingMarksOrFeatures,
              foundLocation: data.foundLocation,
              foundDateTime: data.foundDateTime,
              clothingAtTimeOfFinding: data.clothingAtTimeOfFinding,
              conditionWhenFound: data.conditionWhenFound,
              observedMedicalConditions: data.observedMedicalConditions,
              observedMedications: data.observedMedications,
              observedMentalHealthStatus: data.observedMentalHealthStatus,
              recentPhotos: data.recentPhotos ? data.recentPhotos.$values : [],
              videoUrl: data.videoUrl,
              
            });
          } else if (data.reportType === 'FoundItem') {
            setAdditionalInfo({
              itemName: data.itemName,
              itemDescription: data.itemDescription,
              serialNumber: data.serialNumber,
              uniqueIdentifiers: data.uniqueIdentifiers,
              foundLocation: data.foundLocation,
              foundDateTime: data.foundDateTime,
              conditionOfItemWhenFound: data.conditionOfItemWhenFound,
              reportingPersonName: data.reportingPersonName,
              reportingPersonPhoneNumber: data.reportingPersonPhoneNumber,
              reportingPersonEmailAddress: data.reportingPersonEmailAddress,
              recentPhotos: data.recentPhotos ? data.recentPhotos.$values : [],
              circumstancesOfFinding: data.circumstancesOfFinding,
              videoUrl: data.videoUrl,
            });
          } else if (data.reportType === 'MissingPerson') {
            setAdditionalInfo({
              fullName: data.fullName,
              nickname: data.nickname,
              gender: data.gender,
              dateOfBirth: data.dateOfBirth,
              idNumber: data.idNumber,
              nationality: data.nationality,
              height: data.height,
              weight: data.weight,
              eyeColor: data.eyeColor,
              hairColor: data.hairColor,
              distinguishingMarksOrFeatures: data.distinguishingMarksOrFeatures,
              lastSeenLocation: data.lastSeenLocation,
              lastSeenDateTime: data.lastSeenDateTime,
              clothingLastSeenWearing: data.clothingLastSeenWearing,
              possibleDestinations: data.possibleDestinations,
              medicalConditions: data.medicalConditions,
              medicationsRequired: data.medicationsRequired,
              mentalHealthStatus: data.mentalHealthStatus,
              primaryContactPerson: data.primaryContactPerson,
              contactPhoneNumber: data.contactPhoneNumber,
              contactEmailAddress: data.contactEmailAddress,
              socialMediaAccounts: data.socialMediaAccounts,
              recentPhotos: data.recentPhotos ? data.recentPhotos.$values : [],
              videoUrl: data.videoUrl,
              briefDescriptionOfCircumstances: data.briefDescriptionOfCircumstances, // Added field
      
            });
          } else if (data.reportType === 'MissingItem') {
            setAdditionalInfo({
              itemName: data.itemName,
              itemDescription: data.itemDescription,
              serialNumber: data.serialNumber,
              uniqueIdentifiers: data.uniqueIdentifiers,
              lastKnownLocation: data.lastKnownLocation,
              lastSeenDateTime: data.lastSeenDateTime,
              circumstancesOfLoss: data.circumstancesOfLoss,
              ownerName: data.ownerName,
              ownerPhoneNumber: data.ownerPhoneNumber,
              ownerEmailAddress: data.ownerEmailAddress,
              recentPhotos: data.recentPhotos ? data.recentPhotos.$values : [],
              estimatedValue: data.estimatedValue,
              rewardOffered: data.rewardOffered,
              videoUrl: data.videoUrl,
            });
          }   
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
      let updateFunction;
      
      // Determine the appropriate update function based on reportType
      switch (report.reportType) {
        case 'MissingPerson':
          updateFunction = updateMissingPersonReport;
          break;
        case 'FoundPerson':
          updateFunction = updateFoundPersonReport;
          break;
        case 'MissingItem':
          updateFunction = updateMissingItemReport;
          break;
        case 'FoundItem':
          updateFunction = updateFoundItemReport;
          break;
        default:
          throw new Error('Invalid report type.');
      }
  
      // Call the determined update function
      await updateFunction(id, { ...report, ...additionalInfo });
      navigate('/reports');
    } catch (error) {
      setAlertMessage('Error updating report. Please try again.');
      setAlertVariant('danger');
      setShowAlert(true);
      console.error('Error updating report:', error);
    }
  };

  if (!report) return <div>Loading...</div>;

  const renderAdditionalFields = () => {
    switch (report.reportType) {
      case 'MissingPerson':
        return (
          <>
            {/* Personal Information */}
            <Form.Group controlId="fullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={additionalInfo.fullName || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="nickname">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                value={additionalInfo.nickname || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={additionalInfo.gender || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={additionalInfo.dateOfBirth || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="idNumber">
              <Form.Label>ID Number:</Form.Label>
              <Form.Control
                type="text"
                name="idNumber"
                value={additionalInfo.idNumber || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="nationality">
              <Form.Label>Nationality:</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={additionalInfo.nationality || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
        
            {/* Physical Description */}
            <Form.Group controlId="height">
              <Form.Label>Height:</Form.Label>
              <Form.Control
                type="text"
                name="height"
                value={additionalInfo.height || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label>Weight:</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                value={additionalInfo.weight || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="eyeColor">
              <Form.Label>Eye Color:</Form.Label>
              <Form.Control
                type="text"
                name="eyeColor"
                value={additionalInfo.eyeColor || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="hairColor">
              <Form.Label>Hair Color:</Form.Label>
              <Form.Control
                type="text"
                name="hairColor"
                value={additionalInfo.hairColor || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="distinguishingMarksOrFeatures">
              <Form.Label>Distinguishing Marks/Features:</Form.Label>
              <Form.Control
                type="text"
                name="distinguishingMarksOrFeatures"
                value={additionalInfo.distinguishingMarksOrFeatures || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Last Known Details */}
            <Form.Group controlId="lastSeenLocation">
              <Form.Label>Last Seen Location:</Form.Label>
              <Form.Control
                type="text"
                name="lastSeenLocation"
                value={additionalInfo.lastSeenLocation || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="lastSeenDateTime">
              <Form.Label>Last Seen Date/Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="lastSeenDateTime"
                value={additionalInfo.lastSeenDateTime || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="clothingLastSeenWearing">
              <Form.Label>Clothing Last Seen Wearing:</Form.Label>
              <Form.Control
                type="text"
                name="clothingLastSeenWearing"
                value={additionalInfo.clothingLastSeenWearing || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="possibleDestinations">
              <Form.Label>Possible Destinations:</Form.Label>
              <Form.Control
                type="text"
                name="possibleDestinations"
                value={additionalInfo.possibleDestinations || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Health Information */}
            <Form.Group controlId="medicalConditions">
              <Form.Label>Medical Conditions:</Form.Label>
              <Form.Control
                type="text"
                name="medicalConditions"
                value={additionalInfo.medicalConditions || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="medicationsRequired">
              <Form.Label>Medications Required:</Form.Label>
              <Form.Control
                type="text"
                name="medicationsRequired"
                value={additionalInfo.medicationsRequired || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="mentalHealthStatus">
              <Form.Label>Mental Health Status:</Form.Label>
              <Form.Control
                type="text"
                name="mentalHealthStatus"
                value={additionalInfo.mentalHealthStatus || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Contact Information */}
            <Form.Group controlId="primaryContactPerson">
              <Form.Label>Primary Contact Person:</Form.Label>
              <Form.Control
                type="text"
                name="primaryContactPerson"
                value={additionalInfo.primaryContactPerson || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="contactPhoneNumber">
              <Form.Label>Contact Phone Number:</Form.Label>
              <Form.Control
                type="text"
                name="contactPhoneNumber"
                value={additionalInfo.contactPhoneNumber || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="contactEmailAddress">
              <Form.Label>Contact Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="contactEmailAddress"
                value={additionalInfo.contactEmailAddress || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Additional Information */}
            <Form.Group controlId="socialMediaAccounts">
              <Form.Label>Social Media Accounts:</Form.Label>
              <Form.Control
                type="text"
                name="socialMediaAccounts"
                value={additionalInfo.socialMediaAccounts || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="recentPhotos">
              <Form.Label>Recent Photos (URLs):</Form.Label>
              <Form.Control
                type="text"
                name="recentPhotos"
                value={additionalInfo.recentPhotos || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="briefDescriptionOfCircumstances">
              <Form.Label>Brief Description of Circumstances:</Form.Label>
              <Form.Control
                type="text"
                name="briefDescriptionOfCircumstances"
                value={additionalInfo.briefDescriptionOfCircumstances || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="videoUrl">
              <Form.Label>Video URL:</Form.Label>
              <Form.Control
                type="url"
                name="videoUrl"
                value={additionalInfo.videoUrl || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
          </>
        );
       
      case 'MissingItem':
        return (
          <>
            {/* Item Information */}
            <Form.Group controlId="itemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                value={additionalInfo.itemName || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="itemDescription">
              <Form.Label>Item Description:</Form.Label>
              <Form.Control
                type="text"
                name="itemDescription"
                value={additionalInfo.itemDescription || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="serialNumber">
              <Form.Label>Serial Number:</Form.Label>
              <Form.Control
                type="text"
                name="serialNumber"
                value={additionalInfo.serialNumber || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="uniqueIdentifiers">
              <Form.Label>Unique Identifiers:</Form.Label>
              <Form.Control
                type="text"
                name="uniqueIdentifiers"
                value={additionalInfo.uniqueIdentifiers || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Last Known Details */}
            <Form.Group controlId="lastKnownLocation">
              <Form.Label>Last Known Location:</Form.Label>
              <Form.Control
                type="text"
                name="lastKnownLocation"
                value={additionalInfo.lastKnownLocation || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="lastSeenDateTime">
              <Form.Label>Last Seen Date/Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="lastSeenDateTime"
                value={additionalInfo.lastSeenDateTime || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="circumstancesOfLoss">
              <Form.Label>Circumstances of Loss:</Form.Label>
              <Form.Control
                type="text"
                name="circumstancesOfLoss"
                value={additionalInfo.circumstancesOfLoss || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Contact Information */}
            <Form.Group controlId="ownerName">
              <Form.Label>Owner Name:</Form.Label>
              <Form.Control
                type="text"
                name="ownerName"
                value={additionalInfo.ownerName || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="ownerPhoneNumber">
              <Form.Label>Owner Phone Number:</Form.Label>
              <Form.Control
                type="text"
                name="ownerPhoneNumber"
                value={additionalInfo.ownerPhoneNumber || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="ownerEmailAddress">
              <Form.Label>Owner Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="ownerEmailAddress"
                value={additionalInfo.ownerEmailAddress || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Additional Information */}
            <Form.Group controlId="recentPhotos">
              <Form.Label>Recent Photos (URLs):</Form.Label>
              <Form.Control
                type="text"
                name="recentPhotos"
                value={additionalInfo.recentPhotos || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="estimatedValue">
              <Form.Label>Estimated Value:</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="estimatedValue"
                value={additionalInfo.estimatedValue || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="rewardOffered">
              <Form.Label>Reward Offered:</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="rewardOffered"
                value={additionalInfo.rewardOffered || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="videoUrl">
              <Form.Label>Video URL:</Form.Label>
              <Form.Control
                type="url"
                name="videoUrl"
                value={additionalInfo.videoUrl || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
          </>
        );
        
      case 'FoundPerson':
        return (
          <>
            {/* Personal Information */}
            <Form.Group controlId="fullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={additionalInfo.fullName || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="nickname">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                value={additionalInfo.nickname || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={additionalInfo.gender || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="estimatedAge">
              <Form.Label>Estimated Age:</Form.Label>
              <Form.Control
                type="number"
                name="estimatedAge"
                value={additionalInfo.estimatedAge || ''}
                onChange={handleAdditionalInfoChange}
                min="0"
                max="150"
              />
            </Form.Group>
            <Form.Group controlId="nationality">
              <Form.Label>Nationality:</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={additionalInfo.nationality || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
        
            {/* Physical Description */}
            <Form.Group controlId="height">
              <Form.Label>Height:</Form.Label>
              <Form.Control
                type="text"
                name="height"
                value={additionalInfo.height || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label>Weight:</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                value={additionalInfo.weight || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="eyeColor">
              <Form.Label>Eye Color:</Form.Label>
              <Form.Control
                type="text"
                name="eyeColor"
                value={additionalInfo.eyeColor || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="hairColor">
              <Form.Label>Hair Color:</Form.Label>
              <Form.Control
                type="text"
                name="hairColor"
                value={additionalInfo.hairColor || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="distinguishingMarksOrFeatures">
              <Form.Label>Distinguishing Marks/Features:</Form.Label>
              <Form.Control
                type="text"
                name="distinguishingMarksOrFeatures"
                value={additionalInfo.distinguishingMarksOrFeatures || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Current Details */}
            <Form.Group controlId="foundLocation">
              <Form.Label>Found Location:</Form.Label>
              <Form.Control
                type="text"
                name="foundLocation"
                value={additionalInfo.foundLocation || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="foundDateTime">
              <Form.Label>Found Date/Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="foundDateTime"
                value={additionalInfo.foundDateTime || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="clothingAtTimeOfFinding">
              <Form.Label>Clothing at Time of Finding:</Form.Label>
              <Form.Control
                type="text"
                name="clothingAtTimeOfFinding"
                value={additionalInfo.clothingAtTimeOfFinding || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="conditionWhenFound">
              <Form.Label>Condition When Found:</Form.Label>
              <Form.Control
                type="text"
                name="conditionWhenFound"
                value={additionalInfo.conditionWhenFound || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Health Information */}
            <Form.Group controlId="observedMedicalConditions">
              <Form.Label>Observed Medical Conditions:</Form.Label>
              <Form.Control
                type="text"
                name="observedMedicalConditions"
                value={additionalInfo.observedMedicalConditions || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="observedMedications">
              <Form.Label>Observed Medications:</Form.Label>
              <Form.Control
                type="text"
                name="observedMedications"
                value={additionalInfo.observedMedications || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="observedMentalHealthStatus">
              <Form.Label>Observed Mental Health Status:</Form.Label>
              <Form.Control
                type="text"
                name="observedMentalHealthStatus"
                value={additionalInfo.observedMentalHealthStatus || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Additional Information */}
            <Form.Group controlId="recentPhotos">
              <Form.Label>Recent Photos (URLs):</Form.Label>
              <Form.Control
                type="text"
                name="recentPhotos"
                value={additionalInfo.recentPhotos || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="videoUrl">
              <Form.Label>Video URL:</Form.Label>
              <Form.Control
                type="url"
                name="videoUrl"
                value={additionalInfo.videoUrl || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
          </>
        );
        
      case 'FoundItem':
        return (
          <>
            {/* Item Information */}
            <Form.Group controlId="itemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                value={additionalInfo.itemName || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="itemDescription">
              <Form.Label>Item Description:</Form.Label>
              <Form.Control
                type="text"
                name="itemDescription"
                value={additionalInfo.itemDescription || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="serialNumber">
              <Form.Label>Serial Number:</Form.Label>
              <Form.Control
                type="text"
                name="serialNumber"
                value={additionalInfo.serialNumber || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="uniqueIdentifiers">
              <Form.Label>Unique Identifiers:</Form.Label>
              <Form.Control
                type="text"
                name="uniqueIdentifiers"
                value={additionalInfo.uniqueIdentifiers || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Current Details */}
            <Form.Group controlId="foundLocation">
              <Form.Label>Found Location:</Form.Label>
              <Form.Control
                type="text"
                name="foundLocation"
                value={additionalInfo.foundLocation || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="foundDateTime">
              <Form.Label>Found Date/Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="foundDateTime"
                value={additionalInfo.foundDateTime || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="conditionOfItemWhenFound">
              <Form.Label>Condition of Item When Found:</Form.Label>
              <Form.Control
                type="text"
                name="conditionOfItemWhenFound"
                value={additionalInfo.conditionOfItemWhenFound || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Contact Information */}
            <Form.Group controlId="reportingPersonName">
              <Form.Label>Reporting Person Name:</Form.Label>
              <Form.Control
                type="text"
                name="reportingPersonName"
                value={additionalInfo.reportingPersonName || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="reportingPersonPhoneNumber">
              <Form.Label>Reporting Person Phone Number:</Form.Label>
              <Form.Control
                type="text"
                name="reportingPersonPhoneNumber"
                value={additionalInfo.reportingPersonPhoneNumber || ''}
                onChange={handleAdditionalInfoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="reportingPersonEmailAddress">
              <Form.Label>Reporting Person Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="reportingPersonEmailAddress"
                value={additionalInfo.reportingPersonEmailAddress || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
        
            {/* Additional Information */}
            <Form.Group controlId="recentPhotos">
              <Form.Label>Recent Photos (URLs):</Form.Label>
              <Form.Control
                type="text"
                name="recentPhotos"
                value={additionalInfo.recentPhotos || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="circumstancesOfFinding">
              <Form.Label>Circumstances of Finding:</Form.Label>
              <Form.Control
                type="text"
                name="circumstancesOfFinding"
                value={additionalInfo.circumstancesOfFinding || ''}
                onChange={handleAdditionalInfoChange}
              />
            </Form.Group>
            <Form.Group controlId="videoUrl">
              <Form.Label>Video URL:</Form.Label>
              <Form.Control
                type="url"
                name="videoUrl"
                value={additionalInfo.videoUrl || ''}
                onChange={handleAdditionalInfoChange}
              />
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
          <h2>Update Report</h2>
          {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reportType">
              <Form.Label>Report Type</Form.Label>
              <Form.Control as="select" name="reportType" value={report.reportType || ''} onChange={handleChange} required>
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
              <Form.Control
                as="textarea"
                name="description"
                value={report.description || ''}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mt-4">
              <Button variant="primary" type="submit">
                Update Report
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateReport;
