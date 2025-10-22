import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import {
  AddressSection,
  Input,
  TitleSection,
  ContactSection,
} from "../../../components/Form";
import { DefinitionList, Title, ContentCard } from "../../../components";
import { handleFormChange, scrollToSection, scrollToTop } from "../../../utils";
import CompanyService from "../../../services/company.service";
import AddressService from "../../../services/address.service";
import CatalogsService from "../../../services/catalogs.service";

const CompanyForm = () => {
  const { id } = useParams();
  const [personType, setPersonType] = useState([]);
  const [dataVisible, setDataVisible] = useState(true);
  const [company, setCompany] = useState();
  const [selectedAddress, setSelectAddress] = useState();
  const [selectedContact, setSelectContact] = useState();
  const [companyData, setCompanyData] = useState();
  const [companyAddresses, setCompanyAddresses] = useState();
  const [companyContacts, setCompanyContacts] = useState();

  const [formData, setFormData] = useState({
    personType: "",
    enabled: true,
    address: [],
    contactMethods: [],
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
      title: "¿Estás seguro de la información del compañia?",
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
          CompanyService.createCompany(data).then((response) => {
            scrollToTop();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Datos registrados correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
            setCompany(response.data);
            setLegalPerson({
              legalName: "",
              businessName: "",
              mxRfcCompany: "",
            });
            setNatualPerson({
              fullName: "",
              mxRfc: "",
            });
            setDataVisible(false);
          });
        } catch (error) {
          console.error("Error al registrar Compañia: ", error);
        }
      }
    });
  };
  const handleUpdateData = async () => {
    try {
      CompanyService.editCompanyData(company.id, {
        personType: formData.personType,
        ...legalPerson,
        ...naturalPerson,
      }).then((response) => {
        setCompany(response.data);
        scrollToTop();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos actualizados correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        setDataVisible(false);
      });
    } catch (error) {}
  };
  const handleEdit = (id, index, type) => {
    switch (type) {
      case "data":
        setFormData({
          ...formData,
          personType: company.personType,
        });
        setDataVisible(true);
        if (company.personType === "F") {
          setNatualPerson({
            id: id,
            fullName: company.fullName,
            mxRfc: company.mxRfc,
          });
        } else if (company.personType === "M") {
          setLegalPerson({
            id: id,
            legalName: company.legalName,
            businessName: company.businessName,
            mxRfcCompany: company.mxRfcCompany,
          });
        }
        scrollToSection("dataSection");
        break;
      case "address":
        setSelectAddress(company.address[index]);
        scrollToSection("addressSection");
        break;
      case "contact":
        setSelectContact(company.contactMethods[index]);
        scrollToSection("contactSection");
        break;
    }
  };
  const handleDelete = (index, type) => {
    Swal.fire({
      title: "¿Estás seguro en eliminarlo?",
      text: "Se perderan todos los datos ingresados",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        switch (type) {
          case "address":
            let addressId = company.address[index].id;
            CompanyService.deleteCompanyAddress(company.id, addressId).then(
              (response) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Dirección eliminada correctamente",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setCompany(response.data);
              }
            );
            break;
          case "contact":
            console.log(company);
            let contactId = company.contactMethods[index].id;
            console.log(contactId);
            CompanyService.deleteCompanyContact(company.id, contactId).then(
              (response) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Contacto eliminado correctamente",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setCompany(response.data);
              }
            );
            break;

          default:
            break;
        }
      }
    });
  };
  // Por volver util
  const getCompanyData = (company) => {
    switch (company.personType) {
      case "F":
        return [
          { title: "ID", description: company.id },
          { title: "Tipo de Persona", description: "Persona Física" },
          { title: "Nombre Completo", description: company.fullName },
          { title: "RFC", description: company.mxRfc },
        ];
      case "M":
        return [
          { title: "ID", description: company.id },
          { title: "Tipo de Persona", description: "Persona Moral" },
          { title: "Razón social", description: company.legalName },
          { title: "Nombre Comercial", description: company.businessName },
          { title: "RFC", description: company.mxRfcCompany },
        ];
      default:
        return [];
    }
  };
  const getContactMethods = (contacts) => {
    return contacts.map((contact) => [
      { title: "Nombre Completo", description: contact.personName },
      { title: "Correo Electrónico", description: contact.email },
      { title: "Número de Teléfono", description: contact.phoneNumber },
      { title: "Tipo de Telefono", description: contact.phoneType.name },
    ]);
  };
  const fetchAddresses = async (addresses) => {
    return await Promise.all(
      addresses.map(async (address) => {
        const neighborhood = await AddressService.getNeighborhood(
          address.statemxId,
          address.townId,
          address.neighborhoodId
        );
        return [
          { title: "Tipo de Domicilio", description: address.addressType.name },
          { title: "Calle", description: address.street },
          { title: "N° Ext.", description: address.number },
          { title: "N° Int.", description: address.apartmentNumber },
          { title: "Colonia", description: neighborhood.data.name },
          { title: "Municipio", description: neighborhood.data.town.name },
          { title: "Estado", description: neighborhood.data.town.state.name },
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
        ];
      })
    );
  };
  const toggleCompanyStatus = async () => {
    let countdown = 5;
    let title = company.enabled ? "Deshabilitar" : "Habilitar";
    let text = company.enabled ? "deshabilitará" : "habilitará";
    let confirm = company.enabled ? "deshabilitado" : "habilitado";

    Swal.fire({
      title: `¿${title} compañia?`,
      text: `Esta acción ${text} el compañia.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Confirmar (${countdown})`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        confirmButton.disabled = true;

        const timerInterval = setInterval(() => {
          countdown -= 1;
          confirmButton.textContent = `Confirmar (${countdown})`;

          if (countdown === 0) {
            clearInterval(timerInterval);
            confirmButton.disabled = false;
            confirmButton.textContent = "Confirmar";
          }
        }, 1000);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        CompanyService.toggleCompanyStatus(id, {
          id: id,
          enabled: !company.enabled,
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: `Compañia ${confirm}`,
            showConfirmButton: false,
            timer: 1500,
          }).then((response) => {
            setCompany(response.data);
          });
        });
      }
    });
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setCompanyData(getCompanyData(company));

        if (company.address && company.address.length > 0) {
          const addresses = await fetchAddresses(company.address);
          setCompanyAddresses(addresses);
        }

        if (company.contactMethods && company.contactMethods.length > 0) {
          setCompanyContacts(getContactMethods(company.contactMethods));
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    if (company) {
      fetchCompanyData();
    }
  }, [company]);

  useEffect(() => {
    if (id) {
      setDataVisible(false);

      CompanyService.getCompany(id).then((response) => {
        setCompany(response.data);
        setFormData({
          ...formData,
          personType: response.data.personType,
        });
      });
    }
  }, [id]);

  useEffect(() => {
    CatalogsService.getPersonType().then((response) =>
      setPersonType(response.data)
    );
  }, []);

  return (
    <>
      <Title
        title={id ? "Editar Compañia" : "Alta de Compañia"}
        withReturnButton
      />
      {company && (
        <ContentCard>
          <Row>
            <Col sm={10}>
              {companyData && <DefinitionList definitions={companyData} />}
            </Col>
            <Col
              sm={2}
              className="d-flex justify-content-center align-items-center"
            >
              <Button
                variant="gd"
                onClick={() => handleEdit(company.id, "", "data")}
              >
                <i className="bi bi-pencil-square" />
              </Button>
            </Col>
          </Row>
          {companyAddresses &&
            companyAddresses.map((list, index) => (
              <>
                <hr />
                <Row>
                  <Col sm={10}>
                    <div key={index}>
                      <h5>Dirección {index + 1}</h5>
                      <DefinitionList definitions={list} />
                    </div>
                  </Col>
                  <Col
                    sm={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Row>
                      <Col
                        sm={12}
                        className="mb-1 d-flex justify-content-center"
                      >
                        <Button
                          variant="gd"
                          onClick={() =>
                            handleEdit(company.id, index, "address")
                          }
                        >
                          <i className="bi bi-pencil-square" />
                        </Button>
                      </Col>

                      <Col
                        sm={12}
                        className="mt-1 d-flex justify-content-center"
                      >
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(index, "address")}
                        >
                          <i className="bi bi-trash-fill" />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            ))}
          {companyContacts &&
            companyContacts.map((list, index) => (
              <>
                <hr />
                <Row>
                  <Col sm={10}>
                    <div key={index}>
                      <h5>Contacto {index + 1}</h5>
                      <DefinitionList definitions={list} />
                    </div>
                  </Col>
                  <Col
                    sm={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Row>
                      <Col
                        sm={12}
                        className="mb-1 d-flex justify-content-center"
                      >
                        <Button
                          variant="gd"
                          onClick={() =>
                            handleEdit(company.id, index, "contact")
                          }
                        >
                          <i className="bi bi-pencil-square" />
                        </Button>
                      </Col>
                      <Col
                        sm={12}
                        className="mt-1 d-flex justify-content-center"
                      >
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(index, "contact")}
                        >
                          <i className="bi bi-trash-fill" />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            ))}
        </ContentCard>
      )}
      {dataVisible && (
        <div id="dataSection">
          <TitleSection text="Datos Generales" isFirst>
            <Form>
              <Row className="mb-3">
                {personType.map((type) => (
                  <Col
                    sm={6}
                    className="d-flex align-items-end"
                    key={type.type}
                  >
                    <Form.Check
                      inline
                      label={type.description}
                      name="personType"
                      type="radio"
                      id={type.type == "F" ? "naturalPerson" : "legalPerson"}
                      value={type.type}
                      checked={formData.personType === type.type}
                      onChange={handleFormChange(formData, setFormData)}
                    />
                  </Col>
                ))}
              </Row>
              {formData.personType == "M" ? (
                <>
                  <Input
                    label="Razón Social"
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
                    <Col sm={12} lg={7}>
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
                    <Col sm={12} lg={7}>
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
              {company ? (
                <Button variant="gd" onClick={handleUpdateData}>
                  Actualizar
                </Button>
              ) : (
                <Button
                  variant="gd"
                  disabled={!formData.personType}
                  onClick={handleSubmitData}
                >
                  Registrar
                </Button>
              )}
            </Form>
          </TitleSection>
        </div>
      )}
      {company && (
        <>
          <AddressSection
            id={company.id}
            formData={selectedAddress}
            setFormData={setCompanyAddresses}
            to="company"
            state={id ? false : true}
          />
          <ContactSection
            id={company.id}
            formData={selectedContact}
            setFormData={setCompanyContacts}
            to="company"
            state={id ? false : true}
          />
          {/* <hr />
            <Stack direction="horizontal" gap={2}>
              <Button variant="gd" className="ms-auto" type="submit">
                Registrar
              </Button>
            </Stack> */}
          {id ? (
            <>
              <hr />
              <div
                className={`mt-2 px-4 py-3 ${
                  company.enabled ? "bg-danger-subtle" : "bg-success-subtle"
                }`}
              >
                <Row className="align-items-center">
                  <Col>
                    <p className="m-0">
                      {company.enabled ? "Compañia Activo" : "Ciente Inactivo"}
                    </p>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant={company.enabled ? "danger" : "success"}
                      onClick={toggleCompanyStatus}
                    >
                      {company.enabled
                        ? "Deshabilitar Compañia"
                        : "Habilitar Compania"}
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default CompanyForm;
