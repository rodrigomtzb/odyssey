import { useEffect, useState } from "react";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { Input, Select, TitleSection } from "../../../components/Form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { handleFormChange, scrollToSection, scrollToTop } from "../../../utils";
import JobPositionService from "../../../services/job-position.service";
import { useParams } from "react-router-dom";

const JobForm = () => {
  const { id } = useParams();
  const [job, setJob] = useState();
  const [dataVisible, setDataVisible] = useState(true);
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
    if (id) {
      JobPositionService.editJobPosition(id, formData).then((response) => {
        setDataVisible(false);
        scrollToTop();
        setJob(response.data);
      });
    } else {
      JobPositionService.createJobPosition(formData).then((response) =>
        setJob(response.data)
      );
    }
  };

  const handleEdit = () => {
    setDataVisible(true);
    setFormData(job);
    scrollToSection("dataSection");
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
          description: job.sequence,
        },
      ]);
    }
  }, [job]);

  useEffect(() => {
    if (id) {
      setDataVisible(false);
      JobPositionService.getJobPosition(id).then((response) =>
        setJob(response.data)
      );
    }
  }, [id]);

  return (
    <>
      <Title
        title={id ? "Datos de Puesto" : "Alta de Puesto"}
        withReturnButton
      />
      {job && (
        <>
          <ContentCard>
            <Row>
              <Col sm={10}>
                <h5>Datos Generales</h5>
                <DefinitionList definitions={jobData} />
              </Col>
              <Col
                sm={2}
                className="d-flex justify-content-center align-items-center"
              >
                <Button variant="gd" onClick={() => handleEdit()}>
                  <i className="bi bi-pencil-square" />
                </Button>
              </Col>
            </Row>
          </ContentCard>
        </>
      )}
      <TitleSection
        id="dataSection"
        text="Datos Generales"
        state={dataVisible}
        isFirst
      >
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
          <Button variant="gd" onClick={handleSubmit}>
            {id ? "Actualizar" : "Registrar"}
          </Button>
        </Form>
      </TitleSection>
    </>
  );
};

export default JobForm;
