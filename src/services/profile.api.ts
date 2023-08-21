import { axiosConfig } from "@/configs";

export const profileApi = {
  getProfile: () => {
    return axiosConfig.get("auth/profile").then((res) => res.data);
  },
};
