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
  try{
    return post("auth/signout");
  }catch(error){
    console.log('error');
  }
};

const refreshToken = (data) => {
  return post("auth/refreshtoken", data);
};
const AuthService = {
  register,
  login,
  logout,
  refreshToken,
};

export default AuthService;
