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
              backgroundColor: ["#1D72D3", "#9D0311", "#F8AE15", "#249300", "#C8C5D0"],
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
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "right", 
      },
      tooltip: {
        enabled: true, 
      },
    },
    layout: {
      padding: 10, 
    },
  };

  return (
    <div className="w-full h-[calc(100%-40px)] p-5"> 
      <div className="h-full"> 
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
  
};

export default PieChartAgreements;
