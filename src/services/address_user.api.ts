import { axiosConfig } from "@/configs";
import {
  IAddressUser,
  IParamsGetAddressUser,
  IParamsPostAddressUser,
  IAddressUserDetail,
} from "@/interfaces/index.type";
import { IResponseDetail, IResponseList } from "@/interfaces/res.type";

export const addressUserApi = {
  getAddress: (params: IParamsGetAddressUser) => {
    return axiosConfig
      .get("customer/addresses", { params })
      .then<IResponseList<IAddressUser[]>>((res) => res.data);
  },
  getAddressById: (address_id: number) => {
    return axiosConfig
      .get(`customer/addresses/${address_id}`)
      .then<IResponseList<IAddressUser[]>>((res) => res.data);
  },
  postAddress: (params: IParamsPostAddressUser) => {
    return axiosConfig
      .post("customer/addresses", params)
      .then<IResponseDetail<IAddressUserDetail>>((res) => res.data);
  },
  putAddress: (address_id: number) => {
    return axiosConfig
      .put(`customer/addresses/${address_id}`)
      .then<IResponseDetail<IAddressUserDetail>>((res) => res.data);
  },
  deleteAddress: (address_id: number) => {
    return axiosConfig
      .put(`customer/addresses/${address_id}`)
      .then<IResponseDetail<IAddressUserDetail>>((res) => res.data);
  }
};
