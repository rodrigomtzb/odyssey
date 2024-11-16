import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardJobs = () => {
  return (
    <>
      <Title title="Puestos" />
      <Row>
        <Col sm={12} md={6} className="mb-2 mb-md-0">
          <CardButton
            to="create"
            section="Puestos"
            text="Alta de Puesto"
            icon="briefcase-fill"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            to="list"
            section="Puestos"
            text="Lista de Puestos"
            icon="list-stars"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardJobs;
