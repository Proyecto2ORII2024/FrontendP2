import axios from "axios";

import { apiUrl } from "./env.service.js";

const instance = axios.create({
    withCredentials: true,
    baseURL: apiUrl
})

export default instance;