import { useParams } from "react-router-dom";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import {
  AddressSection,
  Input,
  Select,
  TitleSection,
} from "../../../components/Form";
import { MainCard, Title } from "../../../components";
import { useState } from "react";
import TagInput from "../../../components/Form/TagInput";

const ProviderForm = () => {
  const [tradeName, setTradeName] = useState();
  const [rfcType, setRfcType] = useState();
  const [rfc, setRfc] = useState();

  const id = useParams();
  const users = [
    { id: 1, name: "Alfredo Alexis Fiesco Venegas" },
    { id: 2, name: "Karina Lizette Vilchis Carbajal" },
  ];
  return (
    <MainCard>
      <Card>
        <Title title="Alta de Proveedor" withReturnButton />
        <Form>
          <TitleSection text="Datos Generales" isFirst />
          <Input
            label="Nombre Comercial"
            name="name"
            placeholder="Smart Innovation"
          />
          <Input
            label="Razón Social"
            name="name"
            placeholder="Razón Social"
          />
          <Row>
            <Col sm={12} md={7}>
              <Input label="RFC" name="rfc" placeholder="X1X1X1X1X1X1X1X1" />
            </Col>
            <Col sm={12} md={5} className="d-flex align-items-end">
              <div key="rfcType" className="pb-4">
                <Form.Check
                  inline
                  label="Persona Física"
                  name="rfcType"
                  type="radio"
                  id="naturalPerson"
                />
                <Form.Check
                  inline
                  label="Persona Moral"
                  name="rfcType"
                  type="radio"
                  id="legalPerson"
                />
              </div>
            </Col>
          </Row>
          <AddressSection />
          <TitleSection text="Contacto" />
          <Input label="Nombre de Contacto" placeholder="Fernando Fernandez" />
          <Row>
            <Col sm={12} md={8}>
              <Input label="Correo Electrónico" placeholder="ejemplo@gmail.com" />
            </Col>
            <Col sm={12} md={4}>
              <Input label="Teléfono" placeholder="5512345678" />
            </Col>
          </Row>
          <TitleSection text="Tags" />
          <TagInput />
          <hr />
          <Stack direction="horizontal" gap={2}>
            <Button variant="gd" className="ms-auto" type="submit">
              Registrar
            </Button>
          </Stack>
        </Form>
      </Card>
    </MainCard>
  );
};

export default ProviderForm;
