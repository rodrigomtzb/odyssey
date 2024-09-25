import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import UsersList from "./_partials/List";
import Title from "../../../components/Title";
import CardButton from "../../../components/CardButton";

const Users = () => {
  return (
    <Card
      className="mt-3 border border-0 p-4"
      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
    >
      <Container className="py-5">
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
          <Col>
            <CardButton
              icon="person-video2"
              text="Sesiones"
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
