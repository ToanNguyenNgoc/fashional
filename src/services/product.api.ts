import { axiosConfig } from "@/configs";
import { IQrProduct, IResponseList, IProduct } from "@/interfaces/index.type";
import axios from "axios";

// export const productApi = {
//   getProductArrivals: (qr: IQrProduct) => {
//     return axiosConfig.get("/product", {params: qr}).then<IResponseList<IProduct>>(res => res.data)
//   }
// }

export const productApi = {
  getProductArrivals: (qr: IQrProduct) => {
    return axios
      .get("https://api.fashional.pro/v1/products/", { params: qr })
      .then<IResponseList<IProduct[]>>((res) => res.data);
  },
};
