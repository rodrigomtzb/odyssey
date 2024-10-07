import { post } from "../utils/requests";

const register = (data) => {
  console.log(data);
  const datos = {
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role
  }
  console.log(datos)
  return post("auth/signup", datos);
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
