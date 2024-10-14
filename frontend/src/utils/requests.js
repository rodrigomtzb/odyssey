import axios from "axios";

const api = axios.create({
  baseURL: "https://developers.smartinnovationsystems.com:8443/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin" : "*"
  },
  withCredentials: true,
  credentials: "incude",
});

export const post = async (endpoint, data) => {
  try {
    return api.post(endpoint, data);
  } catch (error) {
    console.error("Error al utilizar la consulta de tipo POST", error);
    throw error;
  }
};
export const get = async (endpoint) => {
  try {
    return api.get(endpoint);
  } catch (error) {
    console.error("Error al utilizar la consulta de tipo GET", error);
    throw error;
  }
};
export const destroy = async (endpoint) => {
  try {
    return api.delete(endpoint, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error("Error al utilizar la consulta tipo DELETE", error);
    throw error;
  }
};
