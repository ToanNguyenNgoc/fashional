import { AxiosError, AxiosResponse } from "axios";

export interface AxiosCusError<D> extends AxiosResponse<D> {
  response: {
    data: D;
  };
}
export interface IResponseDetail<T> {
  statusCode: number;
  context: T;
}
export interface IResponseList<T> {
  statusCode: number;
  context: {
    current_page: number;
    data: T;
    next_page: number;
    prev_page: number;
    total: number;
    total_page: number;
  };
}

export interface IResponseMessage {
  statusCode: number;
  context: {
    message: string
  };
}