# StadiumMind AI - API Documentation

The Express.js backend exposes standard JSON endpoints. All routes are prefixed with `/api`.

## 1. System Health

### GET `/api/status`
Returns service status, environment, uptime and current datetime.

* **Response (200 OK)**:
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

---

## 2. Artificial Intelligence Sandbox

### POST `/api/ai/chat`
Interface with the Gemini AI model sandbox. (Will connect to Google Gemini API).

* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "message": "What is the optimal evacuation route for Section 202?",
  "context": {
    "role": "fan",
    "location": "Section 202"
  }
}
```
* **Response (200 OK)**:
```json
{
  "success": true,
  "text": "Sandbox Response: API key not set. Received prompt: \"What is the optimal evacuation route for Section 202?\". Ready for Gemini API.",
  "metadata": {
    "sandbox": true
  }
}
```
