import axios from "axios";

// Function to fetch vitals data from the API
export const fetchVitalsData = async () => {
  try {
    const response = await axios.get(
      "https://med-bot-site.onrender.com/vitals"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching vitals data:", error);
    throw error;
  }
};
