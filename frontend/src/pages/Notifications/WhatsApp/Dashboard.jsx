import { Col, Row } from "react-bootstrap";
import { CardButton } from "../../../components/Buttons";
import { Title } from "../../../components";

const DashboardWhatsapp = () => {
  return (
    <>
      <Title title="WhatsApp" isFirst />
      <Row>
      <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            icon="kanban"
            text="Seguimiento de Clientes"
            to="kanban-clientes"
            section="Whatsapp"
          />
        </Col>
        <Col sm={12} md={6} className="mb-2 mb-md-0">
          <CardButton
            icon="whatsapp"
            text="Conversaciones"
            to="conversation"
            section="Whatsapp"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            icon="bi bi-incognito"
            text="Agente IA"
            to="agent-monitor"
            section="Whatsapp"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardWhatsapp;
