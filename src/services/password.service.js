import axios from "./axios.service.js";
import { apiUrl } from "./env.service.js";

const url = `${apiUrl}/users`;

export const updatePassword = async (password) => {
  return await axios.post(`${url}/updatepassword`, password);
}