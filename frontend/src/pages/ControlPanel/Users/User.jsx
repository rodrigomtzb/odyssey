import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Title, DefinitionList } from "../../../components";

const UserDetails = () => {
  const { id } = useParams();

  const user = {
    name: "Alfredo Alexis",
    lastNames: "Fiesco Venegas",
    email: "alfredo.alexis30@gmail.com",
    telephone: "5547168746",
    birthDate: "20-07-1998",
    role: ["manager", "mod"],
  };
  const definitions = [
    {
      title: "Nombre(s)",
      description: user.name,
    },
    {
      title: "Apellidos",
      description: user.lastNames,
    },
    {
      title: "Correo Electronico",
      description: user.email,
    },
    {
      title: "Telefono",
      description: user.telephone,
    },
    {
      title: "Fecha de nacimiento",
      description: user.birthDate
    },
    {
      title: "Roles",
      description: user.role
    }
  ];
  return (
    <Card>
      <Title title={`${user.name} ${user.lastNames}`} />
      <DefinitionList definitions={definitions} />
    </Card>
  );
};

export default UserDetails;
