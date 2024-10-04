import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
      'Intercambio académico',
      'Investigación conjunta',
      'Prácticas internacionales',
      'Doble titulación',
      'Otros',
  ],
  datasets: [
    {
      data: [40, 25, 20, 10, 5],
      backgroundColor: ["#1D72D3", "#0F9D58", "#F8AE15", "#9D0311", "#C1B8B8"],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
};
export const PieChartAgreements = () => {
  return (
    <div className="w ml-5 h-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartAgreements;
