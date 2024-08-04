// SearchComponent.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Make sure you have react-icons installed

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add your search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <Form onSubmit={handleSearchSubmit} className="search-component d-flex align-items-center p-4 border rounded bg-light shadow-sm">
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <Button variant="primary" type="submit" className="search-button">
        <FaSearch />
      </Button>
    </Form>
  );
};

export default SearchComponent;
