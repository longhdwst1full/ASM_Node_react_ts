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

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
const createdAt = "2023-04-03T16:10:41.220Z";
// updatedAt: '2023-04-03T16:10:41.220Z'
