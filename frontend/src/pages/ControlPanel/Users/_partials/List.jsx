import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UsersList = ({ users }) => {
  const navigate = useNavigate();
  // const users = [
  //   {
  //     id: 1,
  //     names: "Alfredo Alexis",
  //     lastNames: "Fiesco Venegas",
  //     email: "alfredo.alexis30@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     names: "Karina Lizette",
  //     lastNames: "Vilchis Carbajal",
  //     email: "karina.vilchis.carbajal@gmail.com",
  //   },
  // ];

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
    <Card className="mt-3">
      <MDBTable align="middle" striped responsive hover>
        <MDBTableHead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Correo</th>
            <th scope="col">Acciones</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody className="table-group-divider">
          {users.map((user) => (
            <tr key={user.id}>
              <td scope="col">{user.id}</td>
              <td>{user.names}</td>
              <td>{user.lastNames}</td>
              <td>{user.email}</td>
              <td>
                <div className="d-flex">
                  <Button variant="link" onClick={() => handleView(user.id)}>
                    <i className="bi bi-eye-fill" />
                  </Button>
                  <Button variant="link" onClick={() => handleEdit(user.id)}>
                    <i className="bi bi-pencil-square" />
                  </Button>
                  <Button variant="link" onClick={() => handleDelete(user.id)}>
                    <i className="bi bi-trash-fill" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </Card>
  );
};

export default UsersList;
