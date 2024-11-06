import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import {
  AddressSection,
  Input,
  Select,
  TitleSection,
  TagInput,
  ContactSection,
} from "../../../components/Form";
import { DefinitionList, Title, ContentCard } from "../../../components";
import { handleFormChange } from "../../../utils";
import SupplierService from "../../../services/supplier.service";
import AddressService from "../../../services/address.service";
import CatalogsService from "../../../services/catalogs.service";

const ProviderForm = () => {
  const { id } = useParams();
  const [personType, setPersonType] = useState([]);
  const [dataVisible, setDataVisible] = useState(true);
  const [supplier, setSupplier] = useState();
  const [selectedAddress, setSelectAddress] = useState();
  const [selectedContact, setSelectContact] = useState();
  const [supplierData, setSupplierData] = useState();
  const [supplierAddresses, setSupplierAddresses] = useState();
  const [supplierContacts, setSupplierContacts] = useState();

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
      SupplierService.editSupplierData(supplier.id, {
        personType: formData.personType,
        ...legalPerson,
        ...naturalPerson,
      });
    } catch (error) {}
  };
  const handleEdit = (id, index, type) => {
    switch (type) {
      case "data":
        setDataVisible(true);
        if (supplier.personType === "F") {
          setNatualPerson({
            id: id,
            fullName: supplier.fullName,
            mxRfc: supplier.mxRfc,
          });
        } else if (supplier.personType === "M") {
          setLegalPerson({
            id: id,
            legalName: supplier.legalName,
            businessName: supplier.businessName,
            mxRfcCompany: supplier.mxRfcCompany,
          });
        }
        break;
      case "address":
        setSelectAddress(supplier.address[index]);
        break;
      default:
        setSelectContact(supplier.contactMethods[index]);
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
            let addressId = supplier.address[index].id;
            SupplierService.deleteSupplierAddress(supplier.id, addressId).then(
              (response) => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Direccion eliminada",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setSupplier(response.data);
              }
            );
            break;
          case "contact":
            let contactId = supplier.contact[index].id;
            SupplierService.deleteSupplierContact(supplier.id, contactId).then(
              (response) => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Contacto eliminado",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setSupplier(response.data);
              }
            );
            break;

          default:
            break;
        }
      }
    });
  };
  const getSupplierData = (supplier) => {
    switch (supplier.personType) {
      case "F":
        return [
          { title: "Tipo de Persona", description: "Persona Fisica" },
          { title: "Nombre Completo", description: supplier.fullName },
          { title: "RFC", description: supplier.mxRfc },
        ];
      case "M":
        return [
          { title: "Tipo de Persona", description: "Persona Moral" },
          { title: "Razon social", description: supplier.legalName },
          { title: "Nombre Comercial", description: supplier.businessName },
          { title: "RFC", description: supplier.mxRfcCompany },
        ];
      default:
        return [];
    }
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
  const getContactMethods = (contacts) => {
    return contacts.map((contact) => [
      { title: "Nombre Completo", description: contact.personName },
      { title: "Correo Electrónico", description: contact.email },
      { title: "Número de Teléfono", description: contact.phoneNumber },
      { title: "Tipo de Telefono", description: contact.phoneType.name },
    ]);
  };

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        setSupplierData(getSupplierData(supplier));

        if (supplier.address && supplier.address.length > 0) {
          const addresses = await fetchAddresses(supplier.address);
          setSupplierAddresses(addresses);
        }

        if (supplier.contactMethods && supplier.contactMethods.length > 0) {
          setSupplierContacts(getContactMethods(supplier.contactMethods));
        }
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };
    if (supplier) {
      fetchSupplierData();
    }
  }, [supplier]);

  useEffect(() => {
    if (id) {
      setDataVisible(false);

      SupplierService.getSupplier(id).then((response) => {
        setSupplier(response.data);
        console.log(response.data);
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
        title={id ? "Editar Proveedor" : "Alta de Proveedor"}
        withReturnButton
      />
      {supplier && (
        <ContentCard>
          <Row>
            <Col sm={10}>
              {supplierData && <DefinitionList definitions={supplierData} />}
            </Col>
            <Col
              sm={2}
              className="d-flex justify-content-center align-items-center"
            >
              <Button
                variant="gd"
                onClick={() => handleEdit(supplier.id, "", "data")}
              >
                <i className="bi bi-pencil-square" />
              </Button>
            </Col>
          </Row>
          {supplierAddresses &&
            supplierAddresses.map((list, index) => (
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
                            handleEdit(supplier.id, index, "address")
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
          {supplierContacts &&
            supplierContacts.map((list, index) => (
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
                            handleEdit(supplier.id, index, "contact")
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
        <>
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
              {supplier ? (
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
        </>
      )}
      {supplier && (
        <>
          <AddressSection
            id={supplier.id}
            formData={selectedAddress}
            setFormData={setSupplier}
            to="supplier"
          />
          <ContactSection
            id={supplier.id}
            formData={selectedContact}
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
      )}
    </>
  );
};

export default ProviderForm;
