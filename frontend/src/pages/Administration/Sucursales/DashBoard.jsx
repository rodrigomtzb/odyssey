import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardSucursales = () => {
  return (
    <>
      <Title title="Sucursales" />
      <Row>
        <Col sm={12} md={6} className="mb-2 mb-md-0">
          <CardButton
            to="create"
            section="Sucursales"
            text="Alta de Sucursal"
            icon="shop"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            to="list"
            section="Sucursales"
            text="Lista de Sucursales"
            icon="list-ol"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardSucursales;