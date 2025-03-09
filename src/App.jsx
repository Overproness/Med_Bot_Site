import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import 'tailwindcss/tailwind.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const App = () => {
  const [vitalsData, setVitalsData] = useState([]);
  const [criticalAlerts, setCriticalAlerts] = useState([]);

  useEffect(() => {
    // Fetch data from the data.json file located in the public folder
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setVitalsData(data);
        checkForCriticalConditions(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const checkForCriticalConditions = (data) => {
    const criticalData = data.filter((vital) => {
      return (
        vital.heart_rate < 60 || vital.heart_rate > 100 ||
        vital.temperature < 35 || vital.temperature > 38 ||
        vital.oxygen_saturation < 90
      );
    });

    setCriticalAlerts(criticalData);
  };

  const trendChartData = {
    labels: vitalsData.map(vital => new Date(vital.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Heart Rate',
        data: vitalsData.map(vital => vital.heart_rate),
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        fill: true,
      },
      {
        label: 'Temperature',
        data: vitalsData.map(vital => vital.temperature),
        borderColor: '#33B5FF',
        backgroundColor: 'rgba(51, 181, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Oxygen Saturation',
        data: vitalsData.map(vital => vital.oxygen_saturation),
        borderColor: '#8BC34A',
        backgroundColor: 'rgba(139, 195, 74, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Patient Vitals Dashboard</h1>

      {/* Alerts Section */}
      <div className="mb-6">
        {criticalAlerts.length > 0 && (
          <div className="text-red-600 bg-red-100 p-4 rounded-md mb-4">
            <h2 className="font-semibold">Critical Alerts</h2>
            <ul>
              {criticalAlerts.map((alert, index) => (
                <li key={index} className="text-sm">
                  <span className="font-semibold">{alert.patient_id}</span> has critical vitals at{' '}
                  <span className="text-gray-700">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Vitals Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vitalsData.map((vital, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg bg-white ${vital.heart_rate < 60 || vital.heart_rate > 100 ? 'border-4 border-red-500' : 'border-4 border-green-500'}`}
          >
            <h3 className="text-xl font-semibold">Patient {vital.patient_id}</h3>
            <p className="mt-2">Heart Rate: <span className={vital.heart_rate < 60 || vital.heart_rate > 100 ? 'text-red-500' : 'text-green-500'}>{vital.heart_rate} bpm</span></p>
            <p>Blood Pressure: {vital.blood_pressure}</p>
            <p>Temperature: <span className={vital.temperature < 35 || vital.temperature > 38 ? 'text-red-500' : 'text-green-500'}>{vital.temperature} °C</span></p>
            <p>Oxygen Saturation: <span className={vital.oxygen_saturation < 90 ? 'text-red-500' : 'text-green-500'}>{vital.oxygen_saturation} %</span></p>
          </div>
        ))}
      </div> */}

      {/* Trend Analysis Chart */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Vitals Trend Analysis</h2>
        <Line data={trendChartData} />
      </div>
    </div>
  );
};

export default App;
