import axios from "axios";

const api = axios.create({
  baseURL: "https://developers.smartinnovationsystems.com:8443/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const getAccessToken = () => localStorage.getItem("accessToken");

export const refreshToken = async () => {
  const token = getAccessToken();
  try {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
    const response = await api.post("/auth/refreshtoken", {
      refreshToken: localStorage.getItem("refreshToken"), 
    });
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken); // Almacena el nuevo token
    return newAccessToken;
  } catch (error) {
    console.error("Error al refrescar el token", error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 408) {
      try {
        const newAccessToken = await refreshToken();
        api.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        console.error("No se pudo refrescar el token", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const setAuthorizationHeader = () => {
  const token = getAccessToken();
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
};

export const post = async (endpoint, data) => {
  try {
    setAuthorizationHeader();
    return await api.post(endpoint, data);
  } catch (error) {
    console.error("Error al utilizar la consulta de tipo POST", error);
    throw error;
  }
};

export const get = async (endpoint) => {
  try {
    setAuthorizationHeader();
    return await api.get(endpoint);
  } catch (error) {
    console.error("Error al utilizar la consulta de tipo GET", error);
    throw error;
  }
};

export const destroy = async (endpoint) => {
  try {
    setAuthorizationHeader();
    return await api.delete(endpoint);
  } catch (error) {
    console.error("Error al utilizar la consulta tipo DELETE", error);
    throw error;
  }
};
