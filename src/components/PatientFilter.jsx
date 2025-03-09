import React from "react";

export const PatientFilter = ({
  patientIds,
  selectedPatient,
  setSelectedPatient,
}) => (
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
