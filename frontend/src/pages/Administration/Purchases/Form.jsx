import { Button, Form, Stack } from "react-bootstrap";
import {
  AddressSection,
  Input,
  Select,
  TitleSection,
} from "../../../components/Form";
import { useParams } from "react-router-dom";
import { DefinitionList, Title } from "../../../components";
import { useState } from "react";
import { handleFormChange } from "../../../utils";
import MaterialForm from "../../../components/Form/MaterialForm";

const PurchaseForm = () => {
  const projects = [
    {
      id: 1,
      name: "Hotel Treasure",
    },
    {
      id: 2,
      name: "Casa de Don Carmelo",
    },
  ];
  const projectData = [
    { title: "Residente", description: "Alfredo Alexis Fiesco Venegas" },
    { title: "Cliente", description: "Jazmine Hotels" },
    { title: "Calle", description: "Av. Valparaiso" },
    { title: "Número Exterior", description: "S/N" },
    { title: "Colonia", description: "Lomas de Valparaíso" },
    { title: "Código Postal", description: "65470" },
    { title: "Municipio", description: "Acapulco de Juárez" },
    { title: "Estado", description: "Guerrero" },
  ];
  const [formData, setFormData] = useState({ project: "" });
  return (
    <>
      <Title title="Solicitud de compra" withReturnButton />
      <Form>
        <TitleSection text="Datos de Obra" isFirst />
        <Select
          label="Proyecto"
          defaultOption="Selecciona un proyecto"
          name="project"
          options={projects}
          value={formData.project}
          onChange={handleFormChange(formData, setFormData)}
        />
        {formData.project ? (
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
        )}
      </Form>
    </>
  );
};

export default PurchaseForm;
