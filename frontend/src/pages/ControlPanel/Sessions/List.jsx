import $ from "jquery";
import { Button } from "react-bootstrap";
import { Title } from "../../../components";
import { useEffect, useState } from "react";
import SessionsService from "../../../services/session.service";
import DataTable from "../../../components/DataTable";
import TableBase from "../../../components/TableBase";
import { TableCell, TableRow } from "@mui/material";

const SessionsList = () => {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    SessionsService.getSessions().then((response) => {
      setSessions(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    SessionsService.destroySession(id).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    });
  };
  return (
    <>
      <Title title="Lista de Sesiones" withReturnButton />
      <TableBase
        dataKey={["sessionId", "email", "expiryDate"]}
        titles={["ID", "Correo Electrónico", "Fecha de expiración", "Acciones"]}
      >
        {sessions.map((session, index) => (
          <TableRow
            key={session.sessionId}
            sx={{
              backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
              "&:hover": { backgroundColor: "#e0f7fa" },
              borderBottom: "2px solid #ddd",
            }}
          >
            <TableCell>{session.sessionId}</TableCell>
            <TableCell>{session.email}</TableCell>
            <TableCell>{session.expiryDate}</TableCell>
            <TableCell>
              <div className="d-flex">
                <Button
                  variant="link"
                  onClick={() => handleDelete(session.userId)}
                >
                  <i className="bi bi-trash-fill" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBase>
    </>
  );
};

export default SessionsList;
