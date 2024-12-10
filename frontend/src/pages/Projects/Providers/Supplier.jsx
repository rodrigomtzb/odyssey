import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SupplierService from "../../../services/supplier.service";
import ContentCard from "../../../components/ContentCard";
import { DefinitionList, Title } from "../../../components";
import { Button, Col, Row } from "react-bootstrap";
import AddressService from "../../../services/address.service";

const SupplierDetails = () => {
  const { id } = useParams();
  const [supplierData, setSupplierData] = useState([]);
  const [supplierAccounts, setSupplierAccounts] = useState([]);
  const [supplierAddresses, setSupplierAddresses] = useState([]);
  const [supplierContacts, setSupplierContacts] = useState([]);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await SupplierService.getSupplier(id);
        const supplier = response.data;

        setSupplierData(getSupplierData(supplier));

        if (supplier.address && supplier.address.length > 0) {
          const addresses = await fetchAddresses(supplier.address);
          setSupplierAddresses(addresses);
        }

        if (supplier.contactMethods && supplier.contactMethods.length > 0) {
          setSupplierContacts(getContactMethods(supplier.contactMethods));
        }
        if (supplier.bankAccounts && supplier.bankAccounts.length > 0) {
          setSupplierAccounts(getBankAccounts(supplier.bankAccounts));
        }
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };

    fetchSupplierData();
  }, [id]);

  const getSupplierData = (supplier) => {
    switch (supplier.personType) {
      case "F":
        return [
          { title: "ID", description: supplier.id },
          { title: "Tipo de Persona", description: "Persona Fisica" },
          { title: "Nombre Completo", description: supplier.fullName },
          { title: "RFC", description: supplier.mxRfc },
        ];
      case "M":
        return [
          { title: "ID", description: supplier.id },
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
  const getBankAccounts = (accounts) => {
    return accounts.map((account) => [
      { title: "ID", description: account.id },
      { title: account.accountType.name, description: account.account },
      { title: "Banco", description: account.bank.name },
      { title: "Descipción", description: account.description },
    ]);
  };

  return (
    <>
      <Title title="Datos de Proveedor" withReturnButton />
      <ContentCard>
        {supplierData.length > 0 && (
          <DefinitionList definitions={supplierData} />
        )}
        {supplierAddresses.length > 0 &&
          supplierAddresses.map((list, index) => (
            <div key={index}>
              <hr />
              <h5>Dirección {index + 1}</h5>
              <DefinitionList definitions={list} index={index} />
            </div>
          ))}
        {supplierContacts.length > 0 &&
          supplierContacts.map((list, index) => (
            <div key={index}>
              <hr />
              <h5>Contacto {index + 1}</h5>
              <DefinitionList definitions={list} index={index} />
            </div>
          ))}
        {supplierAccounts.length > 0 &&
          supplierAccounts.map((list, index) => (
            <div key={index}>
              <hr />
              <h5>Dato Bancario {index + 1}</h5>
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

export default SupplierDetails;
