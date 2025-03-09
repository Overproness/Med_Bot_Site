// model.js
import mongoose from "mongoose";

const patientVitalsSchema = new mongoose.Schema({
  patient_id: { type: String, required: true }, // Unique patient identifier
  timestamp: { type: Date, required: true }, // Timestamp of the vitals reading
  heart_rate: { type: Number, required: true }, // Heart rate in bpm
  blood_pressure: { type: String, required: true }, // Blood pressure as "120/80"
  temperature: { type: Number, required: true }, // Body temperature in Celsius
  oxygen_saturation: { type: Number, required: true }, // Oxygen saturation in percentage
  respiratory_rate: { type: Number }, // Optional: Respiratory rate
  ecg: { type: String }, // Optional: ECG data
  glucose_level: { type: Number }, // Optional: Glucose level
});

// Create the model
const PatientVitals = mongoose.model("PatientVitals", patientVitalsSchema);

export default PatientVitals;