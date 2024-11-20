import $ from "jquery";

import { useEffect, useState } from "react";
import { Title } from "../../../components";
import ProjectService from "../../../services/project.service";
import { Link, useNavigate } from "react-router-dom";

const ProjectsList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const handleView = (id) => {
    navigate(`/projects/${id}`);
  };

  useEffect(() => {
    ProjectService.getProjects().then((response) => {
      setProjects(response.data);
      console.log(response.data);
    });
  }, []);
  useEffect(() => {
    if (projects.length > 0) {
      const table = $("#projectsTable").DataTable();

      return () => {
        if ($.fn.dataTable.isDataTable("#projectsTable")) {
          table.destroy();
        }
      };
    }
  }, [projects]);

  return (
    <>
      <Title title="Lista de Proyectos" withReturnButton />
      <div className="table-responsive">
        <table id="projectsTable" className="display table">
          <thead>
            <tr>
              <th>Nombre del Proyecto</th>
              <th>Cliente</th>
              <th>Encargado</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <Link
                    onClick={() => handleView(project.id)}
                    className="text-decoration-none text-body"
                  >
                    <p className="fw-bold mb-1">{project.name}</p>
                  </Link>
                </td>
                <td>{project.customer.fullName}</td>
                <td>
                  {`${project.user.firstName} ${
                    project.user.middleName || ""
                  } ${project.user.fatherLastName || ""} ${
                    project.user.motherLastName || ""
                  }`.trim()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectsList;
