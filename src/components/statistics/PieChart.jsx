import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
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
        backgroundColor: [
          '#1D72D3',
          '#0F9D58',
          '#F8AE15',
          '#9D0311',
          '#C1B8B8',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right', 
        labels: {
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; 
          },
        },
      },
    },
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <Pie data={data} options={options} />
      <h2 className="text-left font-bold">Distribución de tipos de convenios</h2>
    </div>
  );
};

export default PieChart;