import { get } from "../utils/requests";

const getAddressType = () => {
  return get("catalogs/addresstype");
};
const getPersonType = () => {
  return get("catalogs/persontype");
};
const getPhoneType = () => {
  return get("catalogs/phonetype");
};

const CatalogsService = {
  getAddressType,
  getPersonType,
  getPhoneType,
};

export default CatalogsService;
