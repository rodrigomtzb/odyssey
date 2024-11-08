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
import CustomerService from "../../../services/customer.service";
import AddressService from "../../../services/address.service";
import CatalogsService from "../../../services/catalogs.service";

const CustomerForm = () => {
  const { id } = useParams();
  const [personType, setPersonType] = useState([]);
  const [dataVisible, setDataVisible] = useState(true);
  const [customer, setCustomer] = useState();
  const [selectedAddress, setSelectAddress] = useState();
  const [selectedContact, setSelectContact] = useState();
  const [customerData, setCustomerData] = useState();
  const [customerAddresses, setCustomerAddresses] = useState();
  const [customerContacts, setCustomerContacts] = useState();

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
      title: "¿Estás seguro de la información del cliente?",
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
          CustomerService.createCustomer(data).then((response) => {
            scrollToTop();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Datos registrados correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
            setCustomer(response.data);
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
          console.error("Error al registrar proveedor: ", error);
        }
      }
    });
  };
  const handleUpdateData = async () => {
    try {
      CustomerService.editCustomerData(customer.id, {
        personType: formData.personType,
        ...legalPerson,
        ...naturalPerson,
      }).then((response) => {
        setCustomer(response.data);
        scrollToTop();
        Swal.fire({
          position: "top-end",
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
          personType: customer.personType,
        });
        setDataVisible(true);
        if (customer.personType === "F") {
          setNatualPerson({
            id: id,
            fullName: customer.fullName,
            mxRfc: customer.mxRfc,
          });
        } else if (customer.personType === "M") {
          setLegalPerson({
            id: id,
            legalName: customer.legalName,
            businessName: customer.businessName,
            mxRfcCompany: customer.mxRfcCompany,
          });
        }
        scrollToSection("dataSection");
        break;
      case "address":
        setSelectAddress(customer.address[index]);
        scrollToSection("addressSection");
        break;
      case "contact":
        setSelectContact(customer.contactMethods[index]);
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
            let addressId = customer.address[index].id;
            CustomerService.deleteCustomerAddress(customer.id, addressId).then(
              (response) => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Direccion eliminada",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setCustomer(response.data);
              }
            );
            break;
          case "contact":
            console.log(customer);
            let contactId = customer.contactMethods[index].id;
            console.log(contactId);
            CustomerService.deleteCustomerContact(customer.id, contactId).then(
              (response) => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Contacto eliminado",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setCustomer(response.data);
              }
            );
            break;

          default:
            break;
        }
      }
    });
  };
  const getCustomerData = (customer) => {
    switch (customer.personType) {
      case "F":
        return [
          { title: "ID", description: customer.id },
          { title: "Tipo de Persona", description: "Persona Fisica" },
          { title: "Nombre Completo", description: customer.fullName },
          { title: "RFC", description: customer.mxRfc },
        ];
      case "M":
        return [
          { title: "ID", description: customer.id },
          { title: "Tipo de Persona", description: "Persona Moral" },
          { title: "Razon social", description: customer.legalName },
          { title: "Nombre Comercial", description: customer.businessName },
          { title: "RFC", description: customer.mxRfcCompany },
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
  const toggleCustomerStatus = async () => {
    let countdown = 5;
    let title = customer.enabled ? "Deshabilitar" : "Habilitar";
    let text = customer.enabled ? "deshabilitará" : "habilitará";
    let confirm = customer.enabled ? "deshabilitado" : "habilitado";

    Swal.fire({
      title: `¿${title} cliente?`,
      text: `Esta acción ${text} el cliente.`,
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
        CustomerService.toggleCustomerStatus(id, {
          id: id,
          enabled: !customer.enabled,
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: `Cliente ${confirm}`,
            showConfirmButton: false,
            timer: 1500,
          }).then((response) => {
            setCustomer(response.data);
          });
        });
      }
    });
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setCustomerData(getCustomerData(customer));

        if (customer.address && customer.address.length > 0) {
          const addresses = await fetchAddresses(customer.address);
          setCustomerAddresses(addresses);
        }

        if (customer.contactMethods && customer.contactMethods.length > 0) {
          setCustomerContacts(getContactMethods(customer.contactMethods));
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    if (customer) {
      fetchCustomerData();
    }
  }, [customer]);

  useEffect(() => {
    if (id) {
      setDataVisible(false);

      CustomerService.getCustomer(id).then((response) => {
        setCustomer(response.data);
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
        title={id ? "Editar Cliente" : "Alta de Cliente"}
        withReturnButton
      />
      {customer && (
        <ContentCard>
          <Row>
            <Col sm={10}>
              {customerData && <DefinitionList definitions={customerData} />}
            </Col>
            <Col
              sm={2}
              className="d-flex justify-content-center align-items-center"
            >
              <Button
                variant="gd"
                onClick={() => handleEdit(customer.id, "", "data")}
              >
                <i className="bi bi-pencil-square" />
              </Button>
            </Col>
          </Row>
          {customerAddresses &&
            customerAddresses.map((list, index) => (
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
                            handleEdit(customer.id, index, "address")
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
          {customerContacts &&
            customerContacts.map((list, index) => (
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
                            handleEdit(customer.id, index, "contact")
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
              {customer ? (
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
      {customer && (
        <>
          <AddressSection
            id={customer.id}
            formData={selectedAddress}
            setFormData={setCustomer}
            to="customer"
            state={id ? false : true}
          />
          <ContactSection
            id={customer.id}
            formData={selectedContact}
            setFormData={setCustomer}
            to="customer"
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
                  customer.enabled ? "bg-danger-subtle" : "bg-success-subtle"
                }`}
              >
                <Row className="align-items-center">
                  <Col>
                    <p className="m-0">
                      {customer.enabled ? "Cliente Activo" : "Ciente Inactivo"}
                    </p>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant={customer.enabled ? "danger" : "success"}
                      onClick={toggleCustomerStatus}
                    >
                      {customer.enabled
                        ? "Deshabilitar Cliente"
                        : "Habilitar Cliente"}
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

export default CustomerForm;
