# StadiumMind AI - API Documentation

The StadiumMind AI Express backend exposes standard JSON endpoints. All routes are prefixed with `/api`.

---

## 1. System Health

### GET `/api/status`
* **Purpose**: Checks status of the API, environment metadata, uptime, and system time.
* **Method**: `GET`
* **Route**: `/api/status`
* **Request Body**: None (N/A)
* **Validation Rules**: None
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "StadiumMind AI API is fully operational",
    "timestamp": "2026-07-06T16:32:00Z",
    "uptime": 124.52,
    "environment": "development",
    "version": "1.0.0"
  }
  ```
* **Possible HTTP Status Codes**:
  * `200 OK`: Server is healthy.

---

## 2. Diagnostics & Analytics

### GET `/api/ai/metrics`
* **Purpose**: Fetches the in-memory array of AI execution logs (execution latency, prompt templates used, request success stats).
* **Method**: `GET`
* **Route**: `/api/ai/metrics`
* **Request Body**: None (N/A)
* **Validation Rules**: None
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "timestamp": "2026-07-16T17:35:10.123Z",
        "executionTime": 245,
        "responseSize": 182,
        "promptVersion": "crowdRiskPrompt_v1",
        "requestType": "Crowd Data Analysis",
        "success": true
      }
    ]
  }
  ```
* **Possible HTTP Status Codes**:
  * `200 OK`: Metrics returned.

---

### GET `/api/ai/health-gemini`
* **Purpose**: Verifies connectivity with the Google Gemini API.
* **Method**: `GET`
* **Route**: `/api/ai/health-gemini`
* **Request Body**: None (N/A)
* **Validation Rules**: None
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Connection to Google Gemini API (model: gemini-2.5-flash) validated successfully.",
    "model": "gemini-2.5-flash"
  }
  ```
* **Example Error Response (503 Service Unavailable)**:
  ```json
  {
    "success": false,
    "message": "Handshake failed: API key not set.",
    "model": "gemini-2.5-flash"
  }
  ```
* **Possible HTTP Status Codes**:
  * `200 OK`: Connection verified.
  * `503 Service Unavailable`: Gemini key missing or handshake rejected.

---

## 3. Crowd Analytics & Risk Assessment

### POST `/api/ai/analyze-crowd`
* **Purpose**: Evaluates live gate turnstile ingress data and crowd speed to determine stadium safety risk levels.
* **Method**: `POST`
* **Route**: `/api/ai/analyze-crowd`
* **Request Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "gateData": {
      "Gate A": { "occupancy": 85, "entryRate": 45 },
      "Gate B": { "occupancy": 40, "entryRate": 12 }
    },
    "crowdVelocity": {
      "Concourse B": 1.2
    }
  }
  ```
* **Validation Rules** (Zod - strict):
  * `gateData`: Optional object maps string keys to unknown parameters.
  * `crowdVelocity`: Optional object maps string keys to unknown parameters.
  * Extraneous body fields are rejected.
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "summary": "Congestion identified at Gate A.",
      "riskLevel": "Medium",
      "reasons": ["Gate A occupancy exceeds 80% threshold."],
      "actionChecklist": ["Dispatch additional stewards to Gate A."],
      "recommendedActions": ["Redirect incoming fans to Gate B."],
      "confidence": 98
    }
  }
  ```
* **Possible HTTP Status Codes**:
  * `200 OK`: Analysis successfully compiled (returns fallback payload on internal API call errors).
  * `400 Bad Request`: Payload validation failed (errors array provided).

---

### POST `/api/ai/predict-risk`
* **Purpose**: Predicts crowd congestion levels using telemetry sensors. (Intentional sandbox execution).
* **Method**: `POST`
* **Route**: `/api/ai/predict-risk`
* **Request Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "sensorData": {
      "Gate B": 30
    }
  }
  ```
* **Validation Rules** (Zod - strict):
  * `sensorData`: Optional object maps string keys to unknown parameters.
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "summary": "AI predictive risk analysis: Anticipating 15% occupancy surge at Gate A in the next 15 minutes based on arriving train lists.",
      "riskLevel": "Low",
      "reasons": ["Train arrivals schedules indicate surge."],
      "actionChecklist": ["Monitor Gate A entry rates."],
      "recommendedActions": ["Prepare Gate B as alternative."],
      "confidence": 90
    }
  }
  ```
* **Possible HTTP Status Codes**:
  * `200 OK`: Prediction compiled successfully.
  * `400 Bad Request`: Validation failure.

---

### POST `/api/ai/recommendations`
* **Purpose**: Recommends tournament operations adjustments based on situations. (Intentional sandbox execution).
* **Method**: `POST`
* **Route**: `/api/ai/recommendations`
* **Request Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "situation": "Storm warning at east stand",
    "resources": "50 volunteers"
  }
  ```
* **Validation Rules** (Zod - strict):
  * `situation`: Optional string.
  * `resources`: Optional string.
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "summary": "Recommendations generated for situation.",
      "riskLevel": "Low",
      "reasons": ["Volunteers available to redirect fans."],
      "actionChecklist": ["Prepare rain covers."],
      "recommendedActions": ["Relocate East Stand fans to West Concourse."],
      "confidence": 95
    }
  }
  ```

---

### POST `/api/ai/summarize-incident`
* **Purpose**: Summarizes stadium logs. (Intentional sandbox execution).
* **Method**: `POST`
* **Route**: `/api/ai/summarize-incident`
* **Request Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "incidentLogs": "14:15 - Section 108 medical report heat exhaustion"
  }
  ```
* **Validation Rules** (Zod - strict):
  * `incidentLogs`: Required property.
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "summary": "Summarized active medical logs: Incident Section 108 Row K paramedic dispatched for heat exhaustion. Status check: stable.",
      "riskLevel": "Medium",
      "reasons": ["Section 108 paramedic dispatched."],
      "actionChecklist": ["Confirm status update."],
      "recommendedActions": ["Monitor temperature levels."],
      "confidence": 95
    }
  }
  ```

---

## 4. Communications & Announcements

### POST `/api/ai/announcement`
* **Purpose**: Formulates general stadium voice scripts. (Intentional sandbox execution).
* **Method**: `POST`
* **Route**: `/api/ai/announcement`
* **Request Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "context": "Main ticket scanner offline"
  }
  ```
* **Validation Rules** (Zod - strict):
  * `context`: Required non-empty string.
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "summary": "Stadium communications dispatcher: Broadcast alert generated.",
      "riskLevel": "Low",
      "reasons": ["Context provided."],
      "actionChecklist": ["Broadcast PA announcement."],
      "recommendedActions": ["Instruct fans to prepare barcodes manually."],
      "confidence": 95,
      "announcement": {
        "english": "Safety alert: Main ticket scanner offline",
        "spanish": "Alerta de seguridad: Main ticket scanner offline",
        "french": "Alerte de sécurité: Main ticket scanner offline"
      }
    }
  }
  ```

---

### POST `/api/ai/generate-announcement`
* **Purpose**: Formulates multilingual (English, Spanish, French) safety announcements utilizing live Gemini prompt models.
* **Method**: `POST`
* **Route**: `/api/ai/generate-announcement`
* **Request Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "incidentType": "Gate Overcrowding",
    "location": "Gate B Concourse",
    "severity": "Medium",
    "description": "Slow barcode readers generating line bottlenecks.",
    "audience": "Incoming Fans",
    "tone": "Calm"
  }
  ```
* **Validation Rules** (Zod - strict):
  * All 6 inputs (`incidentType`, `location`, `severity`, `description`, `audience`, `tone`) are required non-empty strings.
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "summary": "AI generated multilingual announcement.",
      "riskLevel": "Medium",
      "reasons": ["Slow scans generating queue bottleneck."],
      "actionChecklist": ["Notify security teams.", "Deploy extra stewards."],
      "recommendedActions": ["Redirect fans to alternate turnstiles."],
      "confidence": 95,
      "announcement": {
        "english": "Attention fans at Gate B: Please prepare your tickets beforehand. Scan delays are causing queues. We appreciate your patience.",
        "spanish": "Atención fanáticos en la Puerta B: Prepare sus boletos. Los retrasos causan filas. Agradecemos su paciencia.",
        "french": "Attention supporters à la Porte B : Veuillez préparer vos billets. Les retards causent des files d'attente. Merci de votre patience."
      }
    }
  }
  ```
* **Possible HTTP Status Codes**:
  * `200 OK`: Successfully generated script (returns standard local fallback translations if API key is missing).
  * `400 Bad Request`: One or more validation parameters are missing.

---

## 5. CSV Data Ingestion Pipelines

### POST `/api/ai/parse-csv`
* **Purpose**: Validates, parses, and compiles statistical summaries over uploaded CSV telemetry spreadsheets.
* **Method**: `POST`
* **Route**: `/api/ai/parse-csv`
* **Request Headers**: `Content-Type: multipart/form-data`
* **Request Body**: File attachment under key `file`.
* **Validation Rules** (Multer):
  * Only files ending in `.csv` are accepted.
  * MIME type must match `text/csv`, `application/csv`, or `application/vnd.ms-excel`.
  * Maximum size is `2MB`.
  * CSV headers must contain all of: `Timestamp`, `Gate`, `Occupancy`, `EntryRate`, `Weather`, `Volunteers`, `MedicalIncidents` (case-insensitive).
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "CSV file parsed and validated successfully.",
    "data": {
      "totalRecords": 24,
      "averageOccupancy": 76,
      "maxOccupancy": 92,
      "maxOccupancyGate": "Gate A",
      "averageEntryRate": 15,
      "totalMedical": 1,
      "totalVolunteers": 12,
      "uniqueGates": ["Gate A", "Gate B"],
      "weatherSummary": "Clear, Rain expected",
      "congestedGates": ["Gate A"]
    }
  }
  ```
* **Example Error Response (400 Bad Request)**:
  ```json
  {
    "success": false,
    "message": "CSV is missing required column: volunteers"
  }
  ```
* **Possible HTTP Status Codes**:
  * `200 OK`: File parsed successfully.
  * `400 Bad Request`: File type, size, header validation, or parsing rules failed.

---

### POST `/api/ai/analyze-stats`
* **Purpose**: Analyzes parsed CSV statistics using Google Gemini model checks to compile audit compliance reports.
* **Method**: `POST`
* **Route**: `/api/ai/analyze-stats`
* **Request Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "stats": {
      "totalRecords": 24,
      "averageOccupancy": 76,
      "maxOccupancy": 92,
      "maxOccupancyGate": "Gate A",
      "averageEntryRate": 15,
      "totalMedical": 1,
      "totalVolunteers": 12,
      "uniqueGates": ["Gate A", "Gate B"],
      "weatherSummary": "Clear, Rain expected",
      "congestedGates": ["Gate A"]
    }
  }
  ```
* **Validation Rules** (Zod - strict):
  * `stats` object containing specific numeric/string properties is required.
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Operational telemetry analysis report generated.",
    "data": {
      "summary": "Gemini CSV review: Key gate bottlenecks flagged at Gate A.",
      "riskLevel": "High",
      "reasons": ["Peak occupancy exceeded 90% at Gate A."],
      "actionChecklist": ["Deploy extra queue stewards.", "Trigger transit alerts."],
      "recommendedActions": ["Redirect arrivals to Gate B."],
      "confidence": 98
    }
  }
  ```

---

## 6. History Auditing

### GET `/api/ai/history`
* **Purpose**: Returns the in-memory array of logged operational decisions and actions accepted or rejected by managers.
* **Method**: `GET`
* **Route**: `/api/ai/history`
* **Request Body**: None (N/A)
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "dec-101",
        "timestamp": "2026-07-06T14:00:00Z",
        "gate": "Gate B",
        "occupancy": 82,
        "entryRate": 42,
        "weather": "Rain",
        "volunteerCount": 4,
        "medicalIncidents": 0,
        "trainDelay": true,
        "riskLevel": "High",
        "reasons": [
          "Occupancy exceeds 80% with rain conditions.",
          "Incoming transit delay creates surge potential."
        ],
        "actionChecklist": [
          "Open auxiliary gate turnstiles.",
          "Broadcast queue warnings.",
          "Dispatch 2 stewards."
        ],
        "accepted": true,
        "executionStatus": "Executed"
      }
    ]
  }
  ```

---

### POST `/api/ai/history/:id/outcome`
* **Purpose**: Saves the accept/reject outcome selection, notes, and actual outcomes for an operational decision.
* **Method**: `POST`
* **Route**: `/api/ai/history/:id/outcome`
* **Request Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "accepted": true,
    "executionStatus": "Executed",
    "notes": "Redirection broadcast dispatched at 14:05.",
    "actualOutcome": "Successfully resolved congestion at Gate B."
  }
  ```
* **Validation Rules** (Zod - strict):
  * `accepted`: Required boolean.
  * `executionStatus`: Optional enum string (`'Pending' | 'Executed' | 'Cancelled'`).
  * `notes`: Optional string.
  * `actualOutcome`: Optional string.
* **Example Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Decision outcome logged successfully.",
    "data": {
      "id": "dec-101",
      "accepted": true,
      "executionStatus": "Executed",
      "organizerNotes": "Redirection broadcast dispatched at 14:05.",
      "actualOutcome": "Successfully resolved congestion at Gate B."
    }
  }
  ```
* **Example Error Response (404 Not Found)**:
  ```json
  {
    "success": false,
    "message": "Decision with ID dec-999 not found."
  }
  ```
* **Possible HTTP Status Codes**:
  * `200 OK`: Outcome successfully updated.
  * `400 Bad Request`: Missing or invalid properties.
  * `404 Not Found`: Decision log with ID not found.
