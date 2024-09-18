import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Card } from "react-bootstrap";

const UsersList = () => {
  return (
    <Card>
      <h1></h1>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Correo</th>
            <th scope="col">Acciones</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
            
        </MDBTableBody>
      </MDBTable>
    </Card>
  );
};

export default UsersList;
