import { useParams } from "react-router-dom";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { useEffect, useState } from "react";
import JobPositionService from "../../../services/job-position.service";
import { Button, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState();
  const [job, setJob] = useState();
  const [jobData, setJobData] = useState([]);

  const toggleJobStatus = () => {
    let countdown = 5;
    let title = job.enabled ? "Deshabilitar" : "Habilitar";
    let text = job.enabled ? "deshabilitará" : "habilitará";
    let confirm = job.enabled ? "deshabilitado" : "habilitado";

    Swal.fire({
      title: `¿${title} Puesto?`,
      text: `Esta acción ${text} el Puesto.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Confirmar (${countdown})`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        confirmButton.disabled = true;

        const timerInterval = setInterval(() => {
          countdown -= 1;
          confirmButton.textContent = `Confirmar (${countdown})`;

          if (countdown === 0) {
            clearInterval(timerInterval);
            confirmButton.disabled = false;
            confirmButton.textContent = "Confirmar";
          }
        }, 1000);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        JobPositionService.toggleJobPositionStatus(id, {
          id: id,
          enabled: !job.enabled,
        }).then((response) => {
          setJob(response.data);
          Swal.fire({
            icon: "success",
            title: `Puesto ${confirm}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

  useEffect(() => {
    if (id) {
      JobPositionService.getEnabledJobPositions().then((response) =>
        setJobs(response.data)
      );
      JobPositionService.getJobPosition(id).then((response) =>
        setJob(response.data)
      );
    }
  }, []);
  useEffect(() => {
    if (jobs && job) {
      const parentJob = jobs.find((parent) => parent.id === job.parent_id);
      const childrenNames = jobs
        .filter((children) => children.parent_id === job.id)
        .map((children) => children.name);

      setJobData([
        {
          title: "ID",
          description: job.id,
        },
        {
          title: "Nombre del Puesto",
          description: job.name,
        },
        {
          title: "Descripción del Puesto",
          description: job.description,
        },
        {
          title: "Jefe inmediato",
          description: parentJob ? parentJob.name : "N/A",
        },
        {
          title: "Puestos a su Cargo",
          description: childrenNames,
        },
      ]);
    }
  }, [job]);

  return (
    <>
      <Title title="Detalles de Puesto" withReturnButton />
      <ContentCard>
        <h5>Datos Generales</h5>
        <DefinitionList definitions={jobData} />
      </ContentCard>
      {job && (
        <>
          <hr />
          <div
            className={`mt-2 px-4 py-3 ${
              job.enabled ? "bg-danger-subtle" : "bg-success-subtle"
            }`}
          >
            <Row className="align-items-center">
              <Col>
                <p className="m-0">
                  {job.enabled ? "Usuario Activo" : "Usuario Inactivo"}
                </p>
              </Col>
              <Col className="d-flex">
                <Button
                  className="ms-auto"
                  variant={job.enabled ? "danger" : "success"}
                  onClick={toggleJobStatus}
                >
                  {job.enabled ? "Deshabilitar Puesto" : "Habilitar Puesto"}
                </Button>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default JobDetails;
