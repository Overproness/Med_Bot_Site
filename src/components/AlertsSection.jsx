import React from "react";
import { Bell, Heart } from "lucide-react";

export const AlertsSection = ({ criticalAlerts }) => {
  if (criticalAlerts.length === 0) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex items-center mb-2">
        <Bell className="text-red-600 mr-2" size={20} />
        <h2 className="text-xl font-semibold text-red-600">Critical Alerts</h2>
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
};
