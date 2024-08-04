import React, { useState } from 'react';
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaTag, FaGenderless } from 'react-icons/fa';

const FilterComponent = () => {
  const [filters, setFilters] = useState({
    location: '',
    startDate: '',
    endDate: '',
    reportType: '',
    gender: '',
    isResolved: false,
    isDiscovery: false,
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Handle filter submission
    console.log(filters);
  };

  return (
    <Form onSubmit={handleFilterSubmit} className="filter-component mt-4 p-4 border rounded bg-light shadow-sm">
      <h5 className="mb-4">Filters</h5>
      
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4} className="d-flex align-items-center">
          <FaMapMarkerAlt className="me-2" /> Location:
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            type="text"
            name="location"
            placeholder="Enter location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4} className="d-flex align-items-center">
          <FaCalendarAlt className="me-2" /> Date Range:
        </Form.Label>
        <Col sm={4}>
          <InputGroup>
            <Form.Control
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </InputGroup>
        </Col>
        <Col sm={4}>
          <InputGroup>
            <Form.Control
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </InputGroup>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4} className="d-flex align-items-center">
          <FaTag className="me-2" /> Report Type:
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            as="select"
            name="reportType"
            value={filters.reportType}
            onChange={handleFilterChange}
          >
            <option value="">Select type</option>
            <option value="missingPerson">Missing Person</option>
            <option value="foundPerson">Found Person</option>
            <option value="item">Item</option>
            {/* Add other report types here */}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4} className="d-flex align-items-center">
          <FaGenderless className="me-2" /> Gender:
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            as="select"
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="unknown">Unknown</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={12}>
          <Form.Check
            type="checkbox"
            name="isResolved"
            label="Resolved"
            checked={filters.isResolved}
            onChange={handleFilterChange}
          />
          <Form.Check
            type="checkbox"
            name="isDiscovery"
            label="Discovery"
            checked={filters.isDiscovery}
            onChange={handleFilterChange}
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        <FaSearch /> Apply Filters
      </Button>
    </Form>
  );
};

export default FilterComponent;
