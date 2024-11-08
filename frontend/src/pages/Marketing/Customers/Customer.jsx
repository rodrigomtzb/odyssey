import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CustomerService from "../../../services/customer.service";
import ContentCard from "../../../components/ContentCard";
import { DefinitionList, Title } from "../../../components";
import { Button, Col, Row } from "react-bootstrap";
import AddressService from "../../../services/address.service";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState([]);
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [customerContacts, setCustomerContacts] = useState([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await CustomerService.getCustomer(id);
        const customer = response.data;

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

    fetchCustomerData();
  }, [id]);

  const getCustomerData = (customer) => {
    switch (customer.personType) {
      case "F":
        return [
          { title: "Tipo de Persona", description: "Persona Fisica" },
          { title: "Nombre Completo", description: customer.fullName },
          { title: "RFC", description: customer.mxRfc },
        ];
      case "M":
        return [
          { title: "Tipo de Persona", description: "Persona Moral" },
          { title: "Razon social", description: customer.legalName },
          { title: "Nombre Comercial", description: customer.businessName },
          { title: "RFC", description: customer.mxRfcCompany },
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

  return (
    <>
      <Title title="Datos de Customer" withReturnButton />
      <ContentCard>
        {customerData.length > 0 && (
          <DefinitionList definitions={customerData} />
        )}
        {customerAddresses.length > 0 &&
          customerAddresses.map((list, index) => (
            <div key={index}>
              <hr />
              <h5>Dirección {index + 1}</h5>
              <DefinitionList definitions={list} index={index} />
            </div>
          ))}
        {customerContacts.length > 0 &&
          customerContacts.map((list, index) => (
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

export default CustomerDetails;
