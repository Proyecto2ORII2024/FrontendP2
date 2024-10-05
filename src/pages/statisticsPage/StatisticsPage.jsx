import PieChartAgreements from "../../components/statistics/pieGraphs/PieChartAgreements";
import BarChartMobility from "../../components/statistics/barGraphs/BarChartMobility";
import LineChartMobilityTrend from "../../components/statistics/lineGraphs/LineChartMobilityTrend";
import BarChartMobilityByDepartment from "../../components/statistics/barGraphs/BarChartMobilityByDepartment";
import BarChartMobilityByCountries from "../../components/statistics/barGraphs/BarChartMobilityByCountries";
import BarChartMobilitiesPerYear from "../../components/statistics/barGraphs/BarChartMobilitiesPerYear";
import AdminLayout from "../../layouts/AdminLayout";

const StatisticsPage = () => {
  return (
    <AdminLayout>
      <div className="mx-10 my-5 text-2xl font-semibold">
        <h1>Estadísticas de movilidad</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-10 my-10">
        <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
          <div className="flex justify-center mt-5">
            <h2>Distribución de tipos de convenios</h2>
          </div>
          <PieChartAgreements />
        </div>
        <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
          <div className="flex justify-center mt-5">
            <h2>Movilidad por facultad</h2>
          </div>
          <div className="mt-5 h-full">
            <BarChartMobility />
          </div>
        </div>
        <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
          <div className="flex justify-center mt-5">
            <h2>Tendencia de movilidad anual</h2>
          </div>
          <div className="mt-5 h-full">
            <LineChartMobilityTrend />
          </div>
        </div>
        <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
          <div className="flex justify-center mt-5">
            <h2>Movilidades por año</h2>
          </div>
          <div className="mt-5 h-full">
            <BarChartMobilitiesPerYear />
          </div>
        </div>
        <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
          <div className="flex justify-center mt-5">
            <h2>Movilidades por países</h2>
          </div>
          <div className="mt-5 h-full">
            <BarChartMobilityByCountries />
          </div>
        </div>
        <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
          <div className="flex justify-center mt-5">
            <h2>Movilidades por departamentos</h2>
          </div>
          <div className="mt-5 h-full">
            <BarChartMobilityByDepartment />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StatisticsPage;
