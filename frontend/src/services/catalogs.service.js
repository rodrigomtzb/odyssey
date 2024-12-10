import { get } from "../utils/requests";

const getAccountType = () => {
  return get("catalogs/accounttype");
};
const getAddressType = () => {
  return get("catalogs/addresstype");
};
const getDisbursementType = () => {
  return get("catalogs/disbursementtype");
};
const getPersonType = () => {
  return get("catalogs/persontype");
};
const getPhoneType = () => {
  return get("catalogs/phonetype");
};
const getPurchaseType = () => {
  return get("catalogs/purchasetype");
};
const getUnitMeasure = () => {
  return get("catalogs/unitmeasure");
};

const CatalogsService = {
  getAccountType,
  getAddressType,
  getDisbursementType,
  getPersonType,
  getPhoneType,
  getPurchaseType,
  getUnitMeasure,
};

export default CatalogsService;
