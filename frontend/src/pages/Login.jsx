import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Card, Form, FloatingLabel, Button } from 'react-bootstrap';

import imgLogo from '../assets/img/logo02.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = 'adsda';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('', {
            //     email,
            //     password
            // });

            // if (response.data.token) {
            if (token) {
                // localStorage.setItem('token', response.data.token);
                localStorage.setItem('token', token);
                navigate('/');
            }
        } catch (err) {
            setError('Error al iniciar sesión');
        }
    };

    return (
        <div className='App d-flex justify-content-center align-items-center min-vh-100'>
            <div className='align-self-center'>
                <Card className='bg-white bg-opacity-50 rounded-4'>
                    <Card.Body className='m-4'>
                        <div className='cnt-img-lgn text-center mb-3'>
                            <img src={imgLogo} alt="Logo" className='img-fluid' />
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <FloatingLabel controlId="floatingInput" label="Correo Electrónico" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </FloatingLabel>

                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Button variant="gd" type="submit">Entrar</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Login;
