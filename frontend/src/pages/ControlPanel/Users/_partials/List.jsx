import { Link, useNavigate } from "react-router-dom";
import { Title } from "../../../../components";
import imageProfileDefault from "../../../../assets/img/profile-default.png";
import UserService from "../../../../services/user.service";
import { useEffect, useState } from "react";
import TableBase from "../../../../components/TableBase";
import FilterDropdown from "../../../../components/Buttons/FilterDropdown";
import { TableCell, TableRow } from "@mui/material";
import { Badge } from "react-bootstrap";

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("enabled");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleView = (id) => {
    navigate(`/users/${id}`);
  };

  useEffect(() => {
    const apiCall =
      filter === "enabled"
        ? UserService.getUsersEnabled()
        : filter === "disabled"
        ? UserService.getUsersDisabled()
        : UserService.getUsers();

    apiCall.then((response) => {
      setUsers(response.data);
    });
  }, [filter]);

  return (
    <>
      <Title title="Usuarios" withReturnButton />
      <FilterDropdown onFilterChange={handleFilterChange} />

      <TableBase
        dataKey={["id", "firstName", "email", "enabled"]}
        titles={["ID", "Nombre", "Correo Electronico", "Status"]}
        data={users}
      >
        {users.map((user, index) => (
          <TableRow
            key={index}
            sx={{
              backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
              "&:hover": { backgroundColor: "#e0f7fa" },
              borderBottom: "2px solid #ddd",
            }}
          >
            <TableCell>{user.id}</TableCell>
            <TableCell>
              <div className="d-flex align-items-center">
                <img
                  src={imageProfileDefault}
                  alt=""
                  style={{
                    width: "45px",
                    height: "45px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <Link
                    onClick={() => handleView(user.id)}
                    className="text-decoration-none text-body"
                  >
                    <p className="fw-bold mb-1">
                      {user.firstName} {user.middleName} {user.fatherLastName}{" "}
                      {user.motherLastName}
                    </p>
                  </Link>
                  <p className="text-muted mb-0">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{user.jobPosition.name}</TableCell>
            <TableCell>
              {user.enabled ? (
                <Badge bg="success">Activo</Badge>
              ) : (
                <Badge bg="danger">Inactivo</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBase>
    </>
  );
};

export default UsersList;
