import { IPage } from "@/interfaces/index.type";
export interface IAddressUser {
  id: number;
  account_id: number;
  is_default: boolean;
  status: boolean;
  delete: boolean;
  short_address: string;
  province_code: number;
  district_code: number;
  ward_code: number;
  lat: number;
  long: number;
  updated_at: string;
  created_at: string;
  consignee_s_name: string;
  consignee_s_telephone: string;
}
export interface IAddressUserDetail extends IAddressUser {
  province: {
    code: number;
    name: string;
  };
  district: {
    code: number;
    name: string;
  };
  ward: {
    code: number;
    name: string;
  };
}

// params query
export interface IParamsGetAddressUser extends IPage {
  status?: boolean;
  is_default?: boolean;
}
export interface IParamsPostAddressUser {
  id?: number;
  consignee_s_name?: string;
  consignee_s_telephone?: string | number;
  short_address?: string;
  province_code?: number | string;
  district_code?: number | string;
  ward_code?: number | string;
  is_default?: boolean;
  lat?: number;
  long?: number;
}
// close params query
