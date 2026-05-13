# FleetHire AI ATS Dashboard

FleetHire AI is an AI-powered ATS (Applicant Tracking System) dashboard built for logistics and transportation recruiting workflows.

The platform analyzes PDF resumes using OpenAI and generates structured hiring insights for operational roles such as Truck Drivers, Dispatchers, Logistics Coordinators, and Fleet Managers.

This project was prepared as a recruiting intelligence prototype for Double Nickel.

[Youtube Demo Video](https://www.youtube.com/watch?v=XoAS-XNoQUY)

---

# Features

- PDF resume upload
- AI-powered resume analysis
- ATS-style hiring evaluation
- Structured recruiter insights
- Role-specific analysis logic
- Recruiter dashboard UI
- Risk flag detection
- Interview question generation
- Hiring recommendation support

---

# Supported Roles

- Truck Driver (CDL)
- Dispatcher
- Logistics Coordinator
- Fleet Manager

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS

## Backend

- Node.js
- Express.js
- Multer
- OpenAI API
- pdf-extraction

---

# AI Evaluation System

The system analyzes resumes using structured ATS-style evaluation logic.

The AI model evaluates:

- Required qualifications
- Skill relevance
- Experience alignment
- Reliability indicators
- Operational role fit
- Hiring risks

Instead of generating arbitrary numeric scores, the system focuses on recruiter decision support using structured analysis and contextual hiring signals.

---

# Example Output

```json
{
  "candidateProfile": {
    "roleFit": "Hire"
  },
  "summary": "Candidate has relevant truck driving experience and certifications.",
  "strengths": [
    "Long haul driving experience",
    "Vehicle maintenance knowledge"
  ],
  "weaknesses": [
    "CDL license not explicitly verified"
  ],
  "riskFlags": [],
  "interviewFocusAreas": [
    "Verify CDL status"
  ],
  "interviewQuestions": [
    "Can you describe your long haul experience?"
  ],
  "finalDecision": "Hire"
}
```



---

# API Endpoint

## Analyze Resume

```http
POST /analyze
```

### FormData

| Key | Type |
|---|---|
| resume | PDF File |
| role | String |

---

# Current Capabilities

- Upload and parse PDF resumes
- Extract structured candidate insights
- Generate recruiter-focused analysis
- Detect hiring concerns and missing qualifications
- Produce interview guidance

---

# Future Improvements

- Multi-candidate comparison dashboard
- Resume history tracking
- Authentication & recruiter accounts
- Database integration
- Drag-and-drop uploads
- Export recruiter reports
- Advanced logistics role intelligence

---

# About

This project was developed as an AI recruiting workflow prototype focused on logistics and transportation hiring operations.

The goal was to simulate ATS-style recruiter decision support using modern AI systems and structured resume analysis.
