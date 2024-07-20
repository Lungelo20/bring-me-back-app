import React, { useState } from 'react';
import { createUser } from '../../api/api';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    location: '',
    role: 'General', //General user soon, to be Super Admin user
    additionalInfo: {}
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAdditionalInfoChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      additionalInfo: {
        ...userData.additionalInfo,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      
      const newUser = await createUser(userData);
      setSuccess('Registration successful!');
      // Delay before navigating
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
    }, 2000); // Delay in milliseconds (2 seconds in this example)
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.response?.data || 'Error creating user.');
    }
  };

  const renderAdditionalInfo = () => {
    switch (userData.role) {
      case 'CommunityMember':
        return (
          <>
            <Form.Group>
              <Form.Label>Community Role</Form.Label>
              <Form.Control
                type="text"
                name="communityRole"
                value={userData.additionalInfo.communityRole || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Community Role"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Community Affiliation</Form.Label>
              <Form.Control
                type="text"
                name="communityAffiliation"
                value={userData.additionalInfo.communityAffiliation || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Community Affiliation"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Verification</Form.Label>
              <Form.Control
                type="text"
                name="verification"
                value={userData.additionalInfo.verification || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Verification"
              />
            </Form.Group>
          </>
        );
      case 'DonorSupporter':
        return (
          <>
            <Form.Group>
              <Form.Label>Donation Preference</Form.Label>
              <Form.Control
                type="text"
                name="donationPreference"
                value={userData.additionalInfo.donationPreference || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Donation Preference"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Message of Support</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="messageOfSupport"
                value={userData.additionalInfo.messageOfSupport || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Message of Support"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Payment Information</Form.Label>
              <Form.Control
                type="text"
                name="paymentInformation"
                value={userData.additionalInfo.paymentInformation || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Payment Information"
              />
            </Form.Group>
          </>
        );
      case 'FamilyMember':
        return (
          <>
            <Form.Group>
              <Form.Label>Relation to Missing Person</Form.Label>
              <Form.Control
                type="text"
                name="relationToMissingPerson"
                value={userData.additionalInfo.relationToMissingPerson || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Relation to Missing Person"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Details of Missing Person</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="detailsOfMissingPerson"
                value={userData.additionalInfo.detailsOfMissingPerson || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Details of Missing Person"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control
                type="file"
                name="uploadPhoto"
                onChange={(e) => handleAdditionalInfoChange(e)}
              />
            </Form.Group>
          </>
        );
      case 'Organization':
        return (
          <>
            <Form.Group>
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                name="organizationName"
                value={userData.additionalInfo.organizationName || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Organization Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Organization Type</Form.Label>
              <Form.Control
                type="text"
                name="organizationType"
                value={userData.additionalInfo.organizationType || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Organization Type"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                name="registrationNumber"
                value={userData.additionalInfo.registrationNumber || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Registration Number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={userData.additionalInfo.address || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Address"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                name="contactPerson"
                value={userData.additionalInfo.contactPerson || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Contact Person"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="contactPhoneNumber"
                value={userData.additionalInfo.contactPhoneNumber || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Contact Phone Number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                name="contactEmail"
                value={userData.additionalInfo.contactEmail || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Contact Email"
              />
            </Form.Group>
          </>
        );
      case 'PublicAuthority':
        return (
          <>
            <Form.Group>
              <Form.Label>Position or Agency</Form.Label>
              <Form.Control
                type="text"
                name="positionOrAgency"
                value={userData.additionalInfo.positionOrAgency || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Position or Agency"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Authorization</Form.Label>
              <Form.Control
                type="text"
                name="authorization"
                value={userData.additionalInfo.authorization || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Authorization"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Access Credentials</Form.Label>
              <Form.Control
                type="text"
                name="accessCredentials"
                value={userData.additionalInfo.accessCredentials || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Access Credentials"
              />
            </Form.Group>
          </>
        );
      case 'Volunteer':
        return (
          <>
            <Form.Group>
              <Form.Label>Volunteer Experience</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="volunteerExperience"
                value={userData.additionalInfo.volunteerExperience || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Volunteer Experience"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type="text"
                name="availability"
                value={userData.additionalInfo.availability || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Availability"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Interest Area</Form.Label>
              <Form.Control
                type="text"
                name="interestArea"
                value={userData.additionalInfo.interestArea || ''}
                onChange={handleAdditionalInfoChange}
                placeholder="Interest Area"
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={10} lg={8}>
          <h2 className="text-center mb-4">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={userData.location}
                    onChange={handleChange}
                    placeholder="Location"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                  >
                    <option value="General">General</option>
                    <option value="Organization">Organization</option>
                    <option value="CommunityMember">Community Member</option>
                    <option value="FamilyMember">Family Member</option>
                    <option value="PublicAuthority">Public Authority</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="DonorSupporter">Donor/Supporter</option>
                  </Form.Control>
                </Form.Group>
                {renderAdditionalInfo()}
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="w-100 mt-3">Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterComponent;
