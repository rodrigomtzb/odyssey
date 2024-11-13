import React, { useState } from "react";
import { Card, Form, FloatingLabel, Button } from "react-bootstrap";

import AuthService from "../services/auth.service";
import imgLogo from "../assets/img/logo02.png";
import odyssey from "../assets/img/Odyssey.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Loader } from "../components";
import { useLoader } from "../context/Loader/LoaderProvider";

const Login = () => {
  const { isLoading } = useLoader();
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
      AuthService.login(credentials.username, credentials.password)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: `Bienvenido`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              navigate("/");
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Swal.fire({
              title: "Error",
              text: "Credenciales erroneas",
              icon: "error",
              showConfirmButton: false,
              timer: 2500,
            });
          } else if (error.response.status === 409) {
            Swal.fire({
              title: "Sesión activa",
              text: "Cierra tu sesión anterior o llama al departamento de Sistemas",
              icon: "error",
              showConfirmButton: false,
              timer: 3500,
            });
          }
        });
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
    <>
      <div className="App d-flex justify-content-center align-items-center max-vh-100 h-100">
        <div className="align-self-center p-3">
          <Card className="bg-white bg-opacity-50 rounded-4">
            <Card.Body className="m-4 m-md-0">
              <div className="text-center mb-3 p-2 logo">
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
          <div className="text-center mt-3 mb-0 p-2">
            <img src={odyssey} alt="Odyssey Logo" className="img-fluid" style={{height: "30px"}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
