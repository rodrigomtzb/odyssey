import { destroy, get, post, put } from "../utils/requests";

const createProject = (data) => {
  return post("projects", data);
};
const addAddress = (id, data) => {
  return post(`projects/${id}/address`, data);
};
const toggleProjectStatus = (id, data) => {
  return post(`projects/${id}/enabled`, data);
};

const getProjects = () => {
  return get("projects");
};
const getPojectsBySearch = () => {
  return get("projects")
}
const getProject = (id) => {
  return get(`projects/${id}`);
};

const editProjectData = (id, data) => {
  return put(`projects/${id}`, data);
};
const editProjectAddress = (id, data) => {
  return put(`projects/${id}/address`, data);
};

const deleteProjectAddress = (projectId, addressId) => {
  return destroy(`projects/${projectId}/address/${addressId}`);
};

const ProjectService = {
  createProject,
  addAddress,
  toggleProjectStatus,
  getProjects,
  getProject,
  editProjectData,
  editProjectAddress,
  deleteProjectAddress,
};

export default ProjectService;
