// model.js
const mongoose = require("mongoose");

const patientVitalsSchema = new mongoose.Schema({
  patient_name: { type: String }, // Patient name
  timestamp: { type: Date, default: Date.now }, // Timestamp of the vitals reading (auto-generated)
  heart_rate: { type: Number }, // Heart rate in bpm
  blood_pressure: { type: String }, // Blood pressure as "120/80"
  temperature: { type: Number }, // Body temperature in Celsius
  oxygen_saturation: { type: Number }, // Oxygen saturation in percentage
  respiratory_rate: { type: Number }, // Respiratory rate
  ecg: { type: String }, // ECG data
  glucose_level: { type: Number }, // Glucose level
});

// Create the model
module.exports = mongoose.model("PatientVitals", patientVitalsSchema);
