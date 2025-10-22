import { useEffect, useState } from "react";
import { ContentCard, DefinitionList, Title } from "../../../components";
import { Input, Select, TitleSection } from "../../../components/Form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { handleFormChange, scrollToSection, scrollToTop } from "../../../utils";
import SucursalService from "../../../services/sucursal.service";
import { useParams } from "react-router-dom";

const SucursalForm = () => {
  const { id } = useParams();
  const [loaggedUser, setLoggedUser] = useState([JSON.parse(localStorage.getItem("user"))]);
  const [dataVisible, setDataVisible] = useState(true);
  const [sucursalData, setSucursalData] = useState([]);
  const [sucursal, setSucursal] = useState();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleSubmit = () => {
    if (id) {
      SucursalService.editSucursal(id, formData).then((response) => {
        setDataVisible(false);
        scrollToTop();
        setSucursal(response.data);
      });
    } else {
      console.log(loaggedUser[0].id);
      SucursalService.createSucursal(loaggedUser[0].companyId,formData).then((response) =>
        setSucursal(response.data)
      );
    }
  };

  const handleEdit = () => {
    setDataVisible(true);
    setFormData(sucursalData);
    scrollToSection("dataSection");
  };
/*
  useEffect(() => {
    if (sucursalData) {
      SucursalService.getSucursal(sucursalData.id).then(
        (response) => (sucursalName = response.data.name)
      );
      setSucursalData([
        {
          title: "sucursal",
          sucursalName: sucursalData.name,
        },
      ]);
    }
  }, [sucursalData]);
*/
  useEffect(() => {
    if (id) {
      setDataVisible(false);
      SucursalService.getSucursal(id).then((response) =>
        setSucursal(response.data)
      );
    }
  }, [id]);

  return (
    <>
      <Title
        title={id ? "Datos de la Sucursal" : "Alta de Sucursal"}
        withReturnButton
      />
      {sucursal && (
        <>
          <ContentCard>
            <Row>
              <Col sm={10}>
                <h5>Datos Generales</h5>
                <DefinitionList definitions={sucursalData} />
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
            label="Nombre"
            placeholder="Ingresa el nombre de la sucursal"
            name="name"
            value={formData.name}
            onChange={handleFormChange(formData, setFormData)}
          />
          
          <Button variant="gd" onClick={handleSubmit}>
            {id ? "Actualizar" : "Registrar"}
          </Button>
        </Form>
      </TitleSection>
    </>
  );
};

export default SucursalForm;
