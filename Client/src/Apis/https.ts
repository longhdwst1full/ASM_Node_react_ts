import axios from "axios";
const intace = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
});

// intace.interceptors.response.use(
//   (response) => {

//       const { data } = response;

//       return response.data;
//   }

// );

export default intace;
