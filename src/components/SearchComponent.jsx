import React from "react";
import { Search } from "lucide-react";

export const SearchComponent = ({ searchTerm, setSearchTerm }) => (
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
