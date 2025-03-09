import React from "react";
import { BarChart2, Search, Users } from "lucide-react";

export const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
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
};
