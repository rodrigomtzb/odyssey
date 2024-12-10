import { Button, Col, Form, Row } from "react-bootstrap";
import Input from "./Input";
import TitleSection from "./TitleSection";
import Select from "./Select";
import { useEffect, useState } from "react";
import AddressService from "../../services/address.service";
import { handleFormChange, scrollToTop } from "../../utils";
import SupplierService from "../../services/supplier.service";
import CatalogsService from "../../services/catalogs.service";
import CustomerService from "../../services/customer.service";
import Swal from "sweetalert2";
import ProjectService from "../../services/project.service";

const AddressSection = ({ id, formData, setFormData, to, state }) => {
  const [states, setStates] = useState();
  const [towns, setTowns] = useState();
  const [neighborhoods, setNeighborhoods] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [addressTypes, setAddressTypes] = useState([]);
  const [address, setAddress] = useState({
    street: "",
    number: "",
    apartmentNumber: "",
    zipCode: "",
    neighborhoodId: "",
    townId: "",
    statemxId: "",
    firstStreet: "",
    secondStreet: "",
    description: "",
    latitude: "",
    longitude: "",
    addressTypeId: "",
  });

  const handleNeighborhoodChange = (e) => {
    const selectedNeighborhoodId = e.target.value;
    const selectedNeighborhood = neighborhoods.find(
      (neigh) => neigh.id == selectedNeighborhoodId
    );

    if (selectedNeighborhood) {
      setAddress({
        ...address,
        neighborhoodId: selectedNeighborhood.id,
        townId: selectedNeighborhood.town.id,
        statemxId: selectedNeighborhood.town.state.id,
      });
      setTowns([selectedNeighborhood.town]);
      setStates([selectedNeighborhood.town.state]);
    } else {
      setTowns([]);
      setStates([]);
    }
  };
  const endActions = (response) => {
    setIsOpen(false);
    setAddress({
      street: "",
      number: "",
      apartmentNumber: "",
      zipCode: "",
      neighborhoodId: "",
      townId: "",
      statemxId: "",
      firstStreet: "",
      secondStreet: "",
      description: "",
      latitude: "",
      longitude: "",
      addressTypeId: "",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Dirección editada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    scrollToTop();
    setFormData(response.data);
  };
  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    if (formData) {
      try {
        switch (to) {
          case "supplier":
            console.log(address);
            SupplierService.editSupplierAddress(id, address).then(
              (response) => {
                endActions(response);
              }
            );
            break;
          case "customer":
            CustomerService.editCustomerAddress(id, address).then(
              (response) => {
                endActions(response);
              }
            );
            break;
          case "project":
            ProjectService.editProjectAddress(id, address).then((response) => {
              endActions(response);
            });
            break;
          default:
            break;
        }
      } catch (error) {}
    } else {
      try {
        switch (to) {
          case "supplier":
            SupplierService.addAddress(id, address).then((response) => {
              scrollToTop();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Dirección añadida correctamente",
                showConfirmButton: false,
                timer: 1500,
              });
              setFormData(response.data);
              setAddress({
                street: "",
                number: "",
                apartmentNumber: "",
                zipCode: "",
                neighborhoodId: "",
                townId: "",
                statemxId: "",
                firstStreet: "",
                secondStreet: "",
                description: "",
                latitude: "",
                longitude: "",
                addressTypeId: "",
              });
              setIsOpen(false);
            });
            break;
          case "customer":
            CustomerService.addAddress(id, address).then((response) => {
              scrollToTop();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Dirección añadida correctamente",
                showConfirmButton: false,
                timer: 1500,
              });
              setFormData(response.data);
              setAddress({
                street: "",
                number: "",
                apartmentNumber: "",
                zipCode: "",
                neighborhoodId: "",
                townId: "",
                statemxId: "",
                firstStreet: "",
                secondStreet: "",
                description: "",
                latitude: "",
                longitude: "",
                addressTypeId: "",
              });
              setIsOpen(false);
            });
            break;
          case "project":
            ProjectService.addAddress(id, address).then(() => {
              scrollToTop();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Dirección añadida correctamente",
                showConfirmButton: false,
                timer: 1500,
              });
              setAddress({
                street: "",
                number: "",
                apartmentNumber: "",
                zipCode: "",
                neighborhoodId: "",
                townId: "",
                statemxId: "",
                firstStreet: "",
                secondStreet: "",
                description: "",
                latitude: "",
                longitude: "",
                addressTypeId: "",
              });
              setIsOpen(false);
              ProjectService.getProject(id).then((response) => {
                setFormData(response.data);
              });
            });
            break;
          default:
            break;
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (address.zipCode && address.zipCode.length === 5) {
      AddressService.getNeighborhoodsByZipCode(address.zipCode).then(
        (response) => {
          if (response.data && response.data.length > 0) {
            setNeighborhoods(response.data);
          }
        }
      );
    } else {
      setNeighborhoods();
      setTowns();
      setStates();
      setAddress({
        ...address,
        neighborhoodId: "",
        townId: "",
        statemxId: "",
      });
    }
  }, [address.zipCode]);

  useEffect(() => {
    if (formData) {
      setIsOpen(true);
      setAddress({
        ...formData,
        addressTypeId: formData.addressType.id,
        addressId: formData.id,
      });
    }
  }, [formData]);

  useEffect(() => {
    setIsOpen(state);
  }, [state]);

  useEffect(() => {
    CatalogsService.getAddressType().then((response) =>
      setAddressTypes(response.data)
    );
  }, []);

  return (
    <div id="addressSection">
      <TitleSection text="Domicilio" state={isOpen}>
        <Form>
          <Row>
            <Col sm={6}>
              <Select
                label="Tipo de Domicilio"
                name="addressTypeId"
                value={address.addressTypeId}
                options={addressTypes}
                onChange={handleFormChange(address, setAddress)}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={6}>
              <Input
                label="Calle"
                placeholder="Jabillos"
                name="street"
                value={address.street}
                onChange={handleFormChange(address, setAddress)}
              />
            </Col>
            <Col sm={6} lg={3}>
              <Input
                label="N° Ext"
                placeholder="182"
                name="number"
                value={address.number}
                onChange={handleFormChange(address, setAddress)}
              />
            </Col>
            <Col sm={6} lg={3}>
              <Input
                label="N° Int"
                placeholder="Depto 201"
                name="apartmentNumber"
                value={address.apartmentNumber}
                onChange={handleFormChange(address, setAddress)}
              />
            </Col>
            <Col sm={12} lg={6}>
              <Input
                label="Código Postal"
                name="zipCode"
                placeholder="57820"
                max={5}
                value={address.zipCode}
                regexType="only-numbers"
                onChange={handleFormChange(address, setAddress)}
              />
            </Col>
            <Col sm={12} lg={6}>
              <Select
                label="Colonia"
                name="neighborhoodId"
                defaultOption={
                  neighborhoods
                    ? "Selecciona una colonia"
                    : "Selecciona un codigo postal"
                }
                options={neighborhoods}
                value={address.neighborhoodId}
                onChange={handleNeighborhoodChange}
              />
            </Col>
            <Col sm={12} lg={6}>
              <Select
                label="Municipio"
                name="townId"
                defaultOption={
                  neighborhoods
                    ? "Selecciona una colonia"
                    : "Selecciona un codigo postal"
                }
                options={towns}
                value={address.townId}
                onChange={handleFormChange(address, setAddress)}
                disabled
              />
            </Col>
            <Col sm={12} lg={6}>
              <Select
                label="Estado"
                name="statemxId"
                defaultOption={
                  neighborhoods
                    ? "Selecciona una colonia"
                    : "Selecciona un codigo postal"
                }
                options={states}
                value={address.statemxId}
                onChange={handleFormChange(address, setAddress)}
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={6}>
              <Input
                label="Primer Calle Referencia"
                placeholder="Entre calle"
                name="firstStreet"
                value={address.firstStreet}
                onChange={handleFormChange(address, setAddress)}
              />
            </Col>
            <Col sm={12} lg={6}>
              <Input
                label="Segunda Calle Referencia"
                placeholder="Y calle"
                name="secondStreet"
                value={address.secondStreet}
                onChange={handleFormChange(address, setAddress)}
              />
            </Col>
          </Row>
          <Input
            label="Referencia"
            placeholder="Saguan negro"
            name="description"
            value={address.description}
            onChange={handleFormChange(address, setAddress)}
          />
          <Button variant="gd" onClick={handleSubmitAddress}>
            {formData ? "Actualizar" : "Añadir"}
          </Button>
        </Form>
      </TitleSection>
    </div>
  );
};

export default AddressSection;
