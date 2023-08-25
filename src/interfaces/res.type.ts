import { AxiosError, AxiosResponse } from "axios";

export interface AxiosCusError<D> extends AxiosResponse<D> {
  response: {
    data: D;
  };
}
export interface IResponseDetail<T> {
  context: T;
  statusCode: number;
}
export interface IResponseList<T> {
  context: {
    current_page: number;
    data: T;
    next_page: number;
    prev_page: number;
    total: number;
    total_page: number;
  };
  statusCode: number;
}
