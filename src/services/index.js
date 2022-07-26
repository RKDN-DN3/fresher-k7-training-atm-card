import axiosClient from "../axios";

const registerUser = (user) => {
  return axiosClient.post("/users", user);
};

const loginUser = (user) => {
  return axiosClient.post("/login", user);
};

const getAllATMCard = (userId, token) => {
  return axiosClient.get(`/600/atms/?userId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const addNewATMCard = (data, token) => {
  return axiosClient.post("/600/atms", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateATMCard = (data, token, id) => {
  return axiosClient.put(`/600/atms/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteATMCard = (id, token) => {
  return axiosClient.delete(`/600/atms/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { registerUser, loginUser, getAllATMCard, addNewATMCard, updateATMCard, deleteATMCard };
