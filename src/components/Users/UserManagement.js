import React, { useState, useEffect } from 'react';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../api/api';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'General' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            if (data && Array.isArray(data.$values)) {
                setUsers(data.$values);
            } else {
                setUsers([]);
                console.error('Expected an array but received:', data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Set to empty array in case of error
        }
    };

    const handleCreateUser = async () => {
        try {
            await createUser(newUser);
            fetchUsers();
            setNewUser({ name: '', email: '', password: '', role: 'General' });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            await updateUser(selectedUser.id, selectedUser);
            fetchUsers();
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSelectUser = async (id) => {
        try {
            const user = await getUserById(id);
            setSelectedUser(user);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <Container>
            <Row className="my-4">
                <Col md={6}>
                    <Card>
                        <Card.Header>Create New User</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formRole">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    >
                                        <option value="General">General</option>
                                        <option value="Organization">Organization</option>
                                        <option value="CommunityMember">Community Member</option>
                                        <option value="FamilyMember">Family Member</option>
                                        <option value="PublicAuthority">Public Authority</option>
                                        <option value="Volunteer">Volunteer</option>
                                        <option value="DonorSupporter">Donor Supporter</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" onClick={handleCreateUser}>Create User</Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {selectedUser && (
                        <Card className="mt-4">
                            <Card.Header>Edit User</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter name"
                                            value={selectedUser.name}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={selectedUser.email}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            value={selectedUser.password}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formRole">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={selectedUser.role}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                                        >
                                            <option value="General">General</option>
                                            <option value="Organization">Organization</option>
                                            <option value="CommunityMember">Community Member</option>
                                            <option value="FamilyMember">Family Member</option>
                                            <option value="PublicAuthority">Public Authority</option>
                                            <option value="Volunteer">Volunteer</option>
                                            <option value="DonorSupporter">Donor Supporter</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleUpdateUser}>Update User</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    )}
                </Col>

                <Col md={6}>
                    <Card>
                        <Card.Header>User List</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {users.map((user) => (
                                    <ListGroup.Item key={user.id}>
                                        {user.name} - {user.email}
                                        <Button
                                            variant="outline-primary"
                                            className="float-right ml-2"
                                            onClick={() => handleSelectUser(user.id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            className="float-right"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserManagement;
