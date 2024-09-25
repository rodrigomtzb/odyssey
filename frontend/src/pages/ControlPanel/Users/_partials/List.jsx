import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
} from "mdb-react-ui-kit";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../../../components/Title";
import imageProfileDefault from "../../../../assets/img/profile-default.png";

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
    <Card
      className="mt-3 border border-0 p-4"
      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
    >
      <Card>
        <Title title="Usuarios" />
        <MDBTable align="middle" striped responsive hover>
          <MDBTableHead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Rol</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody className="table-group-divider">
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
                    <MDBBadge color="success" pill>
                      Activo
                    </MDBBadge>
                  ) : (
                    <MDBBadge color="danger" pill>
                      Inactivo
                    </MDBBadge>
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
          </MDBTableBody>
        </MDBTable>
      </Card>
    </Card>
  );
};

export default UsersList;
