import axiosClient from "../axios";

const hasAuth = true;

const registerUser = (user) => {
  return axiosClient.post("/users", user);
};

const loginUser = (user) => {
  return axiosClient.post("/login", user);
};

const getAllATMCard = (userId) => {
  if (hasAuth) {
    return axiosClient.get(`/600/atms/?userId=${userId}`);
  }
};

const addNewATMCard = (data) => {
  if (hasAuth) {
    return axiosClient.post("/600/atms", data);
  }
};

const updateATMCard = (data, id) => {
  if (hasAuth) {
    return axiosClient.put(`/600/atms/${id}`, data);
  }
};

const deleteATMCard = (id) => {
  if (hasAuth) {
    return axiosClient.delete(`/600/atms/${id}`);
  }
};

export {
  registerUser,
  loginUser,
  getAllATMCard,
  addNewATMCard,
  updateATMCard,
  deleteATMCard,
};
