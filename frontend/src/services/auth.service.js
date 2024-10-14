import { post } from "../utils/requests";

const register = (data) => {
  return post("auth/signup", data);
};

const login = (username, password) => {
  return post("auth/signin", {
    username,
    password,
  });
};

const logout = () => {
  return post("auth/signout");
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
