import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardProviders = () => {
  return (
    <>
      <Title title="Proveedores" isFirst />
      <Row>
        <Col sm={12} md={6} className="mb-2 mb-md-0">
          <CardButton
            icon="bag-plus-fill"
            text="Alta de proveedor"
            section="Proveedores"
            to="create"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            icon="list-ul"
            text="Lista de proveedores"
            section="Proveedores"
            to="list"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardProviders;
