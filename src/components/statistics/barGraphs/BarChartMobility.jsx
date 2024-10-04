import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ["Ingeniería", "Ciencias", "Humanas", "Salud", "Derecho"],
  datasets: [
    {
      label: "Salidas",
      data: [60, 15, 30, 45, 10],
      backgroundColor: ["#000066"],
      borderColor: ["#000066"],
      borderWidth: 1,
    },
    {
      label: "Entradas",
      data: [20, 44, 25, 29, 23],
      backgroundColor: ["#9D0311"],
      borderColor: ["#9D0311"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Facultades",
        color: "#333",
      },
    },
    y: {
      title: {
        display: true,
        text: "Número de estudiantes/docentes en movilidad",
        color: "#333",
      },
    },
  },
};

export const BarChartMobility = () => {
  return (
    <div className="w mx-5 h-4/5">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartMobility;
