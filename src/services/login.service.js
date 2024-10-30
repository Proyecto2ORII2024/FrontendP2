import axios from "./axios.service.js";
import { apiUrl } from "./env.service.js";

const url = `${apiUrl}/auth`;

export const login = async (user) => {
    return await axios.post(`${url}/login`, user);
}