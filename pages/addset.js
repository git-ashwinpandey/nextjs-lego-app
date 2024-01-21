import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSession } from 'next-auth/react';

export default function AddSet() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [themes, setThemes] = useState([]);
    useEffect(() => {
        // Redirect to login if not logged in
        if (status !== 'loading' && !session) {
            router.push('/login');
        }
    }, [session, status, router]);

    const [formData, setFormData] = useState({
        set_num: '',
        name: '',
        year: '',
        num_parts: '',
        img_url: '',
        theme: {}
    });

    useEffect(() => {
        const fetchThemes = async () => {
            const response = await fetch('/api/getThemes');
            if (response.ok) {
                const data = await response.json();
                setThemes(data);
            }
        };

        fetchThemes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'theme') {
            const selectedThemeId = value.toString();
            console.log(selectedThemeId);
            const selectedTheme = themes.find(theme => theme.id === selectedThemeId);
            console.log(selectedTheme);
            setFormData(prevState => ({ ...prevState, theme: selectedTheme || {} }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handle submission");
        console.log(formData);
        try {
            const response = await fetch('/api/addSet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Registration was successful
                console.log('Added new set');
            } else {
                // Registration failed
                console.error('Failed to add set');
                
            }
        } catch (error) {
            console.error('Error during adding a new set:', error);
        }
    };

    return (
        <>
            <Form
                className="position-relative w-25 top-0 start-50 translate-middle-x"
                onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3" controlId="formSetNum">
                    <Form.Label>Set Num</Form.Label>
                    <Form.Control
                        type="text"
                        name="set_num"
                        value={formData.set_num}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formNumParts">
                    <Form.Label>Num Parts</Form.Label>
                    <Form.Control
                        type="number"
                        name="num_parts"
                        value={formData.num_parts}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImgUrl">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="img_url"
                        value={formData.img_url}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTheme">
                    <Form.Label>Theme</Form.Label>
                    <Form.Select
                        name="theme"
                        value={formData.theme.id}
                        onChange={handleChange}
                        required
                    >
                        {themes.map(theme => (
                            <option key={theme.id} value={theme.id} name={theme.name}>{theme.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
        </>
    );
}
