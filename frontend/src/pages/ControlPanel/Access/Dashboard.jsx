import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardAccesses = () => {
  return (
    <>
      <Title title="Accesos" />
      <Row>
        <Col sm={12} md={6} className="my-2">
          <CardButton
            to="jobs/sync"
            section="Accesos"
            icon="list-task"
            text="Añadir Acceso a Puesto"
          />
        </Col>
        <Col sm={12} md={6} className="my-2">
          <CardButton
            to="list"
            section="Accessos"
            icon="door-open-fill"
            text="Lista de Accesos"
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6} className="my-2">
          <CardButton
            to="menu-items/list"
            section="Menú Items"
            icon="list-ol"
            text="Lista de Items"
          />
        </Col>
      </Row>
    </>
  );
};
export default DashboardAccesses;
