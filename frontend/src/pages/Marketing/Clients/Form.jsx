import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Title } from "../../../components";
import { AddressSection, Input, TitleSection } from "../../../components/Form";
import { useState } from "react";
import { handleFormChange } from "../../../utils";
import NamesGroup from "../../../components/Form/Names";

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    firstLastName: "",
    secondLastName: "",
    rfc: "",
    rfcType: "1",
  });
  return (
    <>
      <Title title="Alta de Cliente" withReturnButton />
      <Form>
        <TitleSection text="Datos Generales" isFirst />
        <NamesGroup formData={formData} setFormData={setFormData} />
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
        <AddressSection />
        <TitleSection text="Datos Fiscales" />
        <div className={formData.rfcType == 1 ? "d-none" : ""}>
          <Input
            label="Nombre Comercial"
            name="name"
            placeholder="Smart Innovation"
          />
          <Input label="Razón Social" name="name" placeholder="Razón Social" />
        </div>
        <div className={formData.rfcType == 1 ? "" : "d-none"}>
          <NamesGroup formData={formData} setFormData={setFormData} />
        </div>
        <Row>
          <Col sm={12} md={7}>
            <Input
              label="RFC"
              name="rfc"
              placeholder="X1X1X1X1X1X1X1X1"
              max={formData.rfcType == 1 ? "13" : "12"}
            />
          </Col>
          <Col sm={12} md={5} className="d-flex align-items-end">
            <div key="rfcType" className="pb-4">
              <Form.Check
                inline
                label="Persona Física"
                name="rfcType"
                type="radio"
                id="naturalPerson"
                value="1"
                onChange={handleFormChange(formData, setFormData)}
              />
              <Form.Check
                inline
                label="Persona Moral"
                name="rfcType"
                type="radio"
                id="legalPerson"
                value="2"
                onChange={handleFormChange(formData, setFormData)}
              />
            </div>
          </Col>
        </Row>
        <Stack direction="horizontal">
          <Button variant="gd" className="ms-auto">
            Guardar
          </Button>
        </Stack>
      </Form>
    </>
  );
};

export default ClientForm;
