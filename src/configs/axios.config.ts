import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";

// export const baseURL = process.env.NEXT_PUBLIC_API_URL_DEV;
export const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const axiosConfig = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosConfig.interceptors.request.use(async (config) => {
  const token = validateRefreshToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

const validateRefreshToken = () => {
  const token = Cookies.get("access_token");
  return token;
};
