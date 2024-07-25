import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import CommentSection from '../Reports/comments/CommentSection'; // Import the new CommentSection component
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
    additionalNotes,
    rewardOffered
  } = report;

  const ImageURL = "http://localhost:5157/";

  // Helper function to check if the value is an array
  const isArray = (value) => Array.isArray(value);

  return (
    <Container className="report-detail my-4">
      <Row>
        <Col md={4} className="d-flex justify-content-center mb-3 mb-md-0">
          <Card style={{ width: '18rem' }}>
            <Card.Img
              variant="top"
              src={recentPhotos && isArray(recentPhotos.$values)
                ? `${ImageURL}${recentPhotos.$values[0]}`
                : "https://placehold.co/600x400.png"}
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
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Description</Card.Title>
                  <Card.Text>{description || 'Description not available'}</Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Gender:</strong> {gender || 'Gender not specified'}</ListGroup.Item>
                    <ListGroup.Item><strong>Date of Birth:</strong> {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : 'Date of Birth not specified'}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Additional Information</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Additional Notes:</strong> {additionalNotes || 'No additional notes'}</ListGroup.Item>
                    <ListGroup.Item><strong>Reward Offered:</strong> {rewardOffered ? `$${rewardOffered}` : 'No reward offered'}</ListGroup.Item>
                    <ListGroup.Item><strong>Contact:</strong> {primaryContactPerson || 'No contact person specified'}</ListGroup.Item>
                    <ListGroup.Item><strong>Phone:</strong> {contactPhoneNumber || 'No contact phone number specified'}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {contactEmailAddress || 'No contact email specified'}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Social Media Accounts</Card.Title>
                  <ListGroup variant="flush">
                    {isArray(socialMediaAccounts) && socialMediaAccounts.length > 0 ? (
                      socialMediaAccounts.map((account, index) => (
                        <ListGroup.Item key={index}>
                          <a href={account.url} target="_blank" rel="noopener noreferrer">{account.platform}</a>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <ListGroup.Item>No social media accounts provided</ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <CommentSection reportId={report.reportId} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportDetail;
