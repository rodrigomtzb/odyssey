import { get, post } from "../utils/requests";

const createJobPosition = (data) => {
  return post("jobpositions", data);
};
const toggleJobPositionStatus = (id, data) => {
  return post(`jobpositions/${id}/enabled`, data);
};
const getAllJobPositions = () => {
  return get("jobpositions");
};
const getEnabledJobPositions = () => {
  return get("jobpositions?isEnabled=true");
};
const getDisabledJobPositions = () => {
  return get("jobpositions?isEnabled=false");
};
const getJobPosition = (id) => {
  return get(`jobpositions/${id}`);
};

const JobPositionService = {
  createJobPosition,
  toggleJobPositionStatus,
  getAllJobPositions,
  getEnabledJobPositions,
  getDisabledJobPositions,
  getJobPosition,
};

export default JobPositionService;
