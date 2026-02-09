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
            icon="bi bi-buildings-fill"
          />
        </Col>
        <Col sm={12} md={6} className="mt-2 mt-md-0">
          <CardButton
            to="list"
            section="Compañias"
            text="Lista de Compañias"
            icon="list-ol"
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardCompanies;
