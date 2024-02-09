import axios from "axios";
import Cookies from "js-cookie";
const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (Cookies.get("userManagement")) {
    req.headers["Authorization"] = Cookies.get("userManagement");
  }
  return req;
});

export const PostSignin = (data) => API.post("/api/login", data);
export const PostSignup = (data) => API.post("/api/register", data);
export const FetchUserDetails = () => API.get("/api/user");
export const UpdateUserDetails = (id, data) => API.put(`/api/user/${id}`, data);
