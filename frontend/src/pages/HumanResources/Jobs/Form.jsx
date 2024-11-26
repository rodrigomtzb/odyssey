import { useEffect, useState } from "react";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { Input, Select, TitleSection } from "../../../components/Form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { handleFormChange } from "../../../utils";
import JobPositionService from "../../../services/job-position.service";

const JobForm = () => {
  const [job, setJob] = useState();
  const [jobData, setJobData] = useState([]);
  const [jobPositions, setJobPositions] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sequence: "",
    parent_id: "",
    role: [],
  });

  const handleSubmit = () => {
    JobPositionService.createJobPosition(formData).then((response) =>
      setJob(response.data)
    );
  };

  useEffect(() => {
    JobPositionService.getEnabledJobPositions().then((response) =>
      setJobPositions(response.data)
    );
  }, []);

  useEffect(() => {
    if (job) {
      let parentName;
      JobPositionService.getJobPosition(job.parent_id).then(
        (response) => (parentName = response.data.name)
      );
      setJobData([
        {
          title: "Puesto",
          description: job.name,
        },
        {
          title: "Descripción",
          description: job.description,
        },
        {
          title: "Padre",
          description: parentName,
        },
        {
            title: "Secuencia",
            description: job.sequence
        }
      ]);
    }
  }, [job]);

  return (
    <>
      <Title title="Alta de Puesto" withReturnButton />
      {job && (
        <>
          <ContentCard>
            <h5>Datos Generales</h5>
            <DefinitionList definitions={jobData} />
          </ContentCard>
        </>
      )}
      <TitleSection text="Datos Generales" isFirst>
        <Form>
          <Input
            label="Puesto"
            placeholder="Ingresa el nombre del puesto"
            name="name"
            value={formData.name}
            onChange={handleFormChange(formData, setFormData)}
          />
          <Input
            label="Descripción"
            placeholder="Ingresa la descripción del puesto"
            name="description"
            value={formData.description}
            onChange={handleFormChange(formData, setFormData)}
          />
          <Row>
            <Col sm={12} md={9}>
              <Select
                label="Jefe inmediato"
                name="parent_id"
                value={formData.parent_id}
                onChange={handleFormChange(formData, setFormData)}
                options={jobPositions}
              />
            </Col>
            <Col sm={12} md={3}>
              <Input
                label="N° de Secuencia"
                placeholder="Ingresas la secuencia"
                name="sequence"
                type="number"
                value={formData.sequence}
                onChange={handleFormChange(formData, setFormData)}
              />
            </Col>
          </Row>
          <Button variant="gd" onClick={handleSubmit}>Registrar</Button>
        </Form>
      </TitleSection>
    </>
  );
};

export default JobForm;
