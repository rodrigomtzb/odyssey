import { Card, Col, Container, Row } from "react-bootstrap";
import CardButton from "../../../components/CardButton";
import Title from "../../../components/Title";

const DashboardPurchases = () => {
  return (
    <Card
      className="mt-3 border border-0 p-4"
      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
    >
      <Container className="pb-5">
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
      </Container>
    </Card>
  );
};

export default DashboardPurchases;
