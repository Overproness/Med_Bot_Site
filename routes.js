// routes.js
import express from "express";
import { savePatientVitals, getPatientVitals } from "./controller.js";

const router = express.Router();

// Route to save patient vitals (POST request)
router.post("/vitals", savePatientVitals);

// Route to retrieve patient vitals by patient_id (GET request)
router.get("/vitals/:patient_id", getPatientVitals);

// Route to retrieve vitals for all patients (GET request)
router.get("/vitals", getAllPatientsVitals);
export default router;