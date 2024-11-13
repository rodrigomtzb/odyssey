import $ from "jquery";
import { Button } from "react-bootstrap";
import { Title } from "../../../components";
import { useEffect, useState } from "react";
import SessionsService from "../../../services/session.service";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";

DataTable.use(DT);

const SessionsList = () => {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    SessionsService.getSessions().then((response) => {
      console.log(response.data);
      setSessions(response.data);
    });
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      const table = $("#sessionsTable").DataTable();

      return () => {
        table.destroy();
      };
    }
  }, [sessions]);

  const handleDelete = (id) => {
    SessionsService.destroySession(id).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    });
  };
  return (
    <>
      <Title title="Lista de Sesiones" withReturnButton/>
      <div className="table-responsive">
        <table id="sessionsTable" className="table display">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Expiración</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.sessionId}>
                <td>{session.sessionId}</td>
                <td>{session.email}</td>
                <td>{session.expiryDate}</td>
                <td>
                  <div className="d-flex">
                    <Button
                      variant="link"
                      onClick={() => handleDelete(session.userId)}
                    >
                      <i className="bi bi-trash-fill" />
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

export default SessionsList;
