import { Col, Row } from "react-bootstrap";
import Input from "./Input";
import TitleSection from "./TitleSection";
import Select from "./Select";

const AddressSection = ({ withoutTitle }) => {
  return (
    <>
      {!withoutTitle ?? <TitleSection text="Domicilio" />}
      <Row>
        <Col sm={12} md={6}>
          <Input label="Calle" placeholder="Jabillos" />
        </Col>
        <Col sm={6} md={3}>
          <Input label="N° Ext" placeholder="182" />
        </Col>
        <Col sm={6} md={3}>
          <Input label="N° Int" placeholder="Depto 201" />
        </Col>
        <Col sm={12} md={6}>
          <Input label="Código Postal" placeholder="57820" />
        </Col>
        <Col sm={12} md={6}>
          <Select label="Colonia" defaultOption="Selecciona un codigo postal" />
        </Col>
        <Col sm={12} md={6}>
          <Select
            label="Estado"
            defaultOption="Selecciona un codigo postal"
            disabled
          />
        </Col>
        <Col sm={12} md={6}>
          <Select
            label="Municipio"
            defaultOption="Selecciona un codigo postal"
            disabled
          />
        </Col>
      </Row>
    </>
  );
};

export default AddressSection;
