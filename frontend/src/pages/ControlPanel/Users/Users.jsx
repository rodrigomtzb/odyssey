import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Title from "../../../components/Title";
import CardButton from "../../../components/CardButton";
import ReturnButton from "../../../components/ReturnButton";

const Users = () => {
  return (
    <Card
      className="mt-3 border border-0 p-4"
      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
    >
      <Container className="pb-5">
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
      </Container>
    </Card>
  );
};

export default Users;
