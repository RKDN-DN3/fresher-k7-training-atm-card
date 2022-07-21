import axiosClient from "../axios";

const registerUser = (user) => {
  return axiosClient.post("/users", user);
};

export { registerUser };
