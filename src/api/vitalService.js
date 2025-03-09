import axios from "axios";

// Function to fetch vitals data from the API
export const fetchVitalsData = async () => {
  try {
    const response = await axios.get(
      "https://med-bot-site.onrender.com/vitals"
    );
    if (response) {
      if (response.data.data) return response.data.data;
      else if (response.data) return response.data;
    }
  } catch (error) {
    console.error("Error fetching vitals data:", error);
    throw error;
  }
};
