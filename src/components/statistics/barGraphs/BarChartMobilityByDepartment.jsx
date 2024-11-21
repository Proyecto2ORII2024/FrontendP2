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
  labels: [
    "Ingeniería de Sistemas",
    "Matemáticas",
    "Historia",
    "Ciencias politicas",
    "Física",
  ],
  datasets: [
    {
      label: '',
      data: [80, 65, 70, 55, 40],
      backgroundColor: ["#F8AE15",],
      borderWidth: 1,
      barPercentage: 0.5,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Departamentos",
        color: "#333",
      },
    },
    y: {
      max: 100,
      title: {
        display: true,
        text: "Número de movilidades",
        color: "#333",
      },
    },
  },
};

export const BarChartMobilityByDepartment = () => {
  return (
    <div className="w mx-5 h-4/5">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartMobilityByDepartment;
