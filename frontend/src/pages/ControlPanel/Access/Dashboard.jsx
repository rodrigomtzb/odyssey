import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardAccesses = () => {
  return (
    <>
      <Title title="Accesos" />
      <Row>
        <Col sm={12} md={6} className="mb-2 mb-md-0">
          <CardButton to="create" section="Accesos" text="Añadir Acceso a Puesto" />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton to="list" section="Accesos" text="Lista de Accesos"/>
        </Col>
      </Row>
    </>
  );
};
export default DashboardAccesses;
