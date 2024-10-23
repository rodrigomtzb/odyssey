import { Col, Row } from "react-bootstrap";
import Input from "./Input";
import { handleFormChange } from "../../utils";

const NamesGroup = ({ formData, setFormData }) => {
  return (
    <>
      <Row>
        <Input
          label="Nombre(s)"
          placeholder="Alfredo Alexis"
          name="name"
          value={formData.name}
          onChange={handleFormChange(formData, setFormData)}
        />
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <Input
            label="Apellido Paterno"
            placeholder="Fiesco"
            name="firstLastName"
            value={formData.firstLastName}
            onChange={handleFormChange(formData, setFormData)}
          />
        </Col>
        <Col sm={12} md={6}>
          <Input
            label="Apellido Materno"
            placeholder="Venegas"
            name="secondLastName"
            value={formData.secondLastName}
            onChange={handleFormChange(formData, setFormData)}
          />
        </Col>
      </Row>
    </>
  );
};

export default NamesGroup;
