import { useEffect, useState } from "react";
import { fetchVitalsData } from "./api/vitalService";
import { AlertsSection } from "./components/AlertsSection";
import { LastUpdated } from "./components/LastUpdated";
import { SearchComponent } from "./components/SearchComponent";
import { TabNavigation } from "./components/TabNavigation";
import { VitalsTable } from "./components/VitalsTable";
import { VitalsTrendChart } from "./components/VitalsTrendChart";
import "./styles/tailwind.css";
import { checkForCriticalConditions } from "./utils/vitalHelpers";

const App = () => {
  const [vitalsData, setVitalsData] = useState([]);
  const [criticalAlerts, setCriticalAlerts] = useState([]);
  const [latestUpdate, setLatestUpdate] = useState("");
  const [activeTab, setActiveTab] = useState("allPatients"); // Default tab
  const [searchTerm, setSearchTerm] = useState("");

  // Function to simulate real-time updates
  const fetchDataWithInterval = () => {
    fetchVitalsData()
      .then((data) => {
        setVitalsData(data);
        const alerts = checkForCriticalConditions(data);
        setCriticalAlerts(alerts);
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

  // Get unique patient names for filtering (for future use)
  const _PATIENT_NAMES = [
    ...new Set(
      vitalsData.map(
        (vital) => vital.patient_name || `Patient ${vital.patient_id}`
      )
    ),
  ];

  // Filter data for all patients (no individual patient filtering for now)
  const filteredData = vitalsData;

  // Filter data based on search term
  const searchFilteredData = searchTerm
    ? vitalsData.filter(
        (vital) =>
          (vital.patient_name || `Patient ${vital.patient_id}`)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (vital.heart_rate &&
            vital.heart_rate.toString().includes(searchTerm)) ||
          (vital.temperature &&
            vital.temperature.toString().includes(searchTerm)) ||
          (vital.oxygen_saturation &&
            vital.oxygen_saturation.toString().includes(searchTerm))
      )
    : vitalsData;

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "allPatients":
        return (
          <>
            <AlertsSection criticalAlerts={criticalAlerts} />
            {/* <PatientFilter 
              patientIds={patientIds} 
              selectedPatient={selectedPatient} 
              setSelectedPatient={setSelectedPatient} 
            /> */}
            <VitalsTable data={filteredData} />
          </>
        );
      case "graphs":
        return (
          <>
            {/* <PatientFilter 
              patientIds={patientIds} 
              selectedPatient={selectedPatient} 
              setSelectedPatient={setSelectedPatient} 
            /> */}
            <VitalsTrendChart data={filteredData} />
          </>
        );
      case "searchPatients":
        return (
          <>
            <SearchComponent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
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
          <LastUpdated latestUpdate={latestUpdate} />
        </div>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {renderTabContent()}
      </div>
    </div>
  );
};

export default App;
