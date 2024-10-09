import { Card, Col, Container, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardProviders = () => {
  return (
    <Card
      className="mt-3 border border-0 p-4"
      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
    >
      <Container className="pb-5">
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
      </Container>
    </Card>
  );
};

export default DashboardProviders;
