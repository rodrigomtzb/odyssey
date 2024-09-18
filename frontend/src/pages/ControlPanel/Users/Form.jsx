import { Card, Form, FloatingLabel, Button } from "react-bootstrap";

const UserForm = () => {
  return (
    <Card className="bg-opacity-50">
      <h2>Registro de Usuario</h2>
      <hr className="border border-danger" />
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Nombre(s)"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Ingresa los nombres del usuario"
            className="border border-primary"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Apellidos"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Ingresa los nombres del usuario"
            className="border border-bottom-primary"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Correo Electronico"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Ingresa los nombres del usuario"
            className="border border-bottom-primary"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Contraseña"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Ingresa los nombres del usuario"
            className="border border-bottom-primary"
            required
          />
        </FloatingLabel>
        <Button variant="gd">Registrar</Button>
      </Form>
    </Card>
  );
};

export default UserForm;
