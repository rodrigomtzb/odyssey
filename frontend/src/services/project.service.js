import { post } from "../utils/requests";

const createProject = (data) => {
  return post("projects", data);
};

const ProjectService = {
  createProject,
};
