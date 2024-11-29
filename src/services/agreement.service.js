import axios from "./axios.service.js";
import { apiUrl } from "./env.service.js";

const url = `${apiUrl}/agreement`;

export const getAgreements = async () => {
    return await axios.get(`${url}/all`);
}

export const createAgreement = async (agreement) => {
    return await axios.post(`${url}/create`, agreement);
}

export const updateAgreement = async (agreement, agreementId) => {
    return await axios.put(`${url}/update/${agreementId}`, agreement);
}

export const deleteAgreement = async (agreementId) => {
    return await axios.delete(`${url}/delete/${agreementId}`);
}

export const getAgreement = async (agreementId) => {
    return await axios.get(`${url}/${agreementId}`);
}


/**
 * Obtains agreements and categorizes them into national and international.
 * 
 * @async
 * @function obtainAgreements
 * @returns {Promise<Object>} An object containing categorized agreements:
 * - NATIONAL: Array of national agreements.
 * - INTERNATIONAL: Array of international agreements.
 * - ALL: Array of all agreements.
 */
export const obtainAgreements = async () => {
    let agreements = await getAgreements().then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(error);
        return [];
    });

    const agreementsData = {
        NATIONAL: [],
        INTERNATIONAL: [],
        ALL: agreements.map((agreement) => (agreement))
    }

    agreements.forEach((agreement) => {
        if(agreement.scope === "NATIONAL") {
            agreementsData.NATIONAL.push(agreement);
        } else {
            agreementsData.INTERNATIONAL.push(agreement);
        }
    });

    return agreementsData;
}
