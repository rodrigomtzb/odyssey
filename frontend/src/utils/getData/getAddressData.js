import AddressService from "../../services/address.service";

const getAddressData = async (address, withoutId = false) => {
  try {
    const response = await AddressService.getNeighborhood(
      address.statemxId,
      address.townId,
      address.neighborhoodId
    );
    const neighborhood = response.data;

    return [
      { title: "ID", description: withoutId ? "" : address.id },
      {
        title: "Tipo de Domicilio",
        description: address.addressType.name,
      },
      {
        title: "Calle",
        description: address.street,
      },
      {
        title: "N° Exterior",
        description: address.number,
      },
      {
        title: "N° Interior",
        description: address.apartmentNumber,
      },
      {
        title: "Código Postal",
        description: address.zipCode,
      },
      {
        title: "Colonia",
        description: neighborhood.name || "",
      },
      {
        title: "Municipio",
        description: neighborhood.town.name || "",
      },
      {
        title: "Estado",
        description: neighborhood.town.state.name || "",
      },
    ];
  } catch (error) {
    console.error("Error fetching neighborhood data:", error);
    return [];
  }
};

export default getAddressData;
