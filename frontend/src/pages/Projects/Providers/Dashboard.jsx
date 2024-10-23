import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardProviders = () => {
  return (
    <>
      <Title title="Proveedores" isFirst />
      <Row>
        <Col>
          <CardButton
            icon="bag-plus-fill"
            text="Alta de proveedor"
            section="Proveedores"
            to="create"
          />
        </Col>
        <Col>
          <CardButton
            icon="list-ul"
            text="Lista de proveedores"
            secion="Proveedores"
            to="list"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardProviders;
