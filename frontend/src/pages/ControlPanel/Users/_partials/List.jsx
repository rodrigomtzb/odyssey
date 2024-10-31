import $ from "jquery";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

import { Button, Badge, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { Title } from "../../../../components";
import imageProfileDefault from "../../../../assets/img/profile-default.png";
import UserService from "../../../../services/user.service";
import { useEffect, useState } from "react";

DataTable.use(DT);

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("enabled");

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = () => {
    const apiCall =
      filter === "enabled"
        ? UserService.getUsersEnabled()
        : filter === "disabled"
        ? UserService.getUsersDisabled()
        : UserService.getUsers();

    apiCall.then((response) => {
      setUsers(response.data);
    });
  };

  useEffect(() => {
    if (users.length > 0) {
      const table = $("#usersTable").DataTable();

      return () => {
        if ($.fn.dataTable.isDataTable("#usersTable")) {
          table.destroy();
        }
      };
    }
  }, [users]);

  //Por volver utilities
  const handleDelete = (id) => {
    alert("Borrar " + id);
  };
  const handleEdit = (id) => {
    navigate(`/users/${id}/edit`);
  };

  const handleView = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <>
      <Title title="Usuarios" withReturnButton />
      <div className="d-flex align-items-center mb-3">
        <DropdownButton
          id="userFilterDropdown"
          title={
            <>
              <i className="bi bi-funnel-fill me-2" />
              {filter === "enabled"
                ? "Habilitados"
                : filter === "disabled"
                ? "Deshabilitados"
                : "Todos"}
            </>
          }
          onSelect={(eventKey) => setFilter(eventKey)}
          variant={
            filter == "enabled"
              ? "success"
              : filter == "disabled"
              ? "danger"
              : "primary"
          }
        >
          <Dropdown.Item eventKey="enabled">Habilitados</Dropdown.Item>
          <Dropdown.Item eventKey="disabled">Deshabilitados</Dropdown.Item>
          <Dropdown.Item eventKey="all">Todos</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="table-responsive">
        <table id="usersTable" className="display table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="d-flex align-items-center justify-content-center">
                  {user.id}
                </td>
                <td>
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
                          {user.firstName} {user.middleName}{" "}
                          {user.fatherLastName} {user.motherLastName}
                        </p>
                      </Link>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>{user.rol}</td>
                <td>
                  {user.enabled ? (
                    <Badge bg="success">Activo</Badge>
                  ) : (
                    <Badge bg="danger">Inactivo</Badge>
                  )}
                </td>
                <td>
                  <div className="d-flex">
                    <Button variant="link" onClick={() => handleEdit(user.id)}>
                      <i className="bi bi-pencil-square" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
