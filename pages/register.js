import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Register() {
    const [regResponse, setRegResponse] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            console.error('Passwords do not match');
            return;
          }
        // Check if the email already exists in the database
        try {
            const checkResponse = await fetch(`/api/queryUser?email=${formData.email}`);
            const checkData = await checkResponse.json();

            if (checkData.result) {
                // Email already exists, show an error message or take appropriate action
                console.error('Email already exists');
                return; // Exit the function to prevent registration
            }
        } catch (error) {
            console.error('Error checking email existence:', error);
        }

        // Proceed with registration
        try {
            const response = await fetch('/api/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Registration was successful
                console.log('Registration successful');
                setRegResponse(true);
            } else {
                // Registration failed
                console.error('Registration failed');
                
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    if (regResponse) {
        
        console.log("redirecting to /");
        router.push('/'); // Use the router to navigate
    }


    return (
        <>
            <Form
                className="position-relative w-25 top-0 start-50 translate-middle-x"
                onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Form.Text className="text-muted">
                        We&apos;ll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </>
    );
}
