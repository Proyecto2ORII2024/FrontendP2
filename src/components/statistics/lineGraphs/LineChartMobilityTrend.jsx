import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { plugin } from "postcss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ],
  datasets: [
    {
      label: '',
      data: [60, 50, 60, 100, 115, 90, 100, 120],
      borderColor: "#9D0311",
      pointBackgroundColor: "#ffffff",
      pointBorderColor: "#9D0311",
      pointBorderWidth: 2,
      pointRadius: 3,
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
        }
      },
      y: {
        max: 150,
        beginAtZero: true, 
        title: {
          display: true,
          text: "Número de movilidades",
          color: "#333",
        }
      },
    },
};

export const LineChartMobilityTrend = () => {
  return (
    <div className="w mx-5 h-4/5">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartMobilityTrend;
