import axios from "./axios.service.js";
import { apiUrl } from "./env.service.js";

const url = `${apiUrl}/form`;

export const getForms = async () => {
    return await axios.get(`${url}/allForms`);
}

export const createForm = async (form) => {
    return await axios.post(`${url}/create`, form);
}

export const updateForm = async (form, formId) => {
    return await axios.put(`${url}/update/${formId}`, form);
}

export const deleteForm = async (formId) => {
    return await axios.delete(`${url}/delete/${formId}`);
}

export const getId = async (id) => {
    return await axios.get(`${url}/${id}`);
}