import $ from "jquery";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

import { Title } from "../../../components";
import { useEffect, useState } from "react";
import JobPositionService from "../../../services/job-position.service";
import { Link, useNavigate } from "react-router-dom";

DataTable.use(DT);

const JobsList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const handleView = (id) => {
    navigate(`/jobs/${id}`);
  };

  useEffect(() => {
    JobPositionService.getJobPositions().then((response) =>
      setJobs(response.data)
    );
  }, []);
  useEffect(() => {
    if (jobs.length > 0) {
      const table = $("#jobsTable").DataTable();

      return () => {
        if ($.fn.dataTable.isDataTable("#jobsTable")) {
          table.destroy();
        }
      };
    }
  }, [jobs]);
  return (
    <>
      <Title title="Lista de Puestos" withReturnButton />
      <div className="table-responsive">
        <table id="jobsTable" className="display table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Puesto</th>
              <th>Jefe inmediato</th>
              <th>N° de Secuencia</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const parentJob = jobs.find(
                (parent) => parent.id === job.parent_id
              );
              return (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>
                    <Link
                      onClick={() => handleView(job.id)}
                      className="text-decoration-none text-body"
                    >
                      <p className="fw-bold mb-1">{job.name}</p>
                    </Link>
                  </td>
                  <td>{parentJob ? parentJob.name : "N/A"}</td>
                  <td>{job.sequence}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default JobsList;
