import { get, post } from "../utils/requests";

const createJobPosition = (data) => {
  return post("jobpositions", data);
};
const toggleJobPositionStatus = (id, data) => {
  return post(`jobpositions/${id}/enabled`, data);
};
const getJobPositions = () => {
  return get("jobpositions");
};
const getJobPosition = (id) => {
  return get(`jobpositions/${id}`);
};

const JobPositionService = {
  createJobPosition,
  toggleJobPositionStatus,
  getJobPositions,
  getJobPosition,
};

export default JobPositionService
