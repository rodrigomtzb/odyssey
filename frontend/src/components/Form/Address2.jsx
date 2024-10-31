import { Col, Row } from "react-bootstrap";
import Input from "./Input";
import TitleSection from "./TitleSection";
import Select from "./Select";
import { useEffect, useState } from "react";
import AddressService from "../../services/address.service";
import { handleFormChange } from "../../utils";

const AddressSection2 = ({ withoutTitle }) => {
  const [states, setStates] = useState();
  const [towns, setTowns] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [address, setAddress] = useState({
    street: "",
    intNum: "",
    outNum: "",
    zipcode: "",
    neighborhood: "",
    town: "",
    state: "",
  });

  useEffect(() => {
    AddressService.getStates().then((response) => {
      setStates(response.data);
    });
  }, []);

  useEffect(() => {
    if (address.state) {
      AddressService.getTownsByState(address.state).then((response) => {
        setTowns(response.data);
      });
    } else {
      setTowns("");
    }
  }, [address.state]);

  useEffect(() => {
    if (address.town && address.state) {
      AddressService.getNeighborhoodsByTownAndState(
        address.state,
        address.town
      ).then((response) => {
        setNeighborhood(response.data);
      });
    } else {
      setNeighborhood("");
    }
  }, [address.town, address.state]);

  useEffect(() => {
    if (address.town && address.state && address.neighborhood) {
      AddressService.getNeighborhood(
        address.state,
        address.town,
        address.neighborhood
      ).then((response) => {
        console.log(response.data);
        let zipcode = response.data.zipCode;
        if (zipcode.length == 5) {
          setAddress({
            ...address,
            zipcode: zipcode,
          });
        } else {
          setAddress({
            ...address,
            zipcode: "0" + zipcode,
          });
        }
      });
    } else {
      setAddress({
        ...address,
        zipcode: "",
      });
    }
  }, [address.town, address.state, address.neighborhood]);

  return (
    <>
      {!withoutTitle && <TitleSection text="Domicilio" />}
      <Row>
        <Col sm={12} md={6}>
          <Input label="Calle" placeholder="Jabillos" />
        </Col>
        <Col sm={6} md={3}>
          <Input label="N° Ext" placeholder="182" />
        </Col>
        <Col sm={6} md={3}>
          <Input label="N° Int" placeholder="Depto 201" />
        </Col>
        <Col sm={12} md={6}>
          <Select
            label="Estado"
            name="state"
            defaultOption="Selecciona un estado"
            options={states}
            value={address.state}
            onChange={handleFormChange(address, setAddress)}
          />
        </Col>
        <Col sm={12} md={6}>
          <Select
            label="Municipio"
            name="town"
            defaultOption="Selecciona un codigo postal"
            options={towns}
            value={address.town}
            onChange={handleFormChange(address, setAddress)}
          />
        </Col>
        <Col sm={12} md={6}>
          <Select
            label="Colonia"
            name="neighborhood"
            defaultOption="Selecciona un codigo postal"
            options={neighborhood}
            value={address.neighborhood}
            onChange={handleFormChange(address, setAddress)}
          />
        </Col>
        <Col sm={12} md={6}>
          <Input
            label="Código Postal"
            name="zipcode"
            placeholder="57820"
            value={address.zipcode}
            onChange={handleFormChange(address, setAddress)}
          />
        </Col>
      </Row>
    </>
  );
};

export default AddressSection2;
