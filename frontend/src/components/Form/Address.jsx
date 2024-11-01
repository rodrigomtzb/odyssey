import { Button, Col, Row } from "react-bootstrap";
import Input from "./Input";
import TitleSection from "./TitleSection";
import Select from "./Select";
import { useEffect, useState } from "react";
import AddressService from "../../services/address.service";
import { handleFormChange } from "../../utils";

const AddressSection = ({ withoutTitle, formData, setFormData }) => {
  const [states, setStates] = useState();
  const [towns, setTowns] = useState();
  const [neighborhoods, setNeighborhoods] = useState();
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
    if (address.zipcode && address.zipcode.length === 5) {
      AddressService.getNeighborhoodsByZipCode(address.zipcode).then(
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
        neighborhood: "",
        town: "",
        state: "",
      });
    }
  }, [address.zipcode]);

  const handleNeighborhoodChange = (e) => {
    const selectedNeighborhoodId = e.target.value;
    const selectedNeighborhood = neighborhoods.find(
      (neigh) => neigh.id == selectedNeighborhoodId
    );

    if (selectedNeighborhood) {
      setAddress({
        ...address,
        neighborhood: selectedNeighborhood.id,
        town: selectedNeighborhood.town.id,
        state: selectedNeighborhood.town.state.id,
      });
      setTowns([selectedNeighborhood.town]);
      setStates([selectedNeighborhood.town.state]);
    } else {
      setTowns([]);
      setStates([]);
    }
  };

  return (
    <TitleSection text="Domicilio">
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
          <Input
            label="Código Postal"
            name="zipcode"
            placeholder="57820"
            max={5}
            value={address.zipcode}
            onChange={handleFormChange(address, setAddress)}
          />
        </Col>
        <Col sm={12} md={6}>
          <Select
            label="Colonia"
            name="neighborhood"
            defaultOption={
              neighborhoods
                ? "Selecciona una colonia"
                : "Selecciona un codigo postal"
            }
            options={neighborhoods}
            value={address.neighborhood}
            onChange={handleNeighborhoodChange}
          />
        </Col>
        <Col sm={12} md={6}>
          <Select
            label="Municipio"
            name="town"
            defaultOption={
              neighborhoods
                ? "Selecciona una colonia"
                : "Selecciona un codigo postal"
            }
            options={towns}
            value={address.town}
            onChange={handleFormChange(address, setAddress)}
            disabled
          />
        </Col>
        <Col sm={12} md={6}>
          <Select
            label="Estado"
            name="state"
            defaultOption={
              neighborhoods
                ? "Selecciona una colonia"
                : "Selecciona un codigo postal"
            }
            options={states}
            value={address.state}
            onChange={handleFormChange(address, setAddress)}
            disabled
          />
        </Col>
      </Row>
      <Button
        variant="gd"
        // type="submit"
      >
        Registrar
      </Button>
    </TitleSection>
  );
};

export default AddressSection;
