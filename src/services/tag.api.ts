import { axiosConfig } from "@/configs";
import { IPage } from "@/interfaces/page";

export interface IQrtag extends IPage {
  includes?: string;
  status?: string;
}
export const tagApi = {
  getTags: (qr: IQrtag) => {
    return axiosConfig.get("/tags", { params: qr }).then((res) => res.data);
  },
};
