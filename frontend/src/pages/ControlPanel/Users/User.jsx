import { Link, useParams } from "react-router-dom";
import { Title, DefinitionList, ContentCard } from "../../../components";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import { Button, Col, Row } from "react-bootstrap";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    UserService.getUser(id).then((response) => setUser(response.data));
  }, []);
  useEffect(() => {
    if (user) {
      setUserData([
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
        { title: "Puesto", description: user.jobPosition.name },
        {
          title: "Correo Electrónico",
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
      ]);
    }
  }, [user]);

  return (
    <>
      <Title title="Datos de Usuario" withReturnButton />
      <ContentCard>
        <DefinitionList definitions={userData} />
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
