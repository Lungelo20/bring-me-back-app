import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const LoginComponent = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login, authError } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors
        try {
            await login(credentials.email, credentials.password);
            navigate('/'); // Redirect on successful login
        } catch (error) {
            // Display error message
            setError('Login failed. Please check your credentials and try again.');       
            // Hide error message after 5 seconds
            setTimeout(() => setError(''), 2000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6} lg={4}>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {authError && <Alert variant="danger">{authError}</Alert>}
                    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginComponent;
