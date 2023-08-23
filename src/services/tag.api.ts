import { axiosConfig } from "@/configs";

interface value {
  page: string;
  limit: string;
  includes: string;
  status: boolean;
}
export const tagApi = {
  getTags: (params: value) => {
    // return axiosConfig.get("/tags", params);
  },
};
