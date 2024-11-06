import { get, put } from "../utils/requests";

const getUsers = () => {
  return get("users");
};
const getUsersEnabled = () => {
  return get("users?isEnabled=true");
};
const getUsersDisabled = () => {
  return get("users?isEnabled=false");
};
const getUser = (id) => {
  return get(`users/${id}`);
};

const editUserData = (id, data) => {
  return put(`users/${id}/data`, data);
};
const editUserEmail = (id, data) => {
  return put(`users/${id}/email`, data);
};
const editUserPassword = (id, data) => {
  return put(`users/${id}/password`, data);
};
const toggleUserStatus = (id, data) => {
  return put(`users/${id}/enabled`, data);
};

const UserService = {
  getUsers,
  getUsersDisabled,
  getUsersEnabled,
  getUser,
  editUserData,
  editUserEmail,
  editUserPassword,
  toggleUserStatus,
};

export default UserService;
