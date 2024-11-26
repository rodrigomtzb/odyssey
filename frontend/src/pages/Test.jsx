import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import UserService from "../services/user.service";
import FilterDropdown from "../components/Buttons/FilterDropdown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
      {/* <DataTable
        data={users}
        titleCol={["ID", "Usuario", "Correo Electronico"]}
        dataKey={["id", "username", "email"]}
        viewConfig={{ key: "username", to: "users" }}
      /> */}
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
