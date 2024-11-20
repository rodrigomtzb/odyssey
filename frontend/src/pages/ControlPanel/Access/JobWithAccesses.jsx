import $ from "jquery";
import { useParams } from "react-router-dom";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { useEffect, useRef, useState } from "react";
import JobPositionService from "../../../services/job-position.service";
import { flattenedItems } from "../../../utils";

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
        console.log(response.data);
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
  useEffect(() => {
    if (flattenedAccesses.length > 0) {
      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      dataTableInstance.current = $(tableRef.current).DataTable({
        paging: false,
        ordering: true,
        info: false,
        searching: false,
      });
    }
  }, [flattenedAccesses]);

  return (
    <>
      <Title title="Puesto con Accesos" withReturnButton />
      <ContentCard>
        {jobData && <DefinitionList definitions={jobData} />}
        <div>
          <table
            ref={tableRef}
            className="display table table-striped"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Icon</th>
                <th>Título</th>
                <th>Secuencia</th>
                <th>Path</th>
              </tr>
            </thead>
            <tbody>
              {flattenedAccesses.map((access, index) => (
                <tr key={index}>
                  <td>{access.id}</td>
                  <td>
                    {access.icon ? (
                      <i className={`bi bi-${access.icon}`} />
                    ) : (
                      <i className={"bi bi-caret-right-fill"} />
                    )}
                  </td>
                  <td>{access.title}</td>
                  <td>{access.sequence}</td>
                  <td>{access.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentCard>
    </>
  );
};

export default JobWithAccesses;
