import React, { useEffect, useState } from "react";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { Select, TitleSection } from "../../../components/Form";
import JobPositionService from "../../../services/job-position.service";
import { handleFormChange, flattenedItems } from "../../../utils";
import AccessService from "../../../services/access.service";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SyncAccessForm = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState();
  const [accesses, setAccesses] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [jobAccesses, setJobAccesses] = useState({
    positionId: "",
    lstMenus: [],
  });

  const handleCheckboxChange = (id, parentId, hasSubItems) => {
    setSelectedIds((prev) => {
      let updated = [...prev];

      if (hasSubItems) {
        if (updated.includes(id)) {
          updated = updated.filter(
            (itemId) =>
              itemId !== id &&
              !accesses
                .find((item) => item.id === id)
                ?.subItems.some((subItem) => subItem.id === itemId)
          );
        } else {
          updated.push(id);
        }
      } else if (parentId) {
        if (updated.includes(id)) {
          updated = updated.filter((itemId) => itemId !== id);
        } else {
          updated.push(id);

          if (!updated.includes(parentId)) {
            updated.push(parentId);
          }
        }
      } else {
        if (updated.includes(id)) {
          updated = updated.filter((itemId) => itemId !== id);
        } else {
          updated.push(id);
        }
      }

      return updated;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobAccesses.positionId && jobAccesses.lstMenus.length > 0) {
      Swal.fire({
        title: "¿Estás seguro de los accesos concedidos?",
        text: "Podrás cambiarlo después",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          AccessService.syncAccessToJobPosition(
            jobAccesses.positionId,
            jobAccesses
          ).then((response) => {
            Swal.fire({
              icon: "success",
              title: "Accesos actualizados",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => navigate("/accesses"));
          });
        }
      });
    }
  };

  useEffect(() => {
    JobPositionService.getJobPositions().then((response) => {
      setJobs(response.data);
    });
    AccessService.getAllAccess().then((response) => {
      setAccesses(response.data);
    });
  }, []);
  useEffect(() => {
    if (jobAccesses.positionId) {
      AccessService.getAccessFromJobPosition(jobAccesses.positionId).then(
        (response) => {
          const flattened = flattenedItems(response.data);
          const idsToSelect = flattened.map((item) => item.id);

          setSelectedIds(idsToSelect);
        }
      );
    }
  }, [jobAccesses.positionId]);
  useEffect(() => {
    if (selectedIds.length > 0) {
      setJobAccesses({
        ...jobAccesses,
        lstMenus: selectedIds,
      });
    }
  }, [selectedIds]);
  return (
    <>
      <Title title="Sincronizar Accesos" withReturnButton />
      {jobAccesses.positionId && (
        <ContentCard>
          <DefinitionList
            definitions={[
              {
                title: "Puesto",
                description: jobs.find(
                  (job) => job.id == jobAccesses.positionId
                ).name,
              },
            ]}
          />
        </ContentCard>
      )}
      <TitleSection text="Puesto" state={!jobAccesses.positionId} isFirst>
        <Select
          label="Puestos"
          name="positionId"
          defaultOption="Selecciona un puesto"
          options={jobs}
          onChange={handleFormChange(jobAccesses, setJobAccesses)}
        />
      </TitleSection>

      {jobAccesses.positionId && (
        <TitleSection text="Lista de Menús">
          <div>
            {accesses &&
              accesses.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index > 0 && <hr />}
                  <Row className="ps-2">
                    <Col sm={6}>
                      <Form.Check
                        inline
                        label={item.title}
                        type="checkbox"
                        name={`group${item.id}`}
                        id={`menuItem${item.id}`}
                        checked={selectedIds.includes(item.id)}
                        onChange={() =>
                          handleCheckboxChange(
                            item.id,
                            null,
                            item.subItems.length > 0
                          )
                        }
                      />
                    </Col>
                  </Row>
                  {item.subItems.length > 0 && (
                    <Row className="ps-5">
                      {item.subItems.map((subItem) => (
                        <Col sm={6} md={3}>
                          <Form.Check
                            inline
                            label={subItem.title}
                            type="checkbox"
                            name={`group${subItem.id}`}
                            id={`menuItem${subItem.id}`}
                            checked={selectedIds.includes(subItem.id)}
                            onChange={() =>
                              handleCheckboxChange(subItem.id, item.id, false)
                            }
                          />
                        </Col>
                      ))}
                    </Row>
                  )}
                </React.Fragment>
              ))}
          </div>
          <hr />
          <Button variant="gd" onClick={handleSubmit}>
            Guardar
          </Button>
        </TitleSection>
      )}
    </>
  );
};

export default SyncAccessForm;
