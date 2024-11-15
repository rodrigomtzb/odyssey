import { get, post } from "../utils/requests";

const getAccess = () => {
  return get("access");
};
const addAccesstoJobPosition = (jobId, data) => {
  return post(`access/jobposition/${jobId}`, data);
};

const AccessService = {
  getAccess,
  addAccesstoJobPosition,
};

export default AccessService;
