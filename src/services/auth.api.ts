import { axiosConfig } from "@/configs";
import { ILogin, IRegister } from "@/interfaces/auth";

export const authApi = {
  login: (body: ILogin) => {
    return axiosConfig.post("auth/login", body).then((res) => res.data);
  },
  register: (body: IRegister) => {
    return axiosConfig.post("auth/register", body).then((res) => res.data);
  },
};
