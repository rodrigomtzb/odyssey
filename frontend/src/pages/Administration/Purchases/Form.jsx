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
import { getParseFloat, handleFormChange, scrollToTop } from "../../../utils";
import MaterialForm from "../../../components/Form/MaterialForm";
import { generatePurchaseTable } from "../../../utils/pdf/tablePdf";
import ExportToExcel from "../../../utils/excel/exportExcel";
import ProjectService from "../../../services/project.service";
import SupplierService from "../../../services/supplier.service";
import { TabPanel, TabView } from "primereact/tabview";
import { SelectButton } from "../../../components/Form";
import PurchaseService from "../../../services/purchase.service";
import CatalogsService from "../../../services/catalogs.service";
import { SubmitButton } from "../../../components/Buttons";

const PurchaseForm = () => {
  const [dataIsOpen, setDataIsOpen] = useState(true);
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [purchase, setPurchase] = useState();
  const [purchaseTypes, setPurchaseTypes] = useState();
  const [disbursementTypes, setDisbursementTypes] = useState();
  const [projects, setProjects] = useState();
  const [suppliers, setSuppliers] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [purchaseDescriptionData, setPurchaseDescriptionData] = useState([]);
  const [material, setMaterial] = useState();
  const [formData, setFormData] = useState({
    projectId: "",
    supplierId: "",
    purchaseTypeId: 1,
    purchaseDescription: "",
    disbursementTypeId: "",
  });
  const isForProject = formData.purchaseTypeId === 3;

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
  const handleSaveData = () => {
    if (
      formData.supplierId &&
      (formData.projectId || formData.purchaseDescription)
    ) {
      const supplierSelected = suppliers.filter(
        (supplier) => supplier.id == formData.supplierId
      );
      setSupplierData(fetchSupplierData(supplierSelected));

      if (isForProject) {
        const projectSelected = projects.filter(
          (project) => project.id == formData.projectId
        );
        setProjectData(fetchProjectData(projectSelected));
      } else {
        setPurchaseDescriptionData([
          {
            title: "Descripción de compra",
            description: formData.purchaseDescription,
          },
        ]);
      }
      scrollToTop();
      setDataIsOpen(false);
    }
  };
  const handleSubmitRequest = () => {
    PurchaseService.createPurchase({
      ...formData,
      needInvoice: true,
      total: material.total,
      items: material.materials,
      disbursementTypeId: 1,
    }).then((response) => {
      console.log(response.data);
    });
    // console.log({
    //   ...formData,
    //   needInvoice: true,
    //   total: material.total,
    //   items: material.materials,
    // });
  };

  useEffect(() => {
    ProjectService.getEnabledProjects().then((response) => {
      setProjects(response.data);
    });
    SupplierService.getEnabledSuppliers().then((response) => {
      setSuppliers(response.data);
    });
    CatalogsService.getPurchaseType().then((response) => {
      setPurchaseTypes(response.data);
    });
    CatalogsService.getDisbursementType().then((response) => {
      setDisbursementTypes(response.data);
    });
  }, []);

  return (
    <>
      <Title title="Solicitud de compra" withReturnButton />
      {supplierData.length > 0 && (
        <ContentCard>
          <h5>Datos del Proveedor</h5>
          <DefinitionList definitions={supplierData} />
          <hr />
          {projectData.length > 0 && (
            <>
              <h5>Datos del Proyecto</h5>
              <DefinitionList definitions={projectData} />
            </>
          )}
          {purchaseDescriptionData.length > 0 && (
            <DefinitionList definitions={purchaseDescriptionData} />
          )}
          {material && (
            <>
              <hr />
              <h5>Materiales</h5>
              <div className="table-responsive-sm" id="materialTableSection">
                <table className="table align-middle table-hover table-sm table-responsive table-bordered border-black table-secondary">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Unidad</th>
                      <th>P/U</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {material.materials.map((item, index) => (
                      <tr key={index}>
                        <td>{item.material.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unitId}</td>
                        <td>{item.unitPrice || "N/A"}</td>
                        <td>{item.totalAmmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h6>
                Total: $<span>{getParseFloat(material.total)}</span>
              </h6>
            </>
          )}
        </ContentCard>
      )}

      <TitleSection text="Datos Generales" state={dataIsOpen}>
        <SelectButton
          label="Tipo de Compra"
          className="rounded-2"
          name="purchaseTypeId"
          options={purchaseTypes}
          optionLabel="name"
          optionValue="id"
          value={formData.purchaseTypeId}
          onChange={handleFormChange(formData, setFormData)}
        />
        <Select
          label="Proveedor"
          defaultOption="Selecciona un proveedor"
          name="supplierId"
          value={formData.supplierId}
          options={suppliers.map((supplier) => ({
            id: supplier.id,
            name:
              supplier.personType === "F"
                ? supplier.fullName
                : supplier.legalName,
          }))}
          onChange={handleFormChange(formData, setFormData)}
        />
        {isForProject ? (
          <>
            <Select
              label="Proyecto"
              defaultOption="Selecciona un proyecto"
              name="projectId"
              options={projects}
              value={formData.projectId}
              onChange={handleFormChange(formData, setFormData)}
            />
          </>
        ) : (
          <>
            <Input
              label="Descripción de Compra"
              placeholder="Ingresa la descripción de la compra"
              name="purchaseDescription"
              value={formData.purchaseDescription}
              onChange={handleFormChange(formData, setFormData)}
            />
          </>
        )}
        <SubmitButton text="Guardar" onClick={handleSaveData} />
      </TitleSection>
      {supplierData.length > 0 && <MaterialForm setFormData={setMaterial} />}
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
      {material && (
        <TitleSection text="Pago">
          <SelectButton
            label="Forma de Pago"
            name="disbursementTypeId"
            options={disbursementTypes}
            optionLabel="name"
            optionValue="id"
            value={formData.disbursementTypeId}
            onChange={handleFormChange(formData, setFormData)}
          />
        </TitleSection>
      )}
      <Col>
        <hr />
        <Button
          type="button"
          variant="gd"
          onClick={handleSubmitRequest}
          disabled={!formData.disbursementTypeId}
        >
          Enviar solicitud
        </Button>
      </Col>
    </>
  );
};

export default PurchaseForm;
