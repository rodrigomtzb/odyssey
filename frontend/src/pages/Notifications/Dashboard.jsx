import { Button, Card, Col, Row } from "react-bootstrap";
import { Title } from "../../components";
import { Link } from "react-router-dom";

const DashboardNotification = () => {
  return (
    <>
      <Title title="Notificaciones" withReturnButton />
      <Row className="mb-3">
        <Col xs={6} md={4}>
          <Button variant="gd">
            <Link to="send-mail" className="text-decoration-none text-white">
              <i className="bi bi-envelope-fill" /> Enviar Email
            </Link>
          </Button>
        </Col>
        <Col></Col>
      </Row>

      <Card className="p-3">COLA DE NOTIFICACIONES</Card>
    </>
  );
};

export default DashboardNotification;
