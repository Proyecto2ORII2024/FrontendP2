import axios from "./axios.service.js";
import { apiUrl } from "./env.service.js";

export const getAgreements = async () => {
    return await axios.get(`${apiUrl}/convenio`);
}

export const createAgreement = async (agreement) => {
    return await axios.post(`${apiUrl}/convenio`, agreement);
}

export const updateAgreement = async (agreement, agreementId) => {
    return await axios.put(`${apiUrl}/convenio/${agreementId}`, agreement);
}

export const deleteAgreement = async (agreementId) => {
    return await axios.delete(`${apiUrl}/convenio/${agreementId}`);
}

export const getAgreement = async (agreementId) => {
    return await axios.get(`${apiUrl}/convenio/${agreementId}`);
}