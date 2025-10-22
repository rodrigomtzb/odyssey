import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CompanyService from "../../../services/company.service";
import ContentCard from "../../../components/ContentCard";
import { DefinitionList, Title } from "../../../components";
import { Button, Col, Row } from "react-bootstrap";
import AddressService from "../../../services/address.service";

const CompanyDetails = () => {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState([]);
  const [companyAddresses, setCompanyAddresses] = useState([]);
  const [companyContacts, setCompanyContacts] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await CompanyService.getCompany(id);
        const company = response.data;

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

    fetchCompanyData();
  }, [id]);

  const getCompanyData = (company) => {
    switch (company.personType) {
      case "F":
        return [
          { title: "Tipo de Persona", description: "Persona Fisica" },
          { title: "Nombre Completo", description: company.fullName },
          { title: "RFC", description: company.mxRfc },
        ];
      case "M":
        return [
          { title: "Tipo de Persona", description: "Persona Moral" },
          { title: "Razon social", description: company.legalName },
          { title: "Nombre Comercial", description: company.businessName },
          { title: "RFC", description: company.mxRfcCompany },
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
        {companyData.length > 0 && (
          <DefinitionList definitions={companyData} />
        )}
        {companyAddresses.length > 0 &&
          companyAddresses.map((list, index) => (
            <div key={index}>
              <hr />
              <h5>Dirección {index + 1}</h5>
              <DefinitionList definitions={list} index={index} />
            </div>
          ))}
        {companyContacts.length > 0 &&
          companyContacts.map((list, index) => (
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

export default CompanyDetails;
