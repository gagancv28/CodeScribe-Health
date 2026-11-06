# CodeScribe Health — Longitudinal Patient Case-Taking Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Patient%20App%20%7C%20Doctor%20Portal-2563eb.svg)](#)
[![Hackathon](https://img.shields.io/badge/Smart%20India%20Hackathon-SIH26047-green.svg)](#)

> **Ministry of Ayush / Smart India Hackathon 2026**  
> **Problem Statement SIH26047**: Longitudinal Patient Case-Taking Software

---

## 1. Overview & Problem Statement

In conventional Out-Patient Departments (OPD), patients often have to repeatedly describe their symptoms, medical history, and allergies across multiple hospital visits. Crucial medical details, past prescriptions, and allergy warnings are frequently lost in paper files.

**CodeScribe Health** bridges the patient and the physician with an interconnected digital workflow:

- **Patient Experience (`index.html`)**: Mobile-first application for patients to link their ABHA digital health ID, record symptoms using natural voice or text in regional languages (Kannada, Hindi, English, Tamil, Telugu), book OPD appointments, and view doctor-verified prescriptions.
- **Doctor Experience (`doctor.html`)**: Desktop-first clinical workstation where physicians view incoming OPD queues, inspect structured clinical handoffs (including genuine audio recordings), dictation/OCR workbench, and formally sign off on digital prescriptions.

---

## 2. Core Architectural Principles

1. **NO REPETITION**: The doctor reviews the structured clinical summary before the patient sits down.
2. **GENUINE MEDIA (RULE #11)**: Audio recordings are stored as genuine audio streams/blobs. If an audio recording is unavailable, it is explicitly indicated rather than displaying a non-functional mock player.
3. **SEPARATION OF OCR & CLINICAL PARSER (RULE #20 & #21)**: Image text extraction is decoupled from clinical regimen parsing.
4. **MANDATORY DOCTOR VERIFICATION (RULE #23)**: AI and OCR outputs are structured drafts. A licensed physician must review and explicitly check the clinical verification agreement before commitment into longitudinal history.
5. **REAL-TIME STORAGE SYNC**: Changes submitted in the Patient App immediately populate the Doctor's OPD triage queue without requiring page reloads.

---

## 3. Repository Architecture

```
Patient personal dashboard/
├── index.html                   # Patient Mobile App (Mobile 430px container)
├── doctor.html                  # Doctor Clinical Workstation (Desktop-first)
├── .gitignore                   # Security exclusion rules
├── docs/
│   ├── architecture.md          # Architectural blueprints and diagrams
│   └── clinical_handoff_spec.md # Data contracts and state lifecycles
├── src/
│   ├── models/
│   │   ├── patient.js           # Patient schema & validation
│   │   ├── clinicalHandoff.js   # Clinical Handoff model
│   │   └── prescription.js      # Structured prescription schema
│   └── services/
│       ├── storageService.js    # Cross-window LocalStorage sync service
│       ├── audioService.js      # Real Web Audio & MediaRecorder service
│       ├── sttService.js        # Multilingual Speech-to-Text adapter
│       ├── ocrService.js        # Prescription image OCR ingestion
│       ├── prescriptionService.js# Natural medical text & prescription parser
│       └── verificationService.js# Doctor digital signature & validation
└── README.md                    # Project documentation
```

---

## 4. Quickstart Guide

### Running Locally
To launch the application with a local web server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Then open in your browser:
- **Patient Mobile App**: [http://localhost:8080/index.html](http://localhost:8080/index.html)
- **Doctor Workstation**: [http://localhost:8080/doctor.html](http://localhost:8080/doctor.html)

---

## 5. Live Clinical Workflow Walkthrough

1. Open **Patient Mobile App** (`index.html`).
2. Navigate to OPD queue or tap **Voice Intake**. Speak or insert symptom description in your native language (e.g. Kannada).
3. Confirm OPD Token (e.g. Token **A-27**).
4. Switch to **Doctor Workstation** (`doctor.html`).
5. Notice Token A-27 is immediately visible in the **Current OPD Queue** with status `AI Summary Ready`.
6. Click **Review Handoff →** to inspect the patient's verbatim transcript, normalized English summary, and relevant past medical history.
7. Click **Start Consultation & Prescription**.
8. Choose **Write / Type**, **Voice Dictation**, or **Prescription Photo OCR**.
9. Click **Generate Structured Draft** and review medications.
10. Check the mandatory physician review box: *"I, Dr. Sharma, MD, have reviewed and clinically verified this prescription."*
11. Click **Confirm & Digitally Sign Prescription**.
12. The prescription is timestamped, digitally signed, and instantly synchronized to the patient's longitudinal record.

---

## 6. License
MIT License. Built for Smart India Hackathon 2026 (SIH26047).
