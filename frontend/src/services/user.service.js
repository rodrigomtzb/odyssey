import { get } from "../utils/requests";

const getUsers = () => {
    return get("users");
};
const getUsersEnabled = () => {
    return get("users?isEnabled=true");
};
const getUsersDisabled = () => {
    return get("users?isEnabled=false");
};

const UserService = {
  getUsers,
  getUsersDisabled,
  getUsersEnabled
};

export default UserService;
