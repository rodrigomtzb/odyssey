import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardCustomers = () => {
  return (
    <>
      <Title title="Clientes" />
      <Row>
        <Col sm={12} md={6} className="mb-2 mb-md-0">
          <CardButton
            to="create"
            section="Clientes"
            text="Alta de Cliente"
            icon="person-fill-add"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
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
