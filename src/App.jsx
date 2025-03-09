import axios from "axios";
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
import {
  BarChart2,
  Bell,
  Clock,
  Droplet,
  Heart,
  Search,
  Thermometer,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [vitalsData, setVitalsData] = useState([]);
  const [criticalAlerts, setCriticalAlerts] = useState([]);
  const [latestUpdate, setLatestUpdate] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("allPatients"); // Default tab
  const [searchTerm, setSearchTerm] = useState("");

  // Function to simulate real-time updates
  const fetchDataWithInterval = () => {
    axios
      .get("https://med-bot-site.onrender.com/vitals")
      .then((response) => {
        setVitalsData(response.data);
        checkForCriticalConditions(response.data);
        setLatestUpdate(new Date().toLocaleTimeString());
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    // Initial data fetch
    fetchDataWithInterval();

    // Set up interval for real-time updates (every 30 seconds)
    const intervalId = setInterval(fetchDataWithInterval, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const checkForCriticalConditions = (data) => {
    const criticalData = data.filter((vital) => {
      return (
        vital.heart_rate < 60 ||
        vital.heart_rate > 100 ||
        vital.temperature < 35 ||
        vital.temperature > 38 ||
        vital.oxygen_saturation < 90
      );
    });

    setCriticalAlerts(criticalData);
  };

  // Get unique patient IDs for filtering
  const patientIds = [...new Set(vitalsData.map((vital) => vital.patient_id))];

  // Filter data for selected patient or show all
  const filteredData = selectedPatient
    ? vitalsData.filter((vital) => vital.patient_id === selectedPatient)
    : vitalsData;

  // Filter data based on search term
  const searchFilteredData = searchTerm
    ? vitalsData.filter(
        (vital) =>
          vital.patient_id.toString().includes(searchTerm) ||
          vital.heart_rate.toString().includes(searchTerm) ||
          vital.temperature.toString().includes(searchTerm) ||
          vital.oxygen_saturation.toString().includes(searchTerm) ||
          vital.blood_pressure.includes(searchTerm)
      )
    : vitalsData;

  // Function to determine status color based on vitals
  const getStatusColor = (vital) => {
    if (
      vital.heart_rate < 60 ||
      vital.heart_rate > 100 ||
      vital.temperature < 35 ||
      vital.temperature > 38 ||
      vital.oxygen_saturation < 90
    ) {
      return "bg-red-100 border-red-500";
    }
    return "bg-green-100 border-green-500";
  };

  // Function to get text color for specific vital
  const getVitalTextColor = (value, type) => {
    if (type === "heart_rate" && (value < 60 || value > 100))
      return "text-red-600 font-bold";
    if (type === "temperature" && (value < 35 || value > 38))
      return "text-red-600 font-bold";
    if (type === "oxygen" && value < 90) return "text-red-600 font-bold";
    return "text-green-600";
  };

  // Prepare data for trend chart
  const trendChartData = {
    labels: filteredData.map((vital) =>
      new Date(vital.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Heart Rate (bpm)",
        data: filteredData.map((vital) => vital.heart_rate),
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        fill: true,
        yAxisID: "y",
      },
      {
        label: "Temperature (°C)",
        data: filteredData.map((vital) => vital.temperature),
        borderColor: "#33B5FF",
        backgroundColor: "rgba(51, 181, 255, 0.2)",
        fill: true,
        yAxisID: "y1",
      },
      {
        label: "Oxygen Saturation (%)",
        data: filteredData.map((vital) => vital.oxygen_saturation),
        borderColor: "#8BC34A",
        backgroundColor: "rgba(139, 195, 74, 0.2)",
        fill: true,
        yAxisID: "y2",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear",
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
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        min: 34,
        max: 40,
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Oxygen (%)",
        },
        min: 80,
        max: 100,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  // Tab components
  const TabNavigation = () => (
    <div className="flex border-b border-gray-200 mb-6">
      <button
        className={`flex items-center py-3 px-6 font-medium text-sm rounded-t-lg ${
          activeTab === "allPatients"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setActiveTab("allPatients")}
      >
        <Users className="mr-2 h-5 w-5" />
        All Patients
      </button>
      <button
        className={`flex items-center py-3 px-6 font-medium text-sm rounded-t-lg ${
          activeTab === "graphs"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setActiveTab("graphs")}
      >
        <BarChart2 className="mr-2 h-5 w-5" />
        Graphs
      </button>
      <button
        className={`flex items-center py-3 px-6 font-medium text-sm rounded-t-lg ${
          activeTab === "searchPatients"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setActiveTab("searchPatients")}
      >
        <Search className="mr-2 h-5 w-5" />
        Search Patients
      </button>
    </div>
  );

  // Alerts Section Component
  const AlertsSection = () =>
    criticalAlerts.length > 0 && (
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex items-center mb-2">
          <Bell className="text-red-600 mr-2" size={20} />
          <h2 className="text-xl font-semibold text-red-600">
            Critical Alerts
          </h2>
        </div>
        <div className="bg-red-50 p-4 rounded-md">
          <ul className="divide-y divide-red-200">
            {criticalAlerts.map((alert, index) => (
              <li key={index} className="py-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
                      <Heart className="h-5 w-5 text-red-600" />
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-bold">
                        Patient {alert.patient_id}
                      </span>{" "}
                      has critical vitals
                    </p>
                    <p className="text-sm text-gray-700">
                      Time: {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      {alert.heart_rate < 60 || alert.heart_rate > 100 ? (
                        <span className="text-red-600">
                          Heart rate: {alert.heart_rate} bpm
                        </span>
                      ) : null}
                      {(alert.heart_rate < 60 || alert.heart_rate > 100) &&
                      (alert.temperature < 35 || alert.temperature > 38)
                        ? " | "
                        : ""}
                      {alert.temperature < 35 || alert.temperature > 38 ? (
                        <span className="text-red-600">
                          Temperature: {alert.temperature}°C
                        </span>
                      ) : null}
                      {(alert.heart_rate < 60 ||
                        alert.heart_rate > 100 ||
                        alert.temperature < 35 ||
                        alert.temperature > 38) &&
                      alert.oxygen_saturation < 90
                        ? " | "
                        : ""}
                      {alert.oxygen_saturation < 90 ? (
                        <span className="text-red-600">
                          O2: {alert.oxygen_saturation}%
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

  // Vitals Table Component
  const VitalsTable = ({ data }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Current Patient Vitals</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Patient ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  Heart Rate
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 mr-1" />
                  Blood Pressure
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-1" />
                  Temperature
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">O₂ Saturation</div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((vital, index) => (
              <tr key={index} className={getStatusColor(vital)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Patient {vital.patient_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getStatusColor(vital).includes("red") ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Critical
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Normal
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={getVitalTextColor(
                      vital.heart_rate,
                      "heart_rate"
                    )}
                  >
                    {vital.heart_rate} bpm
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {vital.blood_pressure}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={getVitalTextColor(
                      vital.temperature,
                      "temperature"
                    )}
                  >
                    {vital.temperature}°C
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={getVitalTextColor(
                      vital.oxygen_saturation,
                      "oxygen"
                    )}
                  >
                    {vital.oxygen_saturation}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(vital.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Patient Filter Component
  const PatientFilter = () => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Filter by Patient</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-md ${
            selectedPatient === null
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setSelectedPatient(null)}
        >
          All Patients
        </button>
        {patientIds.map((id) => (
          <button
            key={id}
            className={`px-4 py-2 rounded-md ${
              selectedPatient === id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedPatient(id)}
          >
            Patient {id}
          </button>
        ))}
      </div>
    </div>
  );

  // Search Component
  const SearchComponent = () => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex items-center mb-4">
        <Search className="text-gray-500 mr-2" size={20} />
        <h2 className="text-xl font-semibold">Search Patients</h2>
      </div>
      <div className="relative">
        <input
          type="text"
          className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by patient ID, vital signs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
      </div>
    </div>
  );

  // Last Updated Component
  const LastUpdated = () => (
    <div className="flex items-center justify-end mb-4 text-sm text-gray-600">
      <Clock className="mr-1 h-4 w-4" />
      Last updated: {latestUpdate}
    </div>
  );

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "allPatients":
        return (
          <>
            <AlertsSection />
            {/* <PatientFilter /> */}
            <VitalsTable data={filteredData} />
          </>
        );
      case "graphs":
        return (
          <>
            {/* <PatientFilter /> */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4">Vitals Trend</h2>
              <div className="h-96">
                <Line data={trendChartData} options={chartOptions} />
              </div>
            </div>
          </>
        );
      case "searchPatients":
        return (
          <>
            <SearchComponent />
            <VitalsTable data={searchFilteredData} />
          </>
        );
      default:
        return <div>Tab content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Patient Monitoring Dashboard
          </h1>
          <LastUpdated />
        </div>

        <TabNavigation />

        {renderTabContent()}
      </div>
    </div>
  );
};

export default App;
