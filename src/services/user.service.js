import axios from "./axios.service.js";
import { apiUrl } from "./env.service.js";

const url = `${apiUrl}/users`;

export const getUsers = async () => {
  return await axios.get(`${url}/get`);
};

export const createUser = async (user) => {
  return await axios.post(`${url}/create`, user);
};

export const updateUser = async (id,user) => {
  return await axios.put(`${url}/update/${id}`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${url}/delete/${id}`);
};