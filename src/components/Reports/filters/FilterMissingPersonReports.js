import React, { useState } from 'react';
import { filterMissingPersonReports } from '../../../api/api'; // Adjust the import path as needed
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const FilterMissingPersonReports = () => {
    const [filters, setFilters] = useState({
        fullName: '',
        lastSeenLocation: '',
        lastSeenDateTimeFrom: '',
        lastSeenDateTimeTo: Date.now.toString()
    });
    const [filteredReports, setFilteredReports] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleFilter = async (e) => {
        e.preventDefault();
        try {
            const results = await filterMissingPersonReports(filters);
            setFilteredReports(results);
            setError(null);
        } catch (error) {
            console.error('Error filtering reports:', error);
            setError('An error occurred while filtering reports. Please try again later.');
        }
    };

      // Get the base URL from environment variables
  const ImageURL = "http://localhost:5157/";

    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <Form onSubmit={handleFilter} className="p-3 bg-light rounded">
                        <h4>Filters</h4>
                        <Form.Group controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={filters.fullName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastSeenLocation">
                            <Form.Label>Last Seen Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastSeenLocation"
                                value={filters.lastSeenLocation}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastSeenDateTimeFrom">
                            <Form.Label>Last Seen Date From</Form.Label>
                            <Form.Control
                                type="date"
                                name="lastSeenDateTimeFrom"
                                value={filters.lastSeenDateTimeFrom || '2024-07-01' }
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastSeenDateTimeTo">
                            <Form.Label>Last Seen Date To</Form.Label>
                            <Form.Control
                                type="date"
                                name="lastSeenDateTimeTo"
                                value={filters.lastSeenDateTimeTo || '2024-07-01' }
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Filter
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Row>
                        {filteredReports.$values && filteredReports.$values.length > 0 ? (
                            filteredReports.$values.map(report => (
                                <Col md={6} lg={4} key={report.id} className="mb-4">
                                    <Card>
                                        <Card.Img variant="top" src={report.recentPhotos && report.recentPhotos.$values
                                            ? `${ImageURL}${report.recentPhotos.$values}`
                                            : "https://placehold.co/600x400.png"} />
                                        <Card.Body>
                                            <Card.Title>{report.fullName}</Card.Title>
                                            <Card.Text>
                                                <strong>Last Seen Location:</strong> {report.lastSeenLocation}<br />
                                                <strong>Last Seen Date:</strong> {new Date(report.lastSeenDateTime).toLocaleDateString()}<br />
                                                {/* Add more fields as necessary */}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <p>No reports found</p>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default FilterMissingPersonReports;
