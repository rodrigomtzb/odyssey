import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import UsersList from "./_partials/List";
import Title from "../../../components/Title";

const Users = () => {
  const users = [
    {
      id: 1,
      names: "Alfredo Alexis",
      lastNames: "Fiesco Venegas",
      email: "alfredo.alexis30@gmail.com",
    },
    {
      id: 2,
      names: "Karina Lizette",
      lastNames: "Vilchis Carbajal",
      email: "karina.vilchis.carbajal@gmail.com",
    },
  ];
  return (
    <Card>
      <Container>
        <Title title="Usuarios" />
        <Row>
          <Col>
            <Button variant="gd" href="users/create">
              Registro de Usuario
            </Button>
          </Col>
          {/* <Col>
            <Button variant="gd" href="users/create/masive">
              Registro Masivo de Usuarios
            </Button>
          </Col> */}
          <Col>
            <Button variant="gd" href="users/list">
              Lista de Usuarios
            </Button>
          </Col>
        </Row>
        <UsersList users={users} />
      </Container>
    </Card>
  );
};

export default Users;
