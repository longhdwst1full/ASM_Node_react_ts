import { DataAuthResponse, RegisterType, User, UserLogin } from "../types/auth";
import intace from "./https";

const accessToken: { accessToken: string; user: User } = localStorage.getItem(
  "user"
)
  ? JSON.parse(localStorage.getItem("user") as string)
  : "";

const loginSubmit = async (data: UserLogin): Promise<DataAuthResponse> => {
  const response = await intace.post<DataAuthResponse>("/signin", data);

  return response.data;
};

const registerSubmit = async (
  data: RegisterType
): Promise<DataAuthResponse> => {
  const result = intace.post<DataAuthResponse>("/signup", data);
  return (await result).data;
};

const getAccountAdmin = async (
  accessToken: string
): Promise<DataAuthResponse> => {
  const data = await intace.get<DataAuthResponse>(`/admin`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return data.data;
};

const getUserList = async (accessToken: string) =>
  intace.get<Omit<DataAuthResponse, "accessToken">>("/admin/userlist", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

const deleteUser = async (id: string) => {
  return intace.delete(id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const addUser = async (body: Omit<RegisterType, "confirmPassword">) =>
  await intace.post<DataAuthResponse>("/signup", body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
export {
  deleteUser,
  addUser,
  loginSubmit,
  getAccountAdmin,
  registerSubmit,
  getUserList,
};
