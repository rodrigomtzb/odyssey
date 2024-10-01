import axios from "axios";

const api = axios.create({
  baseURL: "https://developers.smartinnovationsystems.com:8443/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "*"
  },
  withCredentials: true,
  credentials: "incude"
});

export const post = async (endpoint, data) => {
  try {
    return api.post(endpoint, data);
  } catch (error) {
    console.error("Error en el envio", error);
    throw error;
  }
};
