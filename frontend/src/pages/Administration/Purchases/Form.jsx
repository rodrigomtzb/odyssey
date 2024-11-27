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
import { handleFormChange, scrollToTop } from "../../../utils";
import MaterialForm from "../../../components/Form/MaterialForm";
import { generatePurchaseTable } from "../../../utils/pdf/tablePdf";
import ExportToExcel from "../../../utils/excel/exportExcel";
import ProjectService from "../../../services/project.service";
import SupplierService from "../../../services/supplier.service";

const PurchaseForm = () => {
  const [dataIsOpen, setDataIsOpen] = useState(true);
  const [purchase, setPurchase] = useState();
  const [projects, setProjects] = useState();
  const [suppliers, setSuppliers] = useState([]);
  const [projectData, setProjectData] = useState();
  const [supplierData, setSupplierData] = useState();
  const [formData, setFormData] = useState({ projectId: "", supplierId: "" });
  const [material, setMaterial] = useState({
    name: "",
    quantity: "",
    price: "",
  });

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
  const fetchSupplierData = (supplier) => {
    if (supplier[0]) {
      let supplierName;
      let businessName;
      let personType;
      switch (supplier[0].personType) {
        case "F":
          supplierName = supplier[0].fullName;
          personType = "Persona Física";
          break;
        case "M":
          supplierName = supplier[0].legalName;
          businessName = supplier[0].businessName;
          personType = "Persona Moral";
          break;
        default:
          break;
      }
      return [
        { title: "Proveedor", description: supplierName },

        {
          title: "Tipo de Persona",
          description: personType,
        },
      ];
    } else {
      return [];
    }
  };

  useEffect(() => {
    ProjectService.getEnabledProjects().then((response) => {
      setProjects(response.data);
    });
    SupplierService.getEnabledSuppliers().then((response) => {
      setSuppliers(response.data);
    });
  }, []);

  useEffect(() => {
    if (formData.projectId) {
      scrollToTop();
      const projectSelected = projects.filter(
        (project) => project.id == formData.projectId
      );
      setProjectData(fetchProjectData(projectSelected));
    }
  }, [formData.projectId]);

  useEffect(() => {
    if (formData.supplierId) {
      scrollToTop();
      const supplierSelected = suppliers.filter(
        (supplier) => supplier.id == formData.supplierId
      );
      setSupplierData(fetchSupplierData(supplierSelected));
    }
  }, [formData.supplierId]);

  useEffect(() => {
    if (formData.projectId && formData.supplierId) {
      setDataIsOpen(false);
    }
  }, [formData]);

  return (
    <>
      <Title title="Solicitud de compra" withReturnButton />
      {projectData && (
        <ContentCard>
          <h5>Datos del Proyecto</h5>
          <DefinitionList definitions={projectData} />
        </ContentCard>
      )}
      {supplierData && (
        <ContentCard>
          <h5>Datos del Proveedor</h5>
          <DefinitionList definitions={supplierData} />
        </ContentCard>
      )}
      <TitleSection text="Datos Generales" state={dataIsOpen} isFirst>
        <Form>
          <Select
            label="Proyecto"
            defaultOption="Selecciona un proyecto"
            name="projectId"
            options={projects}
            value={formData.projectId}
            onChange={handleFormChange(formData, setFormData)}
          />
          <Select
            label="Proveedores"
            defaultOption="Selecciona un proveedor"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleFormChange(formData, setFormData)}
          >
            {suppliers.map((supplier) => (
              <option value={supplier.id}>
                {supplier.personType === "F"
                  ? supplier.fullName
                  : supplier.legalName}
              </option>
            ))}
          </Select>
        </Form>
      </TitleSection>
      {formData.projectId && formData.supplierId && (
        <>
          <TitleSection text="Datos Fiscales del Proveedor">
            <Form.Group className="mb-3">
              <Form.Label>¿Proveedor es sujeto a retención?</Form.Label>
              <div>
                <Form.Check type="radio" label="Si" inline />
                <Form.Check type="radio" label="No" inline />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Personas físicas que presten sus servicios profesionales
              </Form.Label>
              <div>
                <Form.Check type="check" label="IVA por honorarios" inline />
                <Form.Check type="check" label="ISR por honorarios" inline />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Personas físicas que otorgan el uso de un bien
              </Form.Label>
              <div>
                <Form.Check type="check" label="IVA por Arrendamiento" inline />
                <Form.Check type="check" label="ISR por Arrendamiento" inline />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Persona física o moral que presta sus servicios de transporte
              </Form.Label>
              <div>
                <Form.Check
                  type="check"
                  label="IVA Retenido 4% fletes"
                  inline
                />
              </div>
            </Form.Group>
          </TitleSection>
          <TitleSection text="Materiales" className="d-flex">
            <MaterialForm material={material} setMaterial={setMaterial} />
            <Button variant="gd" className="ms-auto">
              Agregar
            </Button>
          </TitleSection>
        </>
      )}
      {/* {formData.projectId ? (
            <>
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
