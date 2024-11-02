import { Button, Col, Form, Row } from "react-bootstrap";
import Input from "./Input";
import TitleSection from "./TitleSection";
import Select from "./Select";
import { useEffect, useState } from "react";
import AddressService from "../../services/address.service";
import { handleFormChange } from "../../utils";
import SupplierService from "../../services/supplier.service";
import CatalogsService from "../../services/catalogs.service";

const AddressSection = ({ id, setFormData, to }) => {
  const [states, setStates] = useState();
  const [towns, setTowns] = useState();
  const [neighborhoods, setNeighborhoods] = useState();
  const [addressTypes, setAddressTypes] = useState([
    {
      id: 1,
      name: "Hogar",
    },
    {
      id: 2,
      name: "Oficina",
    },
    {
      id: 3,
      name: "Fiscal",
    },
    {
      id: 4,
      name: "Negocio",
    },
  ]);
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
  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    try {
      switch (to) {
        case "supplier":
          console.log(address);
          SupplierService.addAddress(id, address).then((response) => {
            console.log(response.data);
            setFormData(response.data);
          });
          break;

        default:
          break;
      }
    } catch (error) {}
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
  // useEffect(() => {
  //   CatalogsService.getAddressType().then((response) =>
  //     setAddressTypes(response.data)
  //   );
  // }, []);

  return (
    <TitleSection text="Domicilio">
      <Form>
        <Row>
          <Col sm={12} md={6}>
            <Input
              label="Calle"
              placeholder="Jabillos"
              name="street"
              value={address.street}
              onChange={handleFormChange(address, setAddress)}
            />
          </Col>
          <Col sm={6} md={3}>
            <Input
              label="N° Ext"
              placeholder="182"
              name="number"
              value={address.number}
              onChange={handleFormChange(address, setAddress)}
            />
          </Col>
          <Col sm={6} md={3}>
            <Input
              label="N° Int"
              placeholder="Depto 201"
              name="apartmentNumber"
              value={address.apartmentNumber}
              onChange={handleFormChange(address, setAddress)}
            />
          </Col>
          <Col sm={12} md={6}>
            <Input
              label="Código Postal"
              name="zipCode"
              placeholder="57820"
              max={5}
              value={address.zipCode}
              onChange={handleFormChange(address, setAddress)}
            />
          </Col>
          <Col sm={12} md={6}>
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
          <Col sm={12} md={6}>
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
          <Col sm={12} md={6}>
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
          <Col sm={12} md={6}>
            <Input
              label="Primer Calle Referencia"
              placeholder=""
              name="firstStreet"
              value={address.firstStreet}
              onChange={handleFormChange(address, setAddress)}
            />
          </Col>
          <Col sm={12} md={6}>
            <Input
              label="Segunda Calle Referencia"
              placeholder=""
              name="secondStreet"
              value={address.secondStreet}
              onChange={handleFormChange(address, setAddress)}
            />
          </Col>
        </Row>
        <Input
          label="Referencia"
          placeholder=""
          name="description"
          value={address.description}
          onChange={handleFormChange(address, setAddress)}
        />
        <Row>
          <Col sm={4}>
            <Select
              label="Tipo de Domicilio"
              name="addressTypeId"
              value={address.addressTypeId}
              options={addressTypes}
              onChange={handleFormChange(address, setAddress)}
            />
          </Col>
        </Row>
        <Button variant="gd" type="submit" onClick={handleSubmitAddress}>
          Registrar
        </Button>
      </Form>
    </TitleSection>
  );
};

export default AddressSection;
