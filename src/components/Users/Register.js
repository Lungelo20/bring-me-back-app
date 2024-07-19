import React, { useState } from 'react';
import { createUser } from '../../api/api';
import { Form, Button } from 'react-bootstrap';

const RegisterComponent = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    location: '',
    role: 'General',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser(userData);
      console.log('User registered:', newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default RegisterComponent;
