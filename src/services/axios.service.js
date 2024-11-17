import axios from "axios";

import { apiUrl } from "./env.service.js";

const tokenUser = localStorage.getItem('user') || "";

console.log(tokenUser)

const instance = axios.create({
    withCredentials: true,
    baseURL: apiUrl,
    headers: {
        'Authorization': `Bearer ${tokenUser}`,
    }
})

export default instance;