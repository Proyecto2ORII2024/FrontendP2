import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartAgreements = () => {
  const [chartData, setChartData] = useState({
    labels: [
      'Asistencia a evento', 'Misión', 'Curso corto', 'Estancia de investigación', 
      'Semestre académico de intercambio'
    ],
    datasets: [
      {
        data: Array(5).fill(0), 
        backgroundColor: ["#1D72D3", "#0F9D58", "#F8AE15", "#9D0311", "#C1B8B8"],
      },
    ],
  });

  useEffect(() => {
    const agreementsData = JSON.parse(localStorage.getItem('agreementsData')) || {};

    const updatedData = [...chartData.datasets[0].data];
    chartData.labels.forEach((label, index) => {
      const eventTypeId = index + 1;
      updatedData[index] = agreementsData[eventTypeId] || 0;
    });

    setChartData((prevState) => ({
      ...prevState,
      datasets: [{ ...prevState.datasets[0], data: updatedData }],
    }));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="w ml-5 h-full">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChartAgreements;
