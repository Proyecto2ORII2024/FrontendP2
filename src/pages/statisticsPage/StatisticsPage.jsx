
import PieChart from "../../components/statistics/PieChart";

const StatisticsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Estadísticas de movilidad</h1>
      <div className="flex flex-col space-y-6">
        <div className="bg-gradient-to-r to-purple-500 p-4 rounded-lg shadow-lg">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
