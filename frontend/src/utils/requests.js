import axios from "axios";

const api = axios.create({
  baseURL: "https://developers.smartinnovationsystems.com:8443/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin" : "*",

  },
  withCredentials: true,
  credentials: "incude",
});

const setAuthorizationHeader = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
};

export const post = async (endpoint, data) => {
  try {
    setAuthorizationHeader();
    return api.post(endpoint, data);
  } catch (error) {
    console.error("Error al utilizar la consulta de tipo POST", error);
    throw error;
  }
};
export const get = async (endpoint) => {
  try {
    setAuthorizationHeader();
    return api.get(endpoint);
  } catch (error) {
    console.error("Error al utilizar la consulta de tipo GET", error);
    throw error;
  }
};
export const destroy = async (endpoint) => {
  try {
    setAuthorizationHeader();
    return api.delete(endpoint, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error("Error al utilizar la consulta tipo DELETE", error);
    throw error;
  }
};
