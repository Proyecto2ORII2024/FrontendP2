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
      //max: 25,
      title: {
        display: true,
        text: "Número de movilidades",
        color: "#666",
      },
    },
  },
};

export const BarChartMobilitiesPerYear = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityPerYear();
        
        const data = {
          labels: response.data.years.reverse(),
          datasets: [
            {
              label: 'Movilidades',
              data: response.data.amountMobility.reverse(),
              backgroundColor: "#A5DE6F",
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

export default BarChartMobilitiesPerYear;