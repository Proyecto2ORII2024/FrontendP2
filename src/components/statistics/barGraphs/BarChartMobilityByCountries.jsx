import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getStatistics } from "../../../services/statistics.service";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Oculta la leyenda
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
      max: 100, // Ajusta según el rango esperado de datos
      title: {
        display: true,
        text: "Número de movilidades",
        color: "#333",
      },
    },
  },
};

export const BarChartMobilityByCountries = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityByCountry();

        const data = {
          labels: response.data.countrys,
          datasets: [
            {
              data: response.data.mobilities,
              backgroundColor: "#04B2B5",
              borderWidth: 1,
              barPercentage: 0.5,
            },
          ],
        };

        setChartData(data);
      } catch (err) {
        setError("Error al cargar los datos");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!chartData) return <div>No hay datos disponibles</div>;

  return (
    <div className="w mx-5 h-4/5">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChartMobilityByCountries;
