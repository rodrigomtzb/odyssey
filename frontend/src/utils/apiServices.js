import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-98-82-230-34.compute-1.amazonaws.com:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.status;
  } catch (error) {
    console.error("Error en el envio", error);
    throw error;
  }
};
