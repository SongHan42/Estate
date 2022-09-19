import axios, { AxiosInstance } from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

customAxios.interceptors.request.use((config) => {
  if (config.headers)
    config.headers.Authorization = "Bearer " + cookies.get("accessToken");
  return config;
});

customAxios.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401) {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + "auth/refresh",
        {
          headers: {
            Authorization: "Bearer " + cookies.get("refreshToken"),
          },
        },
      );
      cookies.set("accessToken", res.data.accessToken);
      return customAxios.request(err.config);
    }
    return Promise.reject(err);
  },
);
