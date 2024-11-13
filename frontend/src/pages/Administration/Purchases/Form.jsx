import { Button, Col, Form, Stack } from "react-bootstrap";
import {
  AddressSection,
  Input,
  Select,
  TitleSection,
} from "../../../components/Form";
import { useParams } from "react-router-dom";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { useEffect, useState } from "react";
import { handleFormChange } from "../../../utils";
import MaterialForm from "../../../components/Form/MaterialForm";
import { generatePurchaseTable } from "../../../utils/pdf/tablePdf";
import ExportToExcel from "../../../utils/excel/exportExcel";
import ProjectService from "../../../services/project.service";

const PurchaseForm = () => {
  const [purchase, setPurchase] = useState();
  const [projects, setProjects] = useState();
  const [projectData, setProjectData] = useState();
  const [formData, setFormData] = useState({ projectId: "" });

  const fetchProjectData = (project) => {
    if (project[0]) {
      let customerName;
      let businessName;
      switch (project[0].customer.personType) {
        case "F":
          customerName = project[0].customer.fullName;
          break;
        case "M":
          customerName = project[0].customer.legalName;
          businessName = project[0].customer.businessName;
          break;
        default:
          break;
      }
      return [
        { title: "Nombre del Proyecto", description: project[0].name },
        {
          title: "Encargado",
          description: `${project[0].user.firstName} ${
            project[0].user.middleName || ""
          } ${project[0].user.fatherLastName || ""} ${
            project[0].user.motherLastName || ""
          }`.trim(),
        },
        {
          title: "Cliente",
          description: `${customerName} ${
            businessName ? `- ${businessName}` : ""
          }`,
        },
      ];
    } else {
      return [];
    }
  };

  useEffect(() => {
    ProjectService.getProjects().then((response) => {
      setProjects(response.data);
    });
  }, []);

  useEffect(() => {
    if (formData.projectId) {
      const projectSelected = projects.filter(
        (project) => project.id == formData.projectId
      );
      setProjectData(fetchProjectData(projectSelected));
    }
  }, [formData.projectId]);

  return (
    <>
      <Title title="Solicitud de compra" withReturnButton />
      {projectData && (
        <ContentCard>
          <h5>Datos del Proyecto</h5>
          <DefinitionList definitions={projectData} />
        </ContentCard>
      )}
      <TitleSection text="Datos de Obra" isFirst>
        <Form>
          <Select
            label="Proyecto"
            defaultOption="Selecciona un proyecto"
            name="projectId"
            options={projects}
            value={formData.projectId}
            onChange={handleFormChange(formData, setFormData)}
          />
          {/* {formData.projectId ? (
            <>
              <DefinitionList definitions={projectData} />
              <TitleSection text="Materiales" />
              <MaterialForm />
              <hr />
              <Stack direction="horizontal" gap={2}>
                <Button variant="gd" className="ms-auto" type="submit">
                  Registrar
                </Button>
              </Stack>
            </>
          ) : (
            ""
          )} */}
        </Form>
      </TitleSection>
      {/* <Col md={3}>
        <Button variant="gd" type="button" onClick={generatePurchaseTable}>
          Generar tabla
        </Button>
        <ExportToExcel />
      </Col> */}
    </>
  );
};

export default PurchaseForm;
