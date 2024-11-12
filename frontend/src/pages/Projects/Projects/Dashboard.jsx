import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardProjects = () => {
  return (
    <>
      <Title title="Proyectos" isFirst />
      <Row>
        <Col sm={12} md={6} className="mb-2 mb-md-0">
          <CardButton
            icon="house-add-fill"
            text="Alta de Proyecto"
            section="Proyectos"
            to="create"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            icon="list-ul"
            text="Lista de Proyectos"
            section="Proyectos"
            to="list"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardProjects;
