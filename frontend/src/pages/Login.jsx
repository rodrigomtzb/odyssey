import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Card, Form, FloatingLabel, Button } from "react-bootstrap";

import imgLogo from "../assets/img/logo02.png";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://ec2-98-82-230-34.compute-1.amazonaws.com:8080/api/auth/signin",
        credentials
      );

      if (response.status == 200) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="App d-flex justify-content-center align-items-center min-vh-100">
      <div className="align-self-center">
        <Card className="bg-white bg-opacity-50 rounded-4">
          <Card.Body className="m-4">
            <div className="cnt-img-lgn text-center mb-3">
              <img src={imgLogo} alt="Logo" className="img-fluid" />
            </div>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Correo Electrónico"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword"
                label="Contraseña"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button variant="gd" type="submit" className="w-100">
                Entrar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
