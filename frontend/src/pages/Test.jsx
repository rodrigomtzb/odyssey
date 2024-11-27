import { useEffect, useState } from "react";
import UserService from "../services/user.service";
import FilterDropdown from "../components/Buttons/FilterDropdown";
import TableBase from "../components/TableBase";

const Test = () => {
  const [users, setUsers] = useState([]);

  const handleFilterChange = (filter) => {
    switch (filter) {
      case "enabled":
        UserService.getUsersEnabled().then((response) => {
          console.log(response.data);
          setUsers(response.data);
        });
        break;
      case "disabled":
        UserService.getUsersDisabled().then((response) => {
          console.log(response.data);
          setUsers(response.data);
        });
        break;
      case "all":
        UserService.getUsers().then((response) => {
          console.log(response.data);
          setUsers(response.data);
        });
        break;
    }
  };

  return (
    <>
      <FilterDropdown onFilterChange={handleFilterChange} />
      <TableBase
        data={users}
        dataKey={["id", "username", "email"]}
        titles={["ID", "Usuario", "Email"]}
        viewConfig={{ to: "users", key: "username" }}
      />
    </>
  );
};

export default Test;
