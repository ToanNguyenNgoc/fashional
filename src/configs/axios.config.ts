import axios from "axios";
import queryString from "query-string";

const baseURL = ""
export const axiosConfig = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
})
axiosConfig.interceptors.request.use(async (config) => {
    return config
})