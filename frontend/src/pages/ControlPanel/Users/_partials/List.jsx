import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

import { Card, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { MainCard, Title } from "../../../../components";
import imageProfileDefault from "../../../../assets/img/profile-default.png";

DataTable.use(DT);

const UsersList = () => {
  const navigate = useNavigate();
  const users = [
    {
      id: 1,
      names: "Alfredo Alexis",
      lastNames: "Fiesco Venegas",
      email: "alfredo.alexis30@gmail.com",
      rol: "manager",
      status: true,
    },
    {
      id: 2,
      names: "Karina Lizette",
      lastNames: "Vilchis Carbajal",
      email: "karina.vilchis.carbajal@gmail.com",
      rol: "user",
      status: false,
    },
  ];

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
    <MainCard>
      <Card>
        <Title title="Usuarios" withReturnButton />
        <div className="table-responsive">
          <DataTable>
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
                  <td scope="col">{user.id}</td>
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
                          onClick={handleView}
                          className="text-decoration-none text-body"
                        >
                          <p className="fw-bold mb-1">
                            {user.names} {user.lastNames}
                          </p>
                        </Link>
                        <p className="text-muted mb-0">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{user.rol}</td>
                  <td>
                    {user.status ? (
                      <Badge bg="success">Activo</Badge>
                    ) : (
                      <Badge bg="danger">Inactivo</Badge>
                    )}
                  </td>
                  <td>
                    <div className="d-flex">
                      <Button
                        variant="link"
                        onClick={() => handleEdit(user.id)}
                      >
                        <i className="bi bi-pencil-square" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </div>
      </Card>
    </MainCard>
  );
};

export default UsersList;
