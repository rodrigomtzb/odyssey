import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardWorks = () => {
  return (
    <>
      <Title title="Proyectos" isFirst />
      <Row>
        <Col>
          <CardButton
            icon="house-add-fill"
            text="Alta de Proyeto"
            section="Proyectos"
            to="create"
          />
        </Col>
        <Col>
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

export default DashboardWorks;
