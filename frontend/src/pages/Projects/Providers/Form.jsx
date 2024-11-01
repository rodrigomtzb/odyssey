import { useParams } from "react-router-dom";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import {
  AddressSection,
  Input,
  Select,
  TitleSection,
} from "../../../components/Form";
import { DefinitionList, Title } from "../../../components";
import { useEffect, useState } from "react";
import TagInput from "../../../components/Form/TagInput";
import { handleFormChange } from "../../../utils";
import Swal from "sweetalert2";
import SupplierService from "../../../services/supplier.service";

const ProviderForm = () => {
  const id = useParams();
  const [supplier, setSupplier] = useState();
  const [supplierList, setSupplierList] = useState();
  const [formData, setFormData] = useState({
    personType: "",
    enabled: true,
    address: [],
    contactMethods: [],
    tagsDescription: [],
  });
  const [legalPerson, setLegalPerson] = useState({
    legalName: "", //legal
    businessName: "", //legal
    mxRfcCompany: "", //legal
  });
  const [naturalPerson, setNatualPerson] = useState({
    fullName: "", //natural
    mxRfc: "", //natural
  });

  const handleSubmitData = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Estás seguro de la información del proveedor?",
      text: "Podrás cambiarlo después",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          let data;
          if (formData.personType == "F") {
            data = {
              ...naturalPerson,
              personType: formData.personType,
            };
          } else {
            data = {
              ...legalPerson,
              personType: formData.personType,
            };
          }
          SupplierService.createSupplier(data).then((response) => {
            console.log(response.data);
            setSupplier(response.data);
          });
        } catch (error) {
          console.error("Error al registrar proveedor: ", error);
        }
      }
    });
  };

  useEffect(() => {
    if (supplier) {
      setSupplierList([
        {
          title: "Razon social",
          description: supplier.legalName,
        },
        {
          title: "Nombre Comercial",
          description: supplier.businessName,
        },
        {
          title: "RFC",
          description: supplier.mxRfcCompany,
        },
        {
          title: "Nombre Completo",
          description: supplier.fullName,
        },
        {
          title: "RFC",
          description: supplier.mxRfc,
        },
      ]);
    }
  }, [supplier]);

  return (
    <>
      <Title title="Alta de Proveedor" withReturnButton />
      <TitleSection text="Datos Generales" isFirst>
        {supplier ? (
          <>{supplierList && <DefinitionList definitions={supplierList} />}</>
        ) : (
          <>
            <Form>
              <Row className="mb-3">
                <Col sm={6} className="d-flex align-items-end">
                  <Form.Check
                    inline
                    label="Persona Física"
                    name="personType"
                    type="radio"
                    id="naturalPerson"
                    value="F"
                    onChange={handleFormChange(formData, setFormData)}
                  />
                </Col>
                <Col sm={6} className="d-flex-align-items-end">
                  <Form.Check
                    inline
                    label="Persona Moral"
                    name="personType"
                    type="radio"
                    id="legalPerson"
                    value="M"
                    onChange={handleFormChange(formData, setFormData)}
                  />
                </Col>
              </Row>
              {formData.personType == "M" ? (
                <>
                  <Input
                    label="Razon Social"
                    name="legalName"
                    placeholder="Ingresa la Razon Social"
                    value={legalPerson.legalName}
                    onChange={handleFormChange(legalPerson, setLegalPerson)}
                  />
                  <Input
                    label="Nombre Comercial"
                    name="businessName"
                    placeholder="Ingresa el nombre comercial"
                    value={legalPerson.businessName}
                    onChange={handleFormChange(legalPerson, setLegalPerson)}
                  />
                  <Row>
                    <Col sm={12} md={7}>
                      <Input
                        label="RFC"
                        name="mxRfcCompany"
                        placeholder="X1X1X1X1X1X1X1X1"
                        max={12}
                        value={legalPerson.mxRfcCompany}
                        onChange={handleFormChange(legalPerson, setLegalPerson)}
                      />
                    </Col>
                  </Row>
                </>
              ) : formData.personType == "F" ? (
                <>
                  <Input
                    label="Nombre Completo"
                    name="fullName"
                    placeholder="Ingresa el nombre completo"
                    value={naturalPerson.fullName}
                    onChange={handleFormChange(naturalPerson, setNatualPerson)}
                  />
                  <Row>
                    <Col sm={12} md={7}>
                      <Input
                        label="RFC"
                        name="mxRfc"
                        placeholder="X1X1X1X1X1X1X1X1"
                        max={13}
                        value={naturalPerson.mxRfc}
                        onChange={handleFormChange(
                          naturalPerson,
                          setNatualPerson
                        )}
                      />
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}
              <Button
                variant="gd"
                type="submit"
                disabled={!formData.personType}
                onClick={handleSubmitData}
              >
                Registrar
              </Button>
            </Form>
          </>
        )}
      </TitleSection>
      {supplier && (
        <>
          <Form>
            <AddressSection />
            <TitleSection text="Contacto">
              <Input
                label="Nombre de Contacto"
                placeholder="Fernando Fernandez"
              />
              <Row>
                <Col sm={12} md={8}>
                  <Input
                    label="Correo Electrónico"
                    placeholder="ejemplo@gmail.com"
                  />
                </Col>
                <Col sm={12} md={4}>
                  <Input label="Teléfono" placeholder="5512345678" />
                </Col>
              </Row>
              <Button variant="gd">Registrar</Button>
            </TitleSection>
            <TitleSection text="Tags">
              <TagInput />
            </TitleSection>
            {/* <hr />
            <Stack direction="horizontal" gap={2}>
              <Button variant="gd" className="ms-auto" type="submit">
                Registrar
              </Button>
            </Stack> */}
          </Form>
        </>
      )}
    </>
  );
};

export default ProviderForm;
