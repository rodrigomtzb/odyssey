import { Card, Col, Container, Row } from "react-bootstrap";
import { Title, MainCard } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardWorks = () => {
  return (
    <MainCard>
      <Container className="pb-5">
        <Title title="Obras" isFirst />
        <Row>
          <Col>
            <CardButton
              icon="house-add-fill"
              text="Alta de Obra"
              section="Obras"
              to="create"
            />
          </Col>
          <Col>
            <CardButton
              icon="list-ul"
              text="Lista de Obras"
              secion="Proveedores"
              to="list"
            />
          </Col>
        </Row>
      </Container>
    </MainCard>
  );
};

export default DashboardWorks;
