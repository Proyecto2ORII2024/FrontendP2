import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getStatistics } from "../../../services/statistics.service";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartAgreements = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics.getMobilityByEvent();
        console.log(JSON.stringify(response.data, null, 2));
        const data = {
          labels: response.data.agreementType, 
          datasets: [
            {
              data: response.data.totalMobilityByAgreementsType, 
              backgroundColor: ["#1D72D3", "#0F9D58", "#F8AE15", "#9D0311", "#C1B8B8"], 
              hoverOffset: 10, 
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
