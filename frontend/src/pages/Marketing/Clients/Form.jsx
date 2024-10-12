import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { MainCard, Title } from "../../../components";
import { AddressSection, Input, TitleSection } from "../../../components/Form";

const ClientForm = () => {
  return (
    <MainCard>
      <Card>
        <Title title="Alta de Cliente" withReturnButton />
        <Form>
          <TitleSection text="Datos Generales" isFirst />
          <Row>
            <Input label="Nombre(s)" placeholder="Alfredo Alexis" />
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <Input label="Apellido Paterno" placeholder="Fiesco" />
            </Col>
            <Col sm={12} md={6}>
              <Input label="Apellido Materno" placeholder="Venegas" />
            </Col>
          </Row>
          <TitleSection text="Datos de contacto" />
          <Row>
            <Col sm={12} md={6}>
              <Input
                label="Correo Electronico"
                placeholder="alfredo.alexis30@gmail.com"
              />
            </Col>
            <Col sm={6} md={3}>
              <Input label="Telefono 1" placeholder="5547823456" />
            </Col>
            <Col sm={6} md={3}>
              <Input label="Telefono 2" placeholder="5567899098" />
            </Col>
          </Row>
          <TitleSection text="Datos Fiscales" />
          <Row>
            <Col sm={12} md={4}>
              <Input label="RFC" placeholder="1X1X1X1X1X1X1X" />
            </Col>
          </Row>
          <AddressSection />
          <Stack direction="horizontal">
            <Button variant="gd" className="ms-auto">
              Guardar
            </Button>
          </Stack>
        </Form>
      </Card>
    </MainCard>
  );
};

export default ClientForm;
