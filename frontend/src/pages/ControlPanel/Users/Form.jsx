import { Card, Form, Button, Stack, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2';

import {
  Input,
  Select,
  CheckboxGroup,
  TitleSection,
} from "../../../components/Form";
import {
  handleEmailChange,
  handleFormChange,
  handleCheckboxChange,
} from "../../../utils";

import AuthService from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const roles = ["admin", "mod", "user"];
  const status = ["ACTIVO", "INACTIVO"];
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    try {
      AuthService.register(formData).then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Usuario registrado",
            showConfirmButton: false,
            timer: 3500,
          });
          navigate("/users");
        }
      });
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
        <TitleSection
          text={id ? "Informacion de Usuario" : "Información de Registro"}
          isFirst withReturnButton
        />
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          {/* <Form.Group className="mb-3" controlId="names"> */}
          <Input label="Nombre(s)" name="names" placeholder="Ingresa los nombres" required />
          <Row>
            <Col>
              <Input label="Apellido Paterno" name="firstLastName" placeholder="Ingresa el apellido paterno" required />
            </Col>
            <Col>
              <Input label="Apellido Materno" name="secondLastName" placeholder="Ingresa el apellido materno" required />
            </Col>
          </Row>
          {/* Numero de telefono */}
          {/* <Input label="Fecha de Nacimiento" name="birthDate" type="date" required /> */}
         
          <Input
            label="Correo Electronico"
            type="email"
            name="email"
            placeholder="ejemplo@gmail.com"
            value={formData.email}
            onChange={handleEmailChange(formData, setFormData)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={handleFormChange(formData, setFormData)}
            required
          />
          {/* 
          <Input label="Teléfono" name="telephone" placeholder="Ingresa el teléfono" required />
          */}
          <CheckboxGroup
            label="Roles"
            options={roles}
            selectedOptions={formData.role}
            onChange={handleCheckboxChange(formData, setFormData, "role")}
            required
          />
          {id ? <Select label="Estado" name="status" options={status} /> : ""}
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
