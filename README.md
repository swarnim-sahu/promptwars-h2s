# StadiumMind AI

> **The AI Command Center for FIFA World Cup 2026**  
> A professional Explainable AI Operations Copilot built for the Google PromptWars Hackathon.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-cyan?style=for-the-badge&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.19-gray?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.1_Flash_Lite-orange?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)
[![Vite](https://img.shields.io/badge/Vite-5.2-purple?style=for-the-badge&logo=vite)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)

---

## PromptWars Submission

- **Challenge Vertical**: Smart Stadiums & Tournament Operations
- **Primary Persona**: Stadium Operations Manager / Tournament Organizer
- **Alignment**: This project provides a production-grade operations command center for World Cup organizers. It leverages Google Gemini to automate crowd risk evaluations, explain advisory logic using numbered reason badges, translate PA emergency announcer scripts, and export audit trails.

---

## 1. Problem Statement

Coordinating stadium logistics at a FIFA-scale event involves navigating high-pressure, multi-dimensional challenges:
- **Crowd Congestion & Bottlenecks**: Rapid spikes in spectator arrivals from regional shuttle networks generate severe queues at gate turnstiles and walkway corridors.
- **Emergency Incidents**: Medical emergencies, security alerts, and facility breakdowns must be resolved immediately to avoid crowd surges.
- **Volunteer Coordination**: Assigning volunteer stewards dynamically based on congestion patterns is highly complex.
- **Multilingual Communications**: Relaying safety instructions to international fans in their native languages is prone to translation delays.
- **Transportation Coordination**: Train and bus delays must propagate into gate entry adjustments.

### Why Traditional Dashboards Fail
Traditional monitoring dashboards display raw numbers (e.g. occupancy counts, latencies) but behave like passive databases. They lack the reasoning capability to correlate these indicators. Without AI assistance, managers must perform manual diagnostics under extreme stress, leading to cognitive overload and delayed emergency response times.

---

## 2. Solution

StadiumMind AI acts as a neural operations copilot, bridging the gap between passive sensors and real-world coordination. By leveraging Google Gemini, it:
1. Translates live telemetry arrays into actionable safety assessments.
2. Explains the operational reasoning behind every recommendation.
3. Automates the generation of calm, safety-focused multilingual PA scripts.
4. Generates structured JSON reports for audit export compliance.

---

## 3. Why Generative AI?

Rather than relying on simple hardcoded threshold rules, StadiumMind AI uses Google Gemini to perform multi-variable operational diagnostics:
- **Dynamic Reasoning**: Evaluates how weather warnings, volunteer levels, and transport delays compound gate occupancy metrics.
- **Explainable Justification**: Explicitly details *why* a particular redirection or steward dispatch is advised, rather than just issuing blind directives.
- **Multilingual PA Generation**: Generates calm, safety-focused stadium voice broadcasts under 80 words in English, Spanish, and French, avoiding alarmist words that could trigger panic.
- **Structured Data Enforcement**: Guarantees JSON outputs using Gemini MIME forcing, ensuring seamless frontend visualization without parsing errors.

### Why Rule-Based Systems Fail
A rule-based system requires writing thousands of nested conditions (e.g., *if occupancy > 80% and volunteers < 5 and rain = true...*). Such systems fail when encountering complex, fuzzy matchday realities. Gemini handles these variables holistically, formulating context-aware suggestions in real time.

---

## 4. Key Features

| Feature | Description |
| :--- | :--- |
| **AI Crowd Risk Analysis** | Evaluates occupancy, entry rates, weather, and incidents to determine risk status. |
| **Explainable AI Reasoning** | Displays reasoning cards prepended with explicit "Reason 1, 2, 3" badges. |
| **CSV Telemetry Ingest** | Uploads matchday spreadsheets parsed on the backend to avoid API token bloat. |
| **Operational Analytics** | Renders parsed stats summaries (Average Occupancy, Hotspots, Medical Logs). |
| **Multilingual PA Generator** | Generates PA scripts in English, Español, and Français matching targets. |
| **Audience & Tone Configuration** | Customizes scripts based on target teams (Security, Volunteers) and mood tones. |
| **Compliance Report Export** | Downloads generated AI responses directly as structured `.json` reports. |
| **Keyboard Accessibility** | Supports keydown triggers and full ARIA descriptions on drag-and-drop cards. |
| **Transient Error Containment** | Implements execution timeout racing and exponential backoff retries. |

---

## 5. System Architecture

```text
+-------------------------------------------------------------+
|                        Landing Page                         |
+-------------------------------------------------------------+
                              | (Launch)
                              v
+-------------------------------------------------------------+
|                 Operations Center Dashboard                 |
+-------------------------------------------------------------+
      | (Upload Telemetry)                 | (Incident Details)
      v                                    v
+-----------------------------+      +------------------------+
|   POST /api/ai/parse-csv    |      | POST /generate-ann...  |
+-----------------------------+      +------------------------+
      | (PapaParse Engine)                 | (Audience + Tone config)
      v                                    v
+-----------------------------+      +------------------------+
|   POST /api/ai/analyze-stats|      |      Google Gemini     |
+-----------------------------+      +------------------------+
      |                                    | (MIME application/json)
      +-----------------+------------------+
                        |
                        v
+-------------------------------------------------------------+
|                 Structured responseValidator                |
+-------------------------------------------------------------+
                        | (Verify schemas & UTC logs)
                        v
+-------------------------------------------------------------+
|                 Explainable Decision Panel                  |
|          [Checklists | Reasons | JSON Export | PA]          |
+-------------------------------------------------------------+
```

---

## 6. Technology Stack

- **Frontend**: React (v18.3) SPA, Vite (v5.2), TypeScript, Vanilla CSS
- **Animations**: Framer Motion (v11.2)
- **Icons**: Lucide React
- **Backend**: Node.js, Express.js (v4.19), TypeScript
- **CSV Parser**: PapaParse (v5.4)
- **AI Integration**: Official `@google/genai` SDK
- **Model**: `gemini-3.1-flash-lite` (configured via env variables)

---

## 7. Folder Structure

```text
stadiummind-ai/
├── backend/
│   ├── src/
│   │   ├── config/          # Gemini configuration and env variables validation
│   │   ├── controllers/     # Express route handlers (parsing, analytics controllers)
│   │   ├── middleware/      # Error handling middleware
│   │   ├── routes/          # Express route mounts (/status, /ai/*)
│   │   ├── services/        # Gemini API orchestration, prompt builder, validator
│   │   ├── shared/          # Centralized mock data payloads
│   │   └── types/           # Strong type definitions (ai.ts, index.ts)
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ai/          # Reusable Explainable AI components
│   │   │   ├── landing/     # Landing page section layouts
│   │   │   └── operations/  # Operations Dashboard panels (upload card, decision card)
│   │   ├── context/         # App level state (theme, user roles)
│   │   ├── layouts/         # Master layouts (AppLayout)
│   │   ├── pages/           # Page routers (Operations Center, prototypes)
│   │   ├── services/        # Client API services (geminiService, apiClient)
│   │   └── types/           # Type declarations
│   └── vite.config.ts
└── README.md
```

---

## 8. Screenshots

### Landing Page
![Landing Page Mockup](./docs/screenshots/landing-page.png)

### Operations Dashboard
![Operations Command Center Mockup](./docs/screenshots/operations-dashboard.png)

### CSV Analytics & Ingest
![CSV Upload Preview Mockup](./docs/screenshots/csv-analytics.png)

### PA Announcement Generator
![Multilingual Announcement Preview Mockup](./docs/screenshots/announcement-generator.png)

---

## 9. Installation & Local Setup

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed on your machine.

### 2. Clone Repository
```bash
git clone https://github.com/swarnim-sahu/promptwars-h2s.git
cd promptwars-h2s
```

### 3. Install Dependencies

Install packages in the frontend:
```bash
cd frontend
npm install
```

Install packages in the backend:
```bash
cd ../backend
npm install
```

### 4. Environment Variables

Create a `.env` file in the `/backend` directory:
```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=YOUR_SECURE_GEMINI_API_KEY
GEMINI_MODEL=gemini-3.1-flash-lite
```

Create a `.env` file in the `/frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Running the Application

Start the backend server:
```bash
cd backend
npm run dev
```
The backend server runs at `http://localhost:5000`.

Start the frontend server:
```bash
cd ../frontend
npm run dev
```
The client dashboard opens at `http://localhost:5173`.

---

## 10. The Intended Demonstration Flow

Judges can follow this 2-minute demonstration flow:
1. **Open Dashboard**: Launch the Operations Command Center page.
2. **Upload Stadium Telemetry**: Drag and drop a stadium telemetry log file (`.csv`) into the uploader card.
3. **Analyze with Gemini**: Click *Analyze Stats with Gemini AI* to query the safety engine.
4. **Review Explainable AI**: Review the advisory checklist and the detailed **Reason 1, 2, 3** cards showing the model's logic.
5. **Generate Emergency Announcement**: Set incident criteria (e.g. lost child), customize the audience and tone, and generate bilingual PA script announcements.
6. **Export Report**: Click *Export AI Report* inside the Copilot card to download the final compliance JSON logs.

---

## 11. API Endpoints Reference

<details>
<summary><b>Telemetry Ingestion API</b></summary>

- `POST /api/ai/parse-csv`  
  *Headers*: `Content-Type: multipart/form-data`  
  *Payload*: Telemetry CSV file.  
  *Returns*: Summary statistics JSON (Average Occupancy, Hotspots list, Volunteers).

- `POST /api/ai/analyze-stats`  
  *Headers*: `Content-Type: application/json`  
  *Payload*: `{ "stats": { ...Summary stats object... } }`  
  *Returns*: Structured `AIResponse` JSON containing risk levels, checklists, and reason arrays.
</details>

<details>
<summary><b>Operational Core API</b></summary>

- `POST /api/ai/analyze-crowd`  
  *Payload*: `{ "gateData": { ... }, "crowdVelocity": { ... } }`  
  *Returns*: Structured `AIResponse`.

- `POST /api/ai/predict-risk`  
  *Payload*: `{ "sensorData": { ... } }`  
  *Returns*: Prediction statistics.

- `POST /api/ai/recommendations`  
  *Payload*: `{ "situation": "...", "resources": "..." }`  
  *Returns*: AI recommendations.
</details>

<details>
<summary><b>Emergency Comms API</b></summary>

- `POST /api/ai/generate-announcement`  
  *Payload*: `{ "incidentType": "...", "location": "...", "severity": "...", "description": "...", "audience": "...", "tone": "..." }`  
  *Returns*: Multilingual PA announcements (EN, ES, FR) and translation confidence levels.

- `POST /api/ai/summarize-incident`  
  *Payload*: `{ "incidentLogs": "..." }`  
  *Returns*: Incident synthesis.
</details>

<details>
<summary><b>Logs & Health API</b></summary>

- `GET /api/ai/history`  
  *Returns*: History audit database array.

- `POST /api/ai/history/:id/outcome`  
  *Payload*: `{ "accepted": true, "notes": "..." }`  
  *Returns*: Log status confirmation.

- `GET /api/ai/metrics`  
  *Returns*: AI performance logs.

- `GET /api/ai/health-gemini`  
  *Returns*: Diagnostics connectivity handshake check.
</details>

---

## 12. Future Scope

StadiumMind AI is designed to scale into a unified tournament platform:
- **Volunteer Companion App**: A dedicated mobile companion assigning local tasks directly to stewards.
- **IoT Sensors Integration**: Ingesting live Bluetooth beacon and turnstile sensor streams.
- **CCTV Computer Vision**: Combining Gemini Multimodal models with live camera feeds for real-time crowd counting.
- **Evacuation Simulations**: Simulating dynamic evacuation path closures using generative reasoning.

---

## 13. Contributors

- **Swarnim Sahu** - Lead System Architect & Prompt Engineer - [GitHub Profile](https://github.com/swarnim-sahu)

---

## 14. License

This project is licensed under the MIT License - see the LICENSE file for details.
