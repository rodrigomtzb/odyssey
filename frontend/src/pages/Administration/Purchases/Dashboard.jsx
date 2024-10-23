import { Col, Container, Row } from "react-bootstrap";
import { CardButton } from "../../../components/Buttons";
import { Title } from "../../../components";

const DashboardPurchases = () => {
  return (
    <>
      <Title title="Compras" isFirst />
      <Row>
        <Col>
          <CardButton
            icon="cart-plus-fill"
            text="Alta de Solicitud"
            to="create"
            section="Compras"
          />
        </Col>
        <Col>
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
