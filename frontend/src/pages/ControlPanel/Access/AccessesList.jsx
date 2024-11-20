import $ from "jquery";
import { useEffect, useState } from "react";
import { Title } from "../../../components";
import JobPositionService from "../../../services/job-position.service";
import { flattenedItems } from "../../../utils";
import { Link, useNavigate } from "react-router-dom";

const AccessesList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const handleView = (id) => {
    navigate(`/accesses/jobs/${id}`);
  };

  useEffect(() => {
    JobPositionService.getJobPositions().then((response) => {
      setJobs(response.data);
    });
  }, []);
  useEffect(() => {
    if (jobs.length > 0) {
      const table = $("#jobsAccessTable").DataTable();

      return () => {
        if ($.fn.dataTable.isDataTable("#jobsAccessTable")) {
          table.destroy();
        }
      };
    }
  }, [jobs]);

  return (
    <>
      <Title title="Lista de Accesos" withReturnButton />
      <div>
        <table id="jobsAccessTable" className="display table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Puesto</th>
              <th>Secuencia</th>
              <th>Menu Items asignados</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr>
                <td>{job.id}</td>
                <td>
                  <Link
                    onClick={() => handleView(job.id)}
                    className="text-decoration-none text-body"
                  >
                    <p className="fw-bold mb-1">{job.name}</p>
                  </Link>
                </td>
                <td>{job.sequence}</td>
                <td>{flattenedItems(job.menuItems).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccessesList;
