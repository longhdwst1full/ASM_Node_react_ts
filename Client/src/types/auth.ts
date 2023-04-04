import { AxiosRequestConfig, AxiosResponse } from "axios";
export interface DataAuthResponse {
  message: string | Array<string> | Object;
  data: User;
  accessToken: string;
}

export interface User {
  email: string;
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface RegisterType extends UserLogin {
  confirmPassword: string;
  name?: string;
}

export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

