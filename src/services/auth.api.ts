import { axiosConfig } from "@/configs";
import { IForgot, ILogin, IRegister } from "@/interfaces/auth.type";

export const authApi = {
  login: (body: ILogin) => {
    return axiosConfig.post("/auth/login", body).then((res) => res.data);
  },
  register: (body: IRegister) => {
    return axiosConfig.post("/auth/register", body).then((res) => res.data);
  },
  forgot: (body: IForgot) => {
    return axiosConfig.post("auth/forgot", body).then((res) => res.data);
  },
  logout: () => {
    return axiosConfig.post("auth/logout").then((res) => res.data);
  },
};
