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
import ContentCard from "../../../components/ContentCard";
import ContactSection from "../../../components/Form/Contact";

const ProviderForm = () => {
  const id = useParams();
  const [supplier, setSupplier] = useState();
  const [supplierList, setSupplierList] = useState();
  const [addressList, setAddressList] = useState();
  const [contactList, setContactList] = useState();
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
            setLegalPerson({
              legalName: "",
              businessName: "",
              mxRfcCompany: "",
            });
            setNatualPerson({
              fullName: "",
              mxRfc: "",
            });
            setIsOpenData(false);
          });
        } catch (error) {
          console.error("Error al registrar proveedor: ", error);
        }
      }
    });
  };

  useEffect(() => {
    if (supplier) {
      switch (supplier.personType) {
        case "F":
          setSupplierList([
            {
              title: "Nombre Completo",
              description: supplier.fullName,
            },
            {
              title: "RFC",
              description: supplier.mxRfc,
            },
          ]);
          break;
        case "M":
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
          ]);
          break;
        default:
          setSupplierList([]);
          break;
      }
      if (supplier.address && supplier.address.length > 0) {
        let addresses = supplier.address;
        const addressList = addresses.map((address) => [
          { title: "Calle", description: address.street },
          { title: "N° Ext.", description: address.number },
          { title: "N° Int.", description: address.apartmentNumber },
          { title: "Colonia", description: address.neighborhoodId },
          { title: "Municipio", description: address.townId },
          { title: "Estado", description: address.statemxId },
          { title: "Codigo Postal", description: address.zipCode },
          {
            title: "Primera Calle Referencia",
            description: address.firstStreet,
          },
          {
            title: "Segunda Calle Referencia",
            description: address.secondStreet,
          },
          { title: "Referencia", description: address.description },
        ]);
        setAddressList(addressList);
      }
      if (supplier.contactMethods && supplier.contactMethods.length > 0) {
        let contacts = supplier.contactMethods;
        const contactList = contacts.map((contact) => [
          { title: "Nombre Completo", description: contact.personName },
          { title: "Correo Electrónico", description: contact.email },
          { title: "Número de Teléfono", description: contact.phoneNumber },
        ]);
        setContactList(contactList);
      }
    }
  }, [supplier]);

  return (
    <>
      <Title title="Alta de Proveedor" withReturnButton />
      {supplier ? (
        <>
          <ContentCard>
            {supplierList && <DefinitionList definitions={supplierList} />}
            {addressList &&
              addressList.map((list, index) => (
                <>
                  <hr />
                  <div key={index}>
                    <h5>Dirección {index + 1}</h5>
                    <DefinitionList definitions={list} />
                  </div>
                </>
              ))}
            {contactList &&
              contactList.map((list, index) => (
                <>
                  <hr />
                  <div key={index}>
                    <h5>Contacto {index + 1}</h5>
                    <DefinitionList definitions={list} />
                  </div>
                </>
              ))}
          </ContentCard>
          <AddressSection
            id={supplier.id}
            setFormData={setSupplier}
            to="supplier"
          />
          <ContactSection
            id={supplier.id}
            setFormData={setSupplier}
            to="supplier"
          />
          <TitleSection text="Tags">
            <TagInput />
          </TitleSection>
          {/* <hr />
            <Stack direction="horizontal" gap={2}>
              <Button variant="gd" className="ms-auto" type="submit">
                Registrar
              </Button>
            </Stack> */}
        </>
      ) : (
        <>
          <TitleSection text="Datos Generales" isFirst>
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
          </TitleSection>
        </>
      )}
    </>
  );
};

export default ProviderForm;
