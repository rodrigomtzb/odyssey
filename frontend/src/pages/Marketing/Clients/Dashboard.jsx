import { Card, Col, Container, Row } from "react-bootstrap";
import { MainCard, Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardClients = () => {
  return (
    <MainCard>
      <Card>
        <Title title="Clientes" />
        <Row>
          <Col>
            <CardButton
              to="create"
              section="Clientes"
              text="Alta de Cliente"
              icon="person-fill-add"
            />
          </Col>
          <Col>
            <CardButton
              to="list"
              section="Clientes"
              text="Lista de Clientes"
              icon="person-lines-fill"
            />
          </Col>
        </Row>
      </Card>
    </MainCard>
  );
};

export default DashboardClients;
