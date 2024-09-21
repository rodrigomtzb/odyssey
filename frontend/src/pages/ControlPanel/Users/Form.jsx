import { Card, Form, Button, Stack, Col, Row } from "react-bootstrap";
import CancelButton from "../../../components/CancelButton";
import { useParams } from "react-router-dom";

const roles = ["admin", "manager", "user"];

const UserForm = () => {
  const { id } = useParams();

  return (
    <Card style={{ border: "none", backgroundColor: "#AAB3BF" }}>
      <Card>
        <div
          className="bg-gd d-flex align-items-center p-2 mb-4 rounded"
          style={{ width: "fit-content" }}
        >
          <h5 className="m-0">
            {id ? "Informacion de Usuario" : "Información de Registro"}
          </h5>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="names">
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
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control
              className="form-input"
              type="email"
              placeholder="ejemplo@gmail.com"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              className="form-input"
              type="password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="telephone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Ingresa el teléfono"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rol">
            <Form.Label>Rol</Form.Label>
            <Form.Select className="form-input">
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
          <Stack direction="horizontal" gap={2}>
            <Button variant="gd" className="ms-auto">
              {id ? "Actualizar" : "Registrar"}
            </Button>
          </Stack>
        </Form>
      </Card>
    </Card>
  );
};

export default UserForm;
