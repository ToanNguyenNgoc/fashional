import { axiosConfig } from "@/configs";
import { IResponseList } from "@/interfaces/res.type";
import { IQrtag, ITag } from "@/interfaces/tags.type";
import axios from "axios";

export const tagApi = {
  // getTags: (qr: IQrtag) => {
  //   return axiosConfig
  //     .get("/tags", { params: qr })
  //     .then<IResponseList<ITag[]>>((res) => res.data);
  // },
  getTags: (qr: IQrtag) => {
    return axios
      .get("https://api.fashional.pro/v1/tags", { params: qr })
      .then<IResponseList<ITag[]>>((res) => res.data);
  },
};
