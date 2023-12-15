import { axiosConfig } from "@/configs";
import {
  IAddressUser,
  IAddressUserDetail,
  IParamsGetAddressUser,
  IParamsPostAddressUser,
  IResponseList,
  IResponseDetail,
  IResponseMessage,
} from "@/interfaces/index.type";
export const addressUserApi = {
  getAddress: (params: IParamsGetAddressUser) => {
    return axiosConfig
      .get("customer/addresses", { params })
      .then<IResponseList<IAddressUserDetail[]>>((res) => res.data);
  },
  getAddressById: (address_id: number) => {
    return axiosConfig
      .get(`customer/addresses/${address_id}`)
      .then<IResponseDetail<IAddressUserDetail>>((res) => res.data);
  },
  postAddress: (params: IParamsPostAddressUser) => {
    return axiosConfig
      .post("customer/addresses", params)
      .then<IResponseDetail<IAddressUser>>((res) => res.data);
  },
  putAddress: (params: IParamsPostAddressUser) => {
    return axiosConfig
      .put(`customer/addresses/${params.id}`, params)
      .then<IResponseDetail<IAddressUser>>((res) => res.data);
  },
  deleteAddress: (address_id: number) => {
    return axiosConfig
      .delete(`customer/addresses/${address_id}`)
      .then<IResponseMessage>((res) => res.data);
  },
};
