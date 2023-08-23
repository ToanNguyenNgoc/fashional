import { AxiosError, AxiosResponse } from "axios";

export interface AxiosCusError<D> extends AxiosResponse<D> {
  response: {
    data: D;
  };
}
