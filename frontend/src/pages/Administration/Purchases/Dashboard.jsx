import { Col, Container, Row } from "react-bootstrap";
import { CardButton } from "../../../components/Buttons";
import { Title } from "../../../components";

const DashboardPurchases = () => {
  return (
    <>
      <Title title="Compras" isFirst />
      <Row>
        <Col sm={12} md={6} className="mb-2 mb-md-0">
          <CardButton
            icon="cart-plus-fill"
            text="Alta de Solicitud"
            to="create"
            section="Compras"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            icon="clipboard2-check-fill"
            text="Lista de Solicitud"
            to="list"
            section="Compras"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardPurchases;
