import { useEffect, useState } from "react";
import { Title } from "../../../components";
import ProjectService from "../../../services/project.service";
import { Link, useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import TableBase from "../../../components/TableBase";
import FilterDropdown from "../../../components/Buttons/FilterDropdown";
import { Badge } from "react-bootstrap";

const ProjectsList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("enabled");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleView = (id) => {
    navigate(`/projects/${id}`);
  };

  useEffect(() => {
    const apiCall =
      filter === "enabled"
        ? ProjectService.getEnabledProjects()
        : filter === "disabled"
        ? ProjectService.getDisabledProjects()
        : ProjectService.getAllProjects();

    apiCall.then((response) => {
      setProjects(response.data);
    });
  }, [filter]);

  return (
    <>
      <Title title="Lista de Proyectos" withReturnButton />
      <FilterDropdown onFilterChange={handleFilterChange} />
      <TableBase
        key="projectsTable"
        titles={["Nombre del Proyeto", "Cliente", "Encargado", "Estado"]}
        dataKey={["name", "customer", "user", "enabled"]}
      >
        {projects.map((project, index) => (
          <TableRow
            key={project.id}
            sx={{
              backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
              "&:hover": { backgroundColor: "#e0f7fa" },
              borderBottom: "2px solid #ddd",
            }}
          >
            <TableCell>
              <Link
                onClick={() => handleView(project.id)}
                className="text-decoration-none text-body"
              >
                <p className="fw-bold mb-1">{project.name}</p>
              </Link>
            </TableCell>
            <TableCell>
              {project.customer?.personType == "F"
                ? project.customer?.fullName
                : project.customer?.legalName}
            </TableCell>
            <TableCell>
              {`${project.user.firstName} ${project.user.middleName || ""} ${
                project.user.fatherLastName || ""
              } ${project.user.motherLastName || ""}`.trim()}
            </TableCell>
            <TableCell>
              {project.enabled ? (
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

export default ProjectsList;
