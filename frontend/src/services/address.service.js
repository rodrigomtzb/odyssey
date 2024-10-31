import { get } from "../utils/requests";

const getStates = () => {
  return get("catalogs/states");
};
const getState = (id) => {
  return get(`catalogs/states/${id}`);
};
const getTownsByState = (id) => {
  return get(`catalogs/states/${id}/towns`);
};
const getTown = (stateId, townId) => {
  return get(`catalogs/states/${stateId}/towns/${townId}`);
};
const getNeighborhoodsByTownAndState = (stateId, townId) => {
  return get(`catalogs/states/${stateId}/towns/${townId}/neighborhoods`);
};
const getNeighborhood = (stateId, townId, neighborhoodId) => {
  return get(
    `catalogs/states/${stateId}/towns/${townId}/neighborhoods/${neighborhoodId}`
  );
};
const getNeighborhoodsByZipCode = (zipcode) => {
  return get(`catalogs/neighborhoods/zip-code/${zipcode}`);
};

const AddressService = {
  getStates,
  getState,
  getTownsByState,
  getTown,
  getNeighborhoodsByTownAndState,
  getNeighborhood,
  getNeighborhoodsByZipCode,
};

export default AddressService;
