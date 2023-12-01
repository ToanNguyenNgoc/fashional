import { axiosConfig } from "@/configs";
import { IQrProduct, IResponseList, IProduct } from "@/interfaces/index.type";

export const productApi = {
  getProductArrivals: (qr: IQrProduct) => {
    return axiosConfig.get("products/", {params: qr}).then<IResponseList<IProduct[]>>(res => res.data)
  }
}