import { Card, Form, Button, Stack, Col, Row } from "react-bootstrap";
import CancelButton from "../../../components/CancelButton";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const { id } = useParams();
  const roles = ["admin", "mod", "user"];
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setFormData({
        ...formData,
        email: value,
        username: value,
      });
    } else if (name === "role") {
      const roles = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({
        ...formData,
        role: roles,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://ec2-98-82-230-34.compute-1.amazonaws.com:8080/api/auth/signup",
        formData
      );

      if (response.status === 200) {
        alert("Usuario creado con éxito");
      }
    } catch (error) {
      console.error("Hubo un error al enviar el formulario:", error);
      alert("Error al crear el usuario");
    }
  };
  return (
    <Card
      className="mt-3 border border-0 p-4"
      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
    >
      <Card>
        <div
          className="bg-gd d-flex align-items-center p-2 mb-4 rounded"
          style={{ width: "fit-content" }}
        >
          <h5 className="m-0">
            {id ? "Informacion de Usuario" : "Información de Registro"}
          </h5>
        </div>
        <Form onSubmit={handleSubmit}>
          {/* <Form.Group className="mb-3" controlId="names">
            <Form.Label>Nombre(s)</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Ingresa los nombres"
              required
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="firstLastName">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  placeholder="Ingresa el apellido paterno"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="secondLastName">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  placeholder="Ingresa el apellido materno"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="birthDate">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control className="form-input" type="date" required />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control
              className="form-input"
              type="email"
              name="email"
              placeholder="ejemplo@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              className="form-input"
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="telephone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Ingresa el teléfono"
              required
            />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              className="form-input"
              name="role"
              multiple={true}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {roles.map((rol, index) => (
                <option key={index} value={rol}>
                  {rol}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {id ? (
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Estado</Form.Label>
              <Form.Select className="form-input">
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </Form.Select>
            </Form.Group>
          ) : (
            ""
          )}
          <Stack direction="horizontal" gap={2}>
            <Button variant="gd" className="ms-auto" type="submit">
              {id ? "Actualizar" : "Registrar"}
            </Button>
          </Stack>
        </Form>
      </Card>
    </Card>
  );
};

export default UserForm;
