import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSession } from 'next-auth/react';

export default function Register() {
    const router = useRouter();
    const { name } = router.query;
    const { data: session, status } = useSession();

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
        theme: ''
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(name);
                const checkResponse = await fetch(`/api/findSetByName?searchName=${name}`);
                console.log(checkResponse);
                const checkData = await checkResponse.json();
                console.log(checkData);
                if (checkData.data) {
                    setFormData({ ...checkData.data });
                }
            } catch (error) {
                console.error('Error fetching set:', error);
            }
        };

        
        if (name) {
            fetchData();
        }
    }, [name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateResponse = await fetch(`/api/updateSet?searchID=${formData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (updateResponse.ok) {
                console.log('Set updated successfully');
                router.push('/collection'); // Redirect after successful update
            } else {
                console.error('Failed to update set');
            }
        } catch (error) {
            console.error('Error during set update:', error);
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
                    <Form.Control
                        type="text"
                        name="set_num"
                        value={formData.theme.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </>
    );
}
