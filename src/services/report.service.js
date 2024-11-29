import axios from "axios";
import { apiUrl } from "./env.service.js";

const urlapi = `${apiUrl}/reports/mobility`;

const tokenUser = localStorage.getItem('user') || "";

export const downloadFile = async () => {
  try {
    const response = await axios.get(urlapi, {
      responseType: "blob",
      withCredentials: true,
      baseURL: apiUrl,
        headers: {
            'Authorization': `Bearer ${tokenUser}`,
        }
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "mobility.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
  }
};
