
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
  labels: ["2017", "2018", "2019", "2020", "2021","2022","2023","2024"],
  datasets: [
    {
      label: '',
      data: [150, 180, 210, 50, 80, 120, 200, 250],
      backgroundColor: ["#A5DE6F"],
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
        text: "Años",
        color: "#333",
      },
    },
    y: {
      max: 300,
      title: {
        display: true,
        text: "Número de movilidades",
        color: "#333",
      },
    },
  },
};

export const BarChartMobilitiesPerYear = () => {
  return (
    <div className="w mx-5 h-4/5">
        <Bar data={data} options={options} />
    </div>
  )
}

export default BarChartMobilitiesPerYear