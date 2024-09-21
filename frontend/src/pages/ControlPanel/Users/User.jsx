import { Card } from "react-bootstrap";
import Title from "../../../components/Title";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();

  const user = {
    name: "Alfredo Alexis",
    lastNames: "Fiesco Venegas",
    email: "alfredo.alexis30@gmail.com",
    telephone: "5547168746",
    birthDate: "20-07-1998",
    rol: "manager",
  };
  return (
    <Card>
      <Title title={`${user.name} ${user.lastNames}`} />
      <dl>
        <dt>Fecha de Nacimiento:</dt>
        <dd>{user.birthDate}</dd>
        <dt>Correo Electronico:</dt>
        <dd>{user.email}</dd>
        <dt>Telefono:</dt>
        <dd>{user.telephone}</dd>
        <dt>Rol:</dt>
        <dd>{user.rol}</dd>
      </dl>
    </Card>
  );
};

export default UserDetails;
