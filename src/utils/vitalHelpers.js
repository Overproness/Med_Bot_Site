// Function to check for critical conditions in vitals data
export const checkForCriticalConditions = (data) => {
  return data.filter((vital) => {
    return (
      (vital.heart_rate && (vital.heart_rate < 60 || vital.heart_rate > 100)) ||
      (vital.temperature &&
        (vital.temperature < 35 || vital.temperature > 38)) ||
      (vital.oxygen_saturation && vital.oxygen_saturation < 90)
    );
  });
};

// Function to determine status color based on vitals
export const getStatusColor = (vital) => {
  if (
    (vital.heart_rate && (vital.heart_rate < 60 || vital.heart_rate > 100)) ||
    (vital.temperature && (vital.temperature < 35 || vital.temperature > 38)) ||
    (vital.oxygen_saturation && vital.oxygen_saturation < 90)
  ) {
    return "bg-red-100 border-red-500";
  }
  return "bg-green-100 border-green-500";
};

// Function to get text color for specific vital
export const getVitalTextColor = (value, type) => {
  if (!value) return "text-gray-400";
  if (type === "heart_rate" && (value < 60 || value > 100))
    return "text-red-600 font-bold";
  if (type === "temperature" && (value < 35 || value > 38))
    return "text-red-600 font-bold";
  if (type === "oxygen" && value < 90) return "text-red-600 font-bold";
  return "text-green-600";
};
