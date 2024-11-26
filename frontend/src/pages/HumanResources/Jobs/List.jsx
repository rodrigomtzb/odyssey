import { Title } from "../../../components";
import { useEffect, useState } from "react";
import JobPositionService from "../../../services/job-position.service";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../../components/DataTable";
import { TableCell, TableRow } from "@mui/material";
import TableBase from "../../../components/TableBase";
import FilterDropdown from "../../../components/Buttons/FilterDropdown";
import { Badge } from "react-bootstrap";

const JobsList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("enabled");

  const handleView = (id) => {
    navigate(`/jobs/${id}`);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const apiCall =
      filter === "enabled"
        ? JobPositionService.getEnabledJobPositions()
        : filter === "disabled"
        ? JobPositionService.getDisabledJobPositions()
        : JobPositionService.getAllJobPositions();

    apiCall.then((response) => {
      setJobs(response.data);
    });
  }, [filter]);

  return (
    <>
      <Title title="Lista de Puestos" withReturnButton />
      <FilterDropdown onFilterChange={handleFilterChange} />
      <TableBase
        titles={["ID", "Puesto", "Jefe Inmediato", "N° de Secuencia", "Estado"]}
        sorting={false}
      >
        {jobs.map((job) => {
          const parentJob = jobs.find((parent) => parent.id === job.parent_id);
          return (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>
                <Link
                  onClick={() => handleView(job.id)}
                  className="text-decoration-none text-body"
                >
                  <p className="fw-bold mb-1">{job.name}</p>
                </Link>
              </TableCell>
              <TableCell>{parentJob ? parentJob.name : "N/A"}</TableCell>
              <TableCell>{job.sequence}</TableCell>
              <TableCell>
                {job.enabled ? (
                  <Badge bg="success">Activo</Badge>
                ) : (
                  <Badge bg="danger">Inactivo</Badge>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBase>
    </>
  );
};

export default JobsList;
