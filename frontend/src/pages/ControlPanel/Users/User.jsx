import { Link, useParams } from "react-router-dom";
import {
  Title,
  DefinitionList,
  MainCard,
  ContentCard,
} from "../../../components";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import { Button, Col, Row } from "react-bootstrap";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    UserService.getUser(id).then((response) => setUser(response.data));
  }, []);

  console.log(user);

  const definitions = [
    {
      title: "ID",
      description: user.id,
    },
    {
      title: "Nombre(s)",
      description: `${user.firstName} ${user.middleName}`,
    },
    {
      title: "Apellidos",
      description: `${user.fatherLastName} ${user.motherLastName}`,
    },
    {
      title: "Correo Electronico",
      description: user.email,
    },
    {
      title: "Contraseña",
      description: "***********",
    },
    // {
    //   title: "Telefono",
    //   description: user.telephone,
    // },
    // {
    //   title: "Fecha de nacimiento",
    //   description: user.birthDate,
    // },
    {
      title: "Roles",
      description: user.role,
    },
  ];
  return (
    <>
      <Title
        title={`${user.firstName} ${user.middleName} ${user.fatherLastName} ${user.motherLastName}`}
        withReturnButton
      />
      <ContentCard>
        <DefinitionList definitions={definitions} />
      </ContentCard>
      <Row>
        <Col>
          <Link to="edit">
            <Button variant="gd">Editar Información</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default UserDetails;
