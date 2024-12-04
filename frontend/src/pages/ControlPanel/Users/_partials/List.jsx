import { Link, useNavigate } from "react-router-dom";
import { Title } from "../../../../components";
import imageProfileDefault from "../../../../assets/img/profile-default.png";
import UserService from "../../../../services/user.service";
import { useEffect, useState } from "react";
import TableBase from "../../../../components/TableBase";
import FilterDropdown from "../../../../components/Buttons/FilterDropdown";
import { TableCell, TableRow } from "@mui/material";
import { Badge } from "react-bootstrap";
import SearchInput from "../../../../components/SearchInput";

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]); // Nuevo estado para los datos originales
  const [filter, setFilter] = useState("enabled");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleSearch = (results, searchTerm) => {
    if (searchTerm === "") {
      // Si el término de búsqueda está vacío, restaura los datos originales
      setUsers(originalUsers);
    } else {
      setUsers(results);
    }
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
      setOriginalUsers(response.data); // Guarda los datos originales
    });
  }, [filter]);

  return (
    <>
      <Title title="Usuarios" withReturnButton />
      <FilterDropdown onFilterChange={handleFilterChange} />
      <SearchInput
        data={originalUsers} // Usamos los datos originales para la búsqueda
        onSearch={(results, searchTerm) => handleSearch(results, searchTerm)}
        searchFields={[
          "firstName",
          "middleName",
          "fatherLastName",
          "motherLastName",
        ]}
      />

      <TableBase
        dataKey={["id", "firstName", "", "enabled"]}
        titles={["ID", "Nombre", "Puesto", "Status"]}
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
