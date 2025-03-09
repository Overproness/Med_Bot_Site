import React, { useState, useEffect } from 'react';
import sampleData from './data.json';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(sampleData);
  }, []);

  return (
    <>
      <h1>Patient Data</h1>
      {data.map((patient) => (
        <div key={patient.patient_id} className="patient">
          <p><strong>Patient ID:</strong> {patient.patient_id}</p>
          <p><strong>Timestamp:</strong> {new Date(patient.timestamp).toLocaleString()}</p>
          <p><strong>Heart Rate:</strong> {patient.heart_rate} bpm</p>
          <p><strong>Blood Pressure:</strong> {patient.blood_pressure}</p>
          <p><strong>Temperature:</strong> {patient.temperature} &#8451;</p>
          <p><strong>Oxygen Saturation:</strong> {patient.oxygen_saturation} %</p>
        </div>
      ))}
    </>
  );
}

export default App;
