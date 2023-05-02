import router from "@/router";
import axios from "axios";

const baseURL = `https://wild-ruby-bream-hat.cyclic.app`;
const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("@token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("@token")}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.clear();
      router.push("/");
    } else {
      throw error;
    }
  }
);

export default instance;
