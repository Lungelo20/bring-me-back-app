import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ReportFilter = ({ onFilter }) => {
  const [filterParams, setFilterParams] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterParams({ ...filterParams, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filterParams);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="filterItemName">
        <Form.Label>Item Name</Form.Label>
        <Form.Control
          type="text"
          name="itemName"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="filterFoundLocation">
        <Form.Label>Found Location</Form.Label>
        <Form.Control
          type="text"
          name="foundLocation"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="filterFoundDateTime">
        <Form.Label>Found DateTime</Form.Label>
        <Form.Control
          type="datetime-local"
          name="foundDateTime"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Filter
      </Button>
    </Form>
  );
};

export default ReportFilter;
