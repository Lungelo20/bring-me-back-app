import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import '../../styles/ReportDetail.css';

const ReportDetail = ({ report }) => {
  
  if (!report) {
    return <div>Report not found</div>;
  }

  const {
    fullName,
    itemName,
    foundLocation,
    lastSeenLocation,
    lastKnownLocation,
    conditionWhenFound,
    medicalConditions,
    uniqueIdentifiers,
    foundDateTime,
    lastSeenDateTime,
    description,
    gender,
    dateOfBirth,
    primaryContactPerson,
    contactPhoneNumber,
    contactEmailAddress,
    socialMediaAccounts,
    recentPhotos,
    additionalNotes,        // Assuming these are new fields
    rewardOffered,          // New field
    videoUrl                // New field
  } = report;

  return (
    <Container className="report-detail my-4">
      <Row>
        <Col md={4} className="d-flex justify-content-center mb-3 mb-md-0">
          <Card style={{ width: '18rem' }}>
            <Card.Img 
              variant="top" 
              src={recentPhotos ? recentPhotos : 'https://placehold.co/600x400.png'} 
              alt={fullName} 
              className="report-image"
            />
            <Card.Body>
              <Card.Title>{fullName || itemName || 'Name not specified'}</Card.Title>
              <Card.Text>
                <strong>Location:</strong> {foundLocation || lastSeenLocation || lastKnownLocation || 'Location not specified'}
              </Card.Text>
              <Card.Text>
                <strong>Condition:</strong> {conditionWhenFound || medicalConditions || uniqueIdentifiers || 'Condition not specified'}
              </Card.Text>
              <Card.Text>
                <strong>Date:</strong> {new Date(foundDateTime || lastSeenDateTime).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Description</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Gender:</strong> {gender}</ListGroup.Item>
                    <ListGroup.Item><strong>Date of Birth:</strong> {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : 'Date of Birth not specified'}</ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Contact:</strong> {primaryContactPerson || 'Contact not specified'}
                      <br />
                      {contactPhoneNumber && <span>Phone: {contactPhoneNumber}</span>}
                      <br />
                      {contactEmailAddress && <span>Email: {contactEmailAddress}</span>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Social Media:</strong> {socialMediaAccounts || 'No social media accounts specified'}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Additional Information</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Additional Notes:</strong> {additionalNotes || 'No additional notes'}</ListGroup.Item>
                    <ListGroup.Item><strong>Reward Offered:</strong> {rewardOffered ? `$${rewardOffered}` : 'No reward offered'}</ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Video:</strong> {videoUrl ? <a href={videoUrl} target="_blank" rel="noopener noreferrer">Watch Video</a> : 'No video available'}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportDetail;
