import { axiosConfig } from "@/configs";
import { IQrtag, IResponseList, ITag } from "@/interfaces/index.type";
import axios from "axios";

export const tagApi = {
  getTags: (qr: IQrtag) => {
    return axiosConfig
      .get("/tags", { params: qr })
      .then<IResponseList<ITag[]>>((res) => res.data);
  },
  // getTags: (qr: IQrtag) => {
  //   return axios
  //     .get("https://api.fashional.pro/v1/tags", { params: qr })
  //     .then<IResponseList<ITag[]>>((res) => res.data);
  // },
};
