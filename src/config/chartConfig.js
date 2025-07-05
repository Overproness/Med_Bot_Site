import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// export const aregisterChartComponents = () => {
// };

// Chart options configuration
export const getChartOptions = () => {
  return {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear", // Make sure 'linear' is valid for the main y-axis
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Heart Rate (bpm)",
        },
        min: 40,
        max: 120,
      },
      y1: {
        type: "linear", // Make sure 'linear' is valid for the secondary y-axis
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        min: 34,
        max: 40,
        grid: {
          drawOnChartArea: false, // This hides the grid for this axis
        },
      },
      y2: {
        type: "linear", // Make sure 'linear' is valid for the third y-axis
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Oxygen Saturation (%)",
        },
        min: 80,
        max: 100,
        grid: {
          drawOnChartArea: false, // This hides the grid for this axis
        },
      },
    },
  };
};

// Prepare chart data from vitals data
// Prepare chart data from vitals data
export const prepareChartData = (filteredData) => {
  return {
    labels: filteredData.map((vital) =>
      new Date(vital.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Heart Rate (bpm)",
        data: filteredData.map((vital) => vital.heart_rate || null),
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        fill: true,
        yAxisID: "y", // Ensure this points to the main y-axis
      },
      {
        label: "Temperature (°C)",
        data: filteredData.map((vital) => vital.temperature || null),
        borderColor: "#33B5FF",
        backgroundColor: "rgba(51, 181, 255, 0.2)",
        fill: true,
        yAxisID: "y1", // Ensure this points to the secondary y-axis
      },
      {
        label: "Oxygen Saturation (%)",
        data: filteredData.map((vital) => vital.oxygen_saturation || null),
        borderColor: "#8BC34A",
        backgroundColor: "rgba(139, 195, 74, 0.2)",
        fill: true,
        yAxisID: "y2", // Ensure this points to the third y-axis
      },
    ],
  };
};
