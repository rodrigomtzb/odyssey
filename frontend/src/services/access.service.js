import { get, post } from "../utils/requests";

const getUserAccess = () => {
  return get("access");
};
const getAllAccess = () => {
  return get("access?getAll=true");
};
const getAccessFromJobPosition = (id) => {
  return get(`access/jobposition/${id}`);
};
const syncAccessToJobPosition = (jobId, data) => {
  return post(`access/jobposition/${jobId}`, data);
};

const AccessService = {
  getUserAccess,
  getAllAccess,
  getAccessFromJobPosition,
  syncAccessToJobPosition,
};

export default AccessService;
