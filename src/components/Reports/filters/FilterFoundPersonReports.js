import React, { useState } from 'react';
import { filterFoundPersonReports } from '../../../api/api'; // Adjust the import path as needed
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const FilterFoundPersonReports = () => {
    const [filters, setFilters] = useState({
        fullName: '',
        foundLocation: '',
        foundDateTimeFrom: '2024-07-01',
        foundDateTimeTo: '2024-07-01'
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
            const results = await filterFoundPersonReports(filters);
            setFilteredReports(results);
            setError(null);
        } catch (error) {
            console.error('Error filtering reports:', error);
            setError('An error occurred while filtering reports. Please try again later.');
        }
    };

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
                        <Form.Group controlId="formFoundLocation">
                            <Form.Label>Found Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="foundLocation"
                                value={filters.foundLocation}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFoundDateTimeFrom">
                            <Form.Label>Found Date From</Form.Label>
                            <Form.Control
                                type="date"
                                name="foundDateTimeFrom"
                                value={filters.foundDateTimeFrom || '2024-07-01'}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFoundDateTimeTo">
                            <Form.Label>Found Date To</Form.Label>
                            <Form.Control
                                type="date"
                                name="foundDateTimeTo"
                                value={filters.foundDateTimeTo || '2024-07-01'}
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
                                        <Card.Img variant="top" src={report.imageUrl || 'https://via.placeholder.com/150'} />
                                        <Card.Body>
                                            <Card.Title>{report.fullName}</Card.Title>
                                            <Card.Text>
                                                <strong>Found Location:</strong> {report.foundLocation}<br />
                                                <strong>Found Date:</strong> {new Date(report.foundDateTime).toLocaleDateString()}<br />
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

export default FilterFoundPersonReports;
