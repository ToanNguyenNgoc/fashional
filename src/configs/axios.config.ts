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
  const { token, refresh } = validateRefreshToken();
  config.headers.Authorization = `Bearer ${token}`;
  if (refresh) {
    try {
      const res = await axios.post(
        `${baseURL}auth/refresh`,
        {},
        { withCredentials: true }
      );
      const data = res.data;
      Cookies.set("token_expired_at", data.context.token_expired_at, {
        secure: true,
      });
      Cookies.set("accessToken", data.context.accessToken, { secure: true });
      config.headers.Authorization = `Bearer ${data.context.accessToken}`;
    } catch (error) {
      console.log(error);
    }
  }
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
  let refresh = false;
  const dateString = Cookies.get("token_expired_at");
  const token = Cookies.get("accessToken");
  if (dateString) {
    const date = new Date();
    const dateObject = new Date(dateString);
    const milliseconds = dateObject.getTime();
    const timeCur = date.getTime();
    if (timeCur > milliseconds) {
      refresh = true;
    }
  }
  return { refresh, token };
};
