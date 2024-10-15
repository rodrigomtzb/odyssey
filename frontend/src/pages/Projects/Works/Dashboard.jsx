import { Card, Col, Container, Row } from "react-bootstrap";
import { Title, MainCard } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardWorks = () => {
  return (
    <MainCard>
      <Container className="pb-5">
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
      </Container>
    </MainCard>
  );
};

export default DashboardWorks;
