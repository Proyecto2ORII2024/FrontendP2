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
  labels: ["España", "México", "Canada", "Estados Unidos", "Australia"],
  datasets: [
    {
      data: [43, 45, 30, 25, 20],
      backgroundColor: ["#6FDED8"],
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
        text: "Países",
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
export const BarChartMobilityByCountries = () => {
  return (
    <div className="w mx-5 h-4/5">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartMobilityByCountries;
