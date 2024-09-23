import { getAgreements } from "../../services/agreement.service.js";

export const obtainAgreements = async () => {
    let agreements = await getAgreements();

    agreements = agreements.data;

    const agreementsData = {
        NATIONAL: [],
        INTERNATIONAL: [],
        ALL: agreements
    }

    agreements.forEach(agreement => {
        if(agreement.scope === "NATIONAL") {
            agreementsData.NATIONAL.push(agreement);
        } else {
            agreementsData.INTERNATIONAL.push(agreement);
        }
    });

    return agreementsData;
}
