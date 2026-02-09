import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardProducts = () => {
  return (
    <>
      <Title title="Productos" />
      <Row>
        <Col sm={12} md={6} className="mb-2 mb-md-0">
          <CardButton
            to="create"
            section="Productos"
            text="Alta de Productos"
            icon="basket2"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            to="list"
            section="Productos"
            text="Lista de Productos"
            icon="list-ol"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardProducts;