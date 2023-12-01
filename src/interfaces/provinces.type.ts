interface CommonProperties {
  code: number;
  name: string;
  division_type: string;
  codename: string;
}

export interface IProvinces extends CommonProperties {
  phone_code: number;
}

export interface IDistricts extends CommonProperties {
  province_code: number;
}

export interface IWards extends CommonProperties {
  district_code: number;
}
