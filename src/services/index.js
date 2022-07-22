import axiosClient from "../axios";

const registerUser = (user) => {
  return axiosClient.post("/users", user);
};

const loginUser = (user) => {
  return axiosClient.post("/login", user);
}

export { registerUser, loginUser };
