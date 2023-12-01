import { axiosConfig } from "@/configs";
import { IDistricts, IProvinces, IResponseList, IWards } from "@/interfaces/index.type";

export const provincesApi = {
  getProvinces: () => {
    return axiosConfig
      .get("provinces")
      .then<IResponseList<IProvinces[]>>((res) => res?.data);
  },
  getDistricts: (province_code: number) => {
    return axiosConfig
      .get(`provinces/${province_code}/districts`)
      .then<IResponseList<IDistricts[]>>((res) => res?.data);
  },
  getWards: (district_code: number) => {
    return axiosConfig
      .get(`districts/${district_code}/wards`)
      .then<IResponseList<IWards[]>>((res) => res?.data);
  },
};
