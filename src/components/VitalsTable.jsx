import { Heart, Thermometer } from "lucide-react";
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
              Patient Name
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
                <Heart className="h-4 w-4 mr-1" />
                Heart Rate
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((vital, index) => (
            <tr key={index} className={getStatusColor(vital)}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {vital.patient_name || `Patient ${vital.patient_id}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={getVitalTextColor(
                    vital.oxygen_saturation,
                    "oxygen"
                  )}
                >
                  {vital.oxygen_saturation
                    ? `${vital.oxygen_saturation}%`
                    : "-"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={getVitalTextColor(vital.heart_rate, "heart_rate")}
                >
                  {vital.heart_rate ? `${vital.heart_rate} bpm` : "-"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={getVitalTextColor(
                    vital.temperature,
                    "temperature"
                  )}
                >
                  {vital.temperature ? `${vital.temperature}°C` : "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
