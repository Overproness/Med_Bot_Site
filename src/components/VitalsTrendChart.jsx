import React from "react";
import { Line } from "react-chartjs-2";
import {
  // aregisterChartComponents,
  getChartOptions,
  prepareChartData,
} from "../config/chartConfig";

export const VitalsTrendChart = ({ data }) => {
  // useEffect(() => {
  //   // Register Chart.js components when component mounts
  //   aregisterChartComponents();
  // }, []);

  const chartData = prepareChartData(data);
  const chartOptions = getChartOptions();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Vitals Trend</h2>
      <div className="h-96">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
