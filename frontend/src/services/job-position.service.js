import { get, post, put } from "../utils/requests";

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
const editJobPosition = (id, data) => {
  return put(`jobpositions/${id}`, data);
};

const JobPositionService = {
  createJobPosition,
  toggleJobPositionStatus,
  getAllJobPositions,
  getEnabledJobPositions,
  getDisabledJobPositions,
  getJobPosition,
  editJobPosition,
};

export default JobPositionService;
