import Cookies from "js-cookie";
import axiosClient from "../axios";

const setup = () => {
  axiosClient.interceptors.request.use(
    (config) => {
      let userAuth;
      if (Cookies.get("user")) {
        userAuth = JSON.parse(Cookies.get("user"));
      }
      const token =  userAuth?.accessToken;
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setup;
