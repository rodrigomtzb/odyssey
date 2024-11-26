import $ from "jquery";
import { useParams } from "react-router-dom";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { useEffect, useRef, useState } from "react";
import JobPositionService from "../../../services/job-position.service";
import { flattenedItems } from "../../../utils";
import TableBase from "../../../components/TableBase";

const JobWithAccesses = () => {
  const { id } = useParams();
  const [flattenedAccesses, setFlattenedAccesses] = useState([]);
  const tableRef = useRef();
  let dataTableInstance = useRef(null);
  const [job, setJob] = useState();
  const [jobData, setJobData] = useState();

  useEffect(() => {
    if (id) {
      JobPositionService.getJobPosition(id).then((response) => {
        setJob(response.data);
      });
    }
  }, [id]);
  useEffect(() => {
    if (job) {
      if (job.menuItems.length > 0) {
        setFlattenedAccesses(job.menuItems);
      }
      setJobData([
        {
          title: "ID",
          description: job.id,
        },
        {
          title: "Puesto",
          description: job.description,
        },
      ]);
    }
  }, [job]);

  return (
    <>
      <Title title="Puesto con Accesos" withReturnButton />
      <ContentCard>
        {jobData && <DefinitionList definitions={jobData} />}
        <TableBase
          data={flattenedAccesses}
          dataKey={["id", "icon", "title", "sequence", "path"]}
          titles={["ID", "Icono", "Titulo", "N° de Secuencia", "Path"]}
          paging={false}
          sorting={false}
        />
      </ContentCard>
    </>
  );
};

export default JobWithAccesses;
