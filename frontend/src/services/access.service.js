import { get, post } from "../utils/requests";

const getUserAccess = () => {
  return get("access");
};
const getAllAccess = () => {
  return get("access?getAll=true");
};
const syncAccessToJobPosition = (jobId, data) => {
  return post(`access/jobposition/${jobId}`, data);
};

const AccessService = {
  getUserAccess,
  getAllAccess,
  syncAccessToJobPosition,
};

export default AccessService;
