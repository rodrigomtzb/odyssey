import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SucursalService from "../../../services/sucursal.service";
import ContentCard from "../../../components/ContentCard";
import { DefinitionList, Title } from "../../../components";
import { Button, Col, Row } from "react-bootstrap";
import AddressService from "../../../services/address.service";

const SucursalDetails = () => {
  const { id } = useParams();
  const [sucursalData, setSucursalData] = useState([]);
  const [sucursalAddresses, setSucursalAddresses] = useState([]);
  const [sucursalContacts, setSucursalContacts] = useState([]);

  useEffect(() => {
    const fetchSucursalData = async () => {
      try {
        const response = await SucursalService.getSucursal(id);
        const sucursal = response.data;

        setSucursalData(getSucursalData(sucursal));

        if (sucursal.address && sucursal.address.length > 0) {
          const addresses = await fetchAddresses(sucursal.address);
          setSucursalAddresses(addresses);
        }

        if (sucursal.contactMethods && sucursal.contactMethods.length > 0) {
          setSucursalContacts(getContactMethods(sucursal.contactMethods));
        }
      } catch (error) {
        console.error("Error fetching sucursal data:", error);
      }
    };

    fetchSucursalData();
  }, [id]);

  const getSucursalData = (sucursal) => {
    return [
        { title: "ID", description: sucursal.id },
        { title: "CompañiaID", description: sucursal.company.id },
        { title: "Nombre", description: sucursal.name },
      ];
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
      { title: "ID", description: contact.id },
      { title: "Nombre Completo", description: contact.personName },
      { title: "Correo Electrónico", description: contact.email },
      { title: "Número de Teléfono", description: contact.phoneNumber },
      { title: "Tipo de Telefono", description: contact.phoneType.name },
    ]);
  };

  return (
    <>
      <Title title="Datos de la Compañia" withReturnButton />
      <ContentCard>
        {sucursalData.length > 0 && (
          <DefinitionList definitions={sucursalData} />
        )}
        {sucursalAddresses.length > 0 &&
          sucursalAddresses.map((list, index) => (
            <div key={index}>
              <hr />
              <h5>Dirección {index + 1}</h5>
              <DefinitionList definitions={list} index={index} />
            </div>
          ))}
        {sucursalContacts.length > 0 &&
          sucursalContacts.map((list, index) => (
            <div key={index}>
              <hr />
              <h5>Contacto {index + 1}</h5>
              <DefinitionList definitions={list} index={index} />
            </div>
          ))}
      </ContentCard>
      <Row>
        <Col>
          <Link to="edit">
            <Button variant="gd">Editar Información</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default SucursalDetails;
