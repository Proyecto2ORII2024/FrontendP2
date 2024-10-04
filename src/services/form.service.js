import axios from "./axios.service.js";
import { apiUrl } from "./env.service.js";

const url = `${apiUrl}/form`;

export const getForms = async () => {
    return await axios.get(`${url}/allForms`);
}

export const createForm = async (form) => {
    return await axios.post(`${url}/create`, form);
}
