import axios from "./axios.service.js";
import { apiUrl } from "./env.service.js";

export const getAgreements = async () => {
    return await axios.get(`${apiUrl}/convenio`);
}

export const createAgreement = async (agreement) => {
    return await axios.post(`${apiUrl}/convenio`, agreement);
}