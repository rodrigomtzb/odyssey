import React, { useState } from "react";
import { Card, Form, FloatingLabel, Button } from "react-bootstrap";

import AuthService from "../services/auth.service";
import imgLogo from "../assets/img/logo02.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    try {
      AuthService.login(credentials.username, credentials.password).then(
        (response) => {
          if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/");
          }
        }
      );
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
    <div className="App d-flex justify-content-center align-items-center min-vh-100 h-100">
      <div className="align-self-center">
        <Card className="bg-white bg-opacity-50 rounded-4">
          <Card.Body className="m-4">
            <div className="cnt-img-lgn text-center mb-3">
              <img src={imgLogo} alt="Logo" className="img-fluid" />
            </div>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
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
