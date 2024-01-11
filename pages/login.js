import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signIn } from 'next-auth/react';

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password
          });
        
          if (result.error) {
            console.error('Login failed:', result.error);
          } else {
            router.push('/'); // Redirect to homepage after successful login
          }
        /*
        try {
            const response = await fetch('/api/authenticateUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('Login successful');
                // Redirect to homepage or dashboard
                router.push('/');
            } else {
                console.error(`Login failed: ${responseData.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }*/
    };
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

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </>
    );
}
