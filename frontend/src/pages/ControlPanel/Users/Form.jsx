import { Form, Button, Stack, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
import { Title } from "../../../components";
import UserService from "../../../services/user.service";
import { error } from "jquery";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const roles = ["admin", "mod", "user"];
  const status = [
    { id: true, name: "ACTIVO" },
    { id: false, name: "INACTIVO" },
  ];
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    fatherLastName: "",
    motherLastName: "",
    email: "",
    username: "",
    password: "",
    roles: [],
  });
  useEffect(() => {
    if (id) {
      UserService.getUser(id).then((response) => {
        setFormData({
          ...response.data,
          password: "",
        });
      });
    }
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.stopPropagation();
    // }
    // setValidated(true);
    try {
      if (id) {
        UserService.editUserData(id, {
          id: id,
          firstName: formData.firstName,
          middleName: formData.middleName,
          fatherLastName: formData.fatherLastName,
          motherLastName: formData.motherLastName,
        }).catch((error) =>
          console.error("Error al editar datos generales: ", error)
        );
        UserService.editUserEmail(id, {
          id: id,
          email: formData.email,
        }).catch((error) => {
          console.error("Error al editar email: ", error);
        });
        UserService.editUserPassword(id, {
          id: id,
          password: formData.password,
        }).catch((error) => {
          console.error("Error al editar contraseña: ", error);
        });
        UserService.editUserEnabled(id, {
          id: id,
          enabled: formData.enabled,
        }).catch((error) => {
          console.error("Error al cambiar disponibilidad: ", error);
        });
      } else {
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
      }
    } catch (error) {
      console.error("Hubo un error al enviar el formulario:", error);
      alert("Error al crear el usuario");
    }
  };
  return (
    <>
      <Title
        title={id ? "Informacion de Usuario" : "Información de Registro"}
        withReturnButton
      />
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <TitleSection text="Datos Generales" isFirst />
        {/* <Form.Group className="mb-3" controlId="names"> */}
        <Row>
          <Col>
            <Input
              label="Primer nombre"
              name="firstName"
              placeholder="Ingresa los nombres"
              value={formData.firstName}
              onChange={handleFormChange(formData, setFormData)}
              required
            />
          </Col>
          <Col>
            <Input
              label="Segundo nombre"
              name="middleName"
              placeholder="Ingresa los nombres"
              value={formData.middleName}
              onChange={handleFormChange(formData, setFormData)}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label="Apellido Paterno"
              name="fatherLastName"
              placeholder="Ingresa el apellido paterno"
              value={formData.fatherLastName}
              onChange={handleFormChange(formData, setFormData)}
              required
            />
          </Col>
          <Col>
            <Input
              label="Apellido Materno"
              name="motherLastName"
              placeholder="Ingresa el apellido materno"
              value={formData.motherLastName}
              onChange={handleFormChange(formData, setFormData)}
              required
            />
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
          placeholder={
            id
              ? "Para mantener la contraseña, deje en blanco"
              : "Ingresa tu contraseña"
          }
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
          selectedOptions={formData.roles}
          onChange={handleCheckboxChange(formData, setFormData, "roles")}
          required
        />
        {id ? (
          <Select
            label="Estado"
            name="enabled"
            value={formData.enabled}
            options={status}
            onChange={handleFormChange(formData, setFormData)}
          />
        ) : (
          ""
        )}
        <Stack direction="horizontal" gap={2}>
          <Button variant="gd" className="ms-auto" type="submit">
            {id ? "Actualizar" : "Registrar"}
          </Button>
        </Stack>
      </Form>
    </>
  );
};

export default UserForm;
