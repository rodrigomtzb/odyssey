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
            icon="buildings-fill-add"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            to="list"
            section="Productos"
            text="Lista de Productos"
            icon="buildings-lines-fill"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardProducts;