import React, { useEffect, useState } from "react";
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
import { getStatistics } from "../../../services/statistics.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityPerYear();

        const data = {
          labels: response.data.years,
          datasets: [
            {
              label: '',
              data: response.data.amountMobility,
              borderColor: "#9D0311",
              pointBackgroundColor: "#ffffff",
              pointBorderColor: "#9D0311",
              pointBorderWidth: 2,
              pointRadius: 3,
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChartMobilityTrend;
