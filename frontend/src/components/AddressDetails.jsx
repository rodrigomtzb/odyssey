import { useEffect, useState } from "react";
import { getAddressData } from "../utils";
import DefinitionList from "./DefinitionList";

const AddressDetails = ({ address, index }) => {
  const [addressDefinitions, setAddressDefinitions] = useState([]);

  useEffect(() => {
    const fetchAddressData = async () => {
      const definitions = await getAddressData(address, true);
      setAddressDefinitions(definitions);
    };
    fetchAddressData();
  }, [address]);

  return (
    <>
      <hr />
      <h5>Domicilio {index > 0 ? index + 1 : ""}</h5>
      {addressDefinitions.length === 0 ? (
        <p>Cargando datos de domicilio...</p>
      ) : (
        <DefinitionList definitions={addressDefinitions} />
      )}
    </>
  );
};
export default AddressDetails;
