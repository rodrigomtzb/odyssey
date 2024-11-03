import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SupplierService from "../../../services/supplier.service";
import ContentCard from "../../../components/ContentCard";
import { DefinitionList, Title } from "../../../components";

const SupplierDetails = () => {
  const { id } = useParams();
  const [supplierData, setSupplierData] = useState();
  const [supplierAddresses, setSupplierAddresses] = useState();
  const [supplierContacts, setSupplierContacts] = useState();

  useEffect(() => {
    SupplierService.getSupplier(id).then((response) => {
      const supplier = response.data;
      switch (supplier.personType) {
        case "F":
          setSupplierData([
            {
              title: "Nombre Completo",
              description: supplier.fullName,
            },
            {
              title: "RFC",
              description: supplier.mxRfc,
            },
          ]);
          break;
        case "M":
          setSupplierData([
            {
              title: "Razon social",
              description: supplier.legalName,
            },
            {
              title: "Nombre Comercial",
              description: supplier.businessName,
            },
            {
              title: "RFC",
              description: supplier.mxRfcCompany,
            },
          ]);
          break;
        default:
          setSupplierData([]);
          break;
      }
      if (supplier.address && supplier.address.length > 0) {
        let addresses = supplier.address;
        const addressList = addresses.map((address) => [
          { title: "Calle", description: address.street },
          { title: "N° Ext.", description: address.number },
          { title: "N° Int.", description: address.apartmentNumber },
          { title: "Colonia", description: address.neighborhoodId },
          { title: "Municipio", description: address.townId },
          { title: "Estado", description: address.statemxId },
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
        ]);
        setSupplierAddresses(addressList);
      }
      if (supplier.contactMethods && supplier.contactMethods.length > 0) {
        let contacts = supplier.contactMethods;
        const contactList = contacts.map((contact) => [
          { title: "Nombre Completo", description: contact.personName },
          { title: "Correo Electrónico", description: contact.email },
          { title: "Número de Teléfono", description: contact.phoneNumber },
        ]);
        setSupplierContacts(contactList);
      }
    });
  }, []);

  return (
    <>
      <Title title="Datos de Proveedor" withReturnButton />
      <ContentCard>
        {supplierData && <DefinitionList definitions={supplierData} />}
        {supplierAddresses &&
          supplierAddresses.map((list, index) => (
            <>
              <hr />
              <div key={index}>
                <h5>Dirección {index + 1}</h5>
                <DefinitionList definitions={list} />
              </div>
            </>
          ))}
        {supplierContacts &&
          supplierContacts.map((list, index) => (
            <>
              <hr />
              <div key={index}>
                <h5>Contacto {index + 1}</h5>
                <DefinitionList definitions={list} />
              </div>
            </>
          ))}
      </ContentCard>
    </>
  );
};

export default SupplierDetails;
