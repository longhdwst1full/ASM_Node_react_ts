import { DataAuthResponse, RegisterType, UserLogin } from "../types";
import intace from "./https";

const loginSubmit = async (data: UserLogin): Promise<DataAuthResponse> => {
  const response = await intace.post<DataAuthResponse>("/signin", data);
  // console.log(response.data);
  return response.data;
};
const registerSubmit = async (
  data: RegisterType
): Promise<DataAuthResponse> => {
  const result = intace.post<DataAuthResponse>("/signup", data);
  return (await result).data;
};

const getAccountAdmin = async(accessToken: string):Promise<DataAuthResponse> => {
  const data=await intace.get<DataAuthResponse>(`/admin`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return data.data
};

// const userList = () => intace.get("/products");
// const getOneProduct = (id) => intace.get("/products/" + id);
// const deleteUser = (id) =>
//   intace.delete("/products/" + id, {
//     headers: {},
//   });

export { loginSubmit, getAccountAdmin, registerSubmit };
