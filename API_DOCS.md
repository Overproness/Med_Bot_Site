# Medical Bot API Documentation

## Base URL

```
https://med-bot-site.onrender.com
```

## Endpoints

### 1. Save Patient Vitals

**POST** `/vitals`

Save new patient vital signs data.

**Request Body:**

```json
{
  "patient_name": "John Doe",
  "heart_rate": 75,
  "blood_pressure": "120/80",
  "temperature": 36.5,
  "oxygen_saturation": 98,
  "respiratory_rate": 16,
  "ecg": "Normal sinus rhythm",
  "glucose_level": 95
}
```

**Response (201):**

```json
{
  "message": "Patient vitals saved successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "patient_name": "John Doe",
    "timestamp": "2025-07-05T10:30:00.000Z",
    "heart_rate": 75,
    "blood_pressure": "120/80",
    "temperature": 36.5,
    "oxygen_saturation": 98,
    "respiratory_rate": 16,
    "ecg": "Normal sinus rhythm",
    "glucose_level": 95
  }
}
```

### 2. Get Patient Vitals by Name

**GET** `/vitals/:patient_name`

Retrieve all vital signs for a specific patient, sorted by latest first.

**Parameters:**

- `patient_name` (string): The name of the patient

**Response (200):**

```json
{
  "message": "Patient vitals retrieved successfully",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "patient_name": "John Doe",
      "timestamp": "2025-07-05T10:30:00.000Z",
      "heart_rate": 75,
      "blood_pressure": "120/80",
      "temperature": 36.5,
      "oxygen_saturation": 98,
      "respiratory_rate": 16,
      "ecg": "Normal sinus rhythm",
      "glucose_level": 95
    }
  ]
}
```

### 3. Get All Patients Vitals

**GET** `/vitals`

Retrieve vital signs for all patients, sorted by latest first.

**Response (200):**

```json
{
  "message": "All patient vitals retrieved successfully",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "patient_name": "John Doe",
      "timestamp": "2025-07-05T10:30:00.000Z",
      "heart_rate": 75,
      "blood_pressure": "120/80",
      "temperature": 36.5,
      "oxygen_saturation": 98,
      "respiratory_rate": 16,
      "ecg": "Normal sinus rhythm",
      "glucose_level": 95
    },
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "patient_name": "Jane Smith",
      "timestamp": "2025-07-05T09:15:00.000Z",
      "heart_rate": 82,
      "blood_pressure": "118/76",
      "temperature": 36.7,
      "oxygen_saturation": 97,
      "respiratory_rate": 18,
      "ecg": "Normal",
      "glucose_level": 88
    }
  ]
}
```

## Data Model

### Patient Vitals

| Field               | Type   | Required | Description                     |
| ------------------- | ------ | -------- | ------------------------------- |
| `patient_name`      | String | No       | Patient's full name             |
| `timestamp`         | Date   | No       | Auto-generated timestamp        |
| `heart_rate`        | Number | No       | Heart rate in beats per minute  |
| `blood_pressure`    | String | No       | Blood pressure (e.g., "120/80") |
| `temperature`       | Number | No       | Body temperature in Celsius     |
| `oxygen_saturation` | Number | No       | Oxygen saturation percentage    |
| `respiratory_rate`  | Number | No       | Breaths per minute              |
| `ecg`               | String | No       | ECG reading/notes               |
| `glucose_level`     | Number | No       | Blood glucose level             |

## Error Responses

**400 Bad Request:**

```json
{
  "message": "Error saving patient vitals",
  "error": "Validation error message"
}
```

**500 Internal Server Error:**

```json
{
  "message": "Error retrieving patient vitals",
  "error": "Database connection error"
}
```

## Notes

- All fields in the data model are optional
- Timestamp is automatically generated when saving new vitals
- Data is sorted by timestamp in descending order (latest first)
- CORS is enabled for all origins
