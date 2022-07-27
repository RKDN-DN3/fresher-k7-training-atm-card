import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create();
let userAuth;
if (Cookies.get("user")) {
  userAuth = JSON.parse(Cookies.get("user"));
}

let token = userAuth !== undefined ? userAuth.accessToken : "";

axiosClient.defaults.baseURL = "http://localhost:3004";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};

export default axiosClient;
