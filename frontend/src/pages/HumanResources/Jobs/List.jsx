import { useAccordionButton } from "react-bootstrap";
import { Title } from "../../../components";
import { useEffect, useState } from "react";
import JobPositionService from "../../../services/job-position.service";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    JobPositionService.getJobPositions().then((response) =>
      setJobs(response.data)
    );
  }, []);
  return (
    <>
      <Title title="Lista de Puestos" withReturnButton />
      <div className="table-responsive">
        <table id="jobsTable" className="display table">
          <thead></thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default JobsList;
