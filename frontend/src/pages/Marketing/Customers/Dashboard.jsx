import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardCustomers = () => {
  return (
    <>
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
    </>
  );
};

export default DashboardCustomers;
