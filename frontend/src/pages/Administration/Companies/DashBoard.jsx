import { Col, Row } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const DashboardCompanies = () => {
  return (
    <>
      <Title title="Compañias" />
      <Row>
        <Col sm={12} md={6} className="mb-2 mb-md-0">
          <CardButton
            to="create"
            section="Compañias"
            text="Alta de Compañia"
            icon="buildings-fill-add"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            to="list"
            section="Compañias"
            text="Lista de Compañias"
            icon="buildings-lines-fill"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardCompanies;
