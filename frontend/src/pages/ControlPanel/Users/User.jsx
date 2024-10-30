import { useParams } from "react-router-dom";
import { Title, DefinitionList, MainCard } from "../../../components";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    UserService.getUser(id).then((response) => setUser(response.data));
  }, []);

  console.log(user);

  const definitions = [
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
      />
      <DefinitionList definitions={definitions} />
    </>
  );
};

export default UserDetails;
