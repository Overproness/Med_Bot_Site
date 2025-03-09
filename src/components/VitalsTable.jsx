import React from "react";
import {
  Heart,
  Droplet,
  Thermometer,
  Wind,
  Activity,
  Droplets,
} from "lucide-react";
import { getStatusColor, getVitalTextColor } from "../utils/vitalHelpers";

export const VitalsTable = ({ data }) => (
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
              <div className="flex items-center">
                <Wind className="h-4 w-4 mr-1" />
                Resp. Rate
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                ECG
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div className="flex items-center">
                <Droplets className="h-4 w-4 mr-1" />
                Glucose
              </div>
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
                  className={getVitalTextColor(vital.heart_rate, "heart_rate")}
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
                {vital.respiratory_rate
                  ? `${vital.respiratory_rate} /min`
                  : "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {vital.ECG || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {vital.glucose_level ? `${vital.glucose_level} mg/dL` : "-"}
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
