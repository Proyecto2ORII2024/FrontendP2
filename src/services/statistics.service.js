import axios from "./axios.service.js";
import { apiUrl } from "./env.service.js";

const url = `${apiUrl}/statistics`;

export const getStatistics = {
    getMovilityByFaculty: async () => {
        return await axios.get(`${url}/faculty`);
    },
    getMobilityPerYear: async () => {
        return await axios.get(`${url}/mobilitytrend`);
    }
};