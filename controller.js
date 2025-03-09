// controller.js
import PatientVitals from "./model.js";

// Save patient vitals data
const savePatientVitals = async (req, res) => {
  try {
    const vitalsData = req.body; // Data sent by the robot in JSON format
    const newVitals = new PatientVitals(vitalsData); // Create a new document
    await newVitals.save(); // Save the document to MongoDB
    res.status(201).json({ message: "Patient vitals saved successfully", data: newVitals });
  } catch (error) {
    res.status(500).json({ message: "Error saving patient vitals", error: error.message });
  }
};

// Retrieve patient vitals by patient_id
 const getPatientVitals = async (req, res) => {
  try {
    const patientId = req.params.patient_id; // Get patient_id from URL params
    const vitals = await PatientVitals.find({ patient_id: patientId }).sort({ timestamp: -1 }); // Fetch data and sort by latest first
    res.status(200).json({ message: "Patient vitals retrieved successfully", data: vitals });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving patient vitals", error: error.message });
  }
};


// Fetch data for all patients
const getAllPatientsVitals = async (req, res) => {
    try {
      const allVitals = await PatientVitals.find().sort({ timestamp: -1 }); // Fetch all data and sort by latest first
      res.status(200).json({ message: "All patient vitals retrieved successfully", data: allVitals });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving all patient vitals", error: error.message });
    }
  };


module.exports = { savePatientVitals, getPatientVitals, getAllPatientsVitals};
