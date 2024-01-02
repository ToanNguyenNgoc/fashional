import { axiosConfig } from "@/configs";
import { IQrProduct, IResponseList, IProduct, IQrProductById, IProductDetail, IResponseDetail, IProductSize } from "@/interfaces/index.type";

export const productApi = {
  getProducts: (qr: IQrProduct) => {
    return axiosConfig.get("products/", {params: qr}).then<IResponseList<IProduct[]>>(res => res.data)
  },
  getProductById: (params: IQrProductById, id: string) => {
    return axiosConfig.get(`products/${id}`, {params: params }).then<IResponseDetail<IProductDetail>>(res => res.data)
  },
  getProductSizeById: (id:number) => {
    return axiosConfig.get(`products/${id}/sizes`).then<IResponseList<IProductSize[]>>(res => res.data)
  }
}