import React from "react";
import { Row, Col } from "react-bootstrap";
import { Title } from "../../../components";
import { CardButton } from "../../../components/Buttons";

const Users = () => {
  return (
    <>
      <Title title="Usuarios" isFirst />
      <Row>
        <Col>
          <CardButton
            icon="person-fill-add"
            text="Alta de usuario"
            to="create"
            section="Panel de Control"
          />
        </Col>
        <Col>
          <CardButton
            icon="person-lines-fill"
            text="Lista de Usuarios"
            to="list"
            section="Panel de Control"
          />
        </Col>
      </Row>
    </>
  );
};

export default Users;
