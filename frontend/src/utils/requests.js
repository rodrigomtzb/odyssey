import axios from "axios";
import { useLoader } from "../context/Loader/LoaderProvider";
import Swal from "sweetalert2";
import AuthService from "../services/auth.service";

const api = axios.create({
  baseURL: "https://developers.smartinnovationsystems.com:8443/api/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

const getAccessToken = () => localStorage.getItem("accessToken");

export const refreshToken = async () => {
  try {
    localStorage.removeItem("accessToken");
    const response = await api.post("/auth/refreshtoken", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error al refrescar el token", error);
    throw error;
  }
};

// api.interceptors.request.use((config) => {
//   const { setIsLoading } = useLoader();
//   setIsLoading(true);
//   return config;
// });

api.interceptors.response.use(
  (response) => {
    // const { setIsLoading } = useLoader();
    // setIsLoading(false);
    return response;
  },
  async (error) => {
    // const { setIsLoading } = useLoader();
    // setIsLoading(false);

    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshToken();
        api.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("No se pudo refrescar el token", refreshError);
        // Swal.fire({
        //   title: "Sesion expirada"
        // })
        AuthService.logout().then(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.reload();
        })

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

export const put = async (endpoint, data) => {
  try {
    setAuthorizationHeader();
    return await api.put(endpoint, data);
  } catch (error) {
    console.error("Error al utilizar la consulta de tipo PUT", error);
    throw error;
  }
};
