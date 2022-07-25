import axiosClient from "../axios";

const registerUser = (user) => {
  return axiosClient.post("/users", user);
};

const loginUser = (user) => {
  return axiosClient.post("/login", user);
};

const getAllATMCard = (token) => {
  return axiosClient.get("/600/atms",{ headers: { Authorization: `Bearer ${token}` } });
};

export { registerUser, loginUser, getAllATMCard };
