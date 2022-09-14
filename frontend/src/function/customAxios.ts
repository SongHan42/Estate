import axios, { AxiosInstance } from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: "Bearer " + cookies.get("token"),
  },
});
