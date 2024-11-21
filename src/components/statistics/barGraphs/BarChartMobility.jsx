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
  scales: {
    x: {
      title: {
        display: true,
        text: "Facultades",
        color: "#333",
      },
      ticks: {
        callback: function (value, index, ticks) {
          const label = this.getLabelForValue(value);
          return label.length > 15 ? label.substring(12, 24) + "..." : label;
        },
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
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMovilityByFaculty();
        console.log(JSON.stringify(response.data, null, 2));
        const data = {
          labels: response.data.faculty,
          datasets: [
            {
              label: "Salidas",
              data: response.data.output,
              backgroundColor: "#000066",
              borderColor: "#000066",
              borderWidth: 1,
            },
            {
              label: "Entradas",
              data: response.data.input,
              backgroundColor: "#9D0311",
              borderColor: "#9D0311",
              borderWidth: 1,
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

export default BarChartMobility;