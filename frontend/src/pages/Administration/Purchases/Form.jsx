import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { AddressSection, Input, Select, TitleSection } from "../../../components/Form";
import { useParams } from "react-router-dom";
import { Title } from "../../../components";

const PurchaseForm = () => {
  const id = useParams();
  const users = [
    { id: 1, name: "Alfredo Alexis Fiesco Venegas" },
    { id: 2, name: "Karina Lizette Vilchis Carbajal" },
  ];
  return (
    <Card
      className="mt-3 border border-0 p-4"
      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
    >
      <Card>
        <Title title="Solicitud de compra" withReturnButton />
        <Form>
          <TitleSection text="Datos de Obra" isFirst />
          <Select
            label="Obra"
            defaultOption="Selecciona una Obra"
            name="works"
          />
          <AddressSection withoutTitle />
          <Select label="Responsable" options={users} required />

          <TitleSection text="Materiales" />
          <Row>
            <Col sm={12} md={6}>
              <Input label="Material" name="material" placeholder="Ingresa el nombre del material" />
            </Col>
            <Col sm={6} md={2}>
              <Input label="Precio" name="price" placeholder="350" />
            </Col>
            <Col sm={6} md={2}>
              <Input label="Unidad" name="unity" />
            </Col>
            <Col sm={12} md={2}>
              <Input label="Total" name="subtotal" />
            </Col>
          </Row>
          <Stack direction="horizontal" gap={2}>
            <Button variant="gd" className="ms-auto" type="submit">
              {id ? "Actualizar" : "Registrar"}
            </Button>
          </Stack>
        </Form>
        <TitleSection text="Estatus de la solicitud" />
      </Card>
    </Card>
  );
};

export default PurchaseForm;
