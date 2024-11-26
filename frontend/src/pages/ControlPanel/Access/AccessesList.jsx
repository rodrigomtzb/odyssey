import { useEffect, useState } from "react";
import { Title } from "../../../components";
import JobPositionService from "../../../services/job-position.service";
import { flattenedItems } from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../../components/DataTable";
import TableBase from "../../../components/TableBase";
import { TableCell, TableRow } from "@mui/material";

const AccessesList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const handleView = (id) => {
    navigate(`/accesses/jobs/${id}`);
  };

  useEffect(() => {
    JobPositionService.getAllJobPositions().then((response) => {
      setJobs(response.data);
    });
  }, []);

  return (
    <>
      <Title title="Lista de Accesos" withReturnButton />
      <TableBase
        titles={["ID", "Puesto", "Secuencia", "Menu Items Asignados"]}
        dataKey={["id", "name", "sequence", "menuItems"]}
      >
        {jobs.map((job, index) => (
          <TableRow
            key={index}
            sx={{
              backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
              "&:hover": { backgroundColor: "#e0f7fa" },
              borderBottom: "2px solid #ddd",
            }}
          >
            <TableCell>{job.id}</TableCell>
            <TableCell>
              <Link
                onClick={() => handleView(job.id)}
                className="text-decoration-none text-body"
              >
                <p className="fw-bold mb-1">{job.name}</p>
              </Link>
            </TableCell>
            <TableCell>{job.sequence}</TableCell>
            <TableCell>{flattenedItems(job.menuItems).length}</TableCell>
          </TableRow>
        ))}
      </TableBase>
    </>
  );
};

export default AccessesList;
