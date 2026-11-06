# CodeScribe Health — System Architecture

**Problem Statement:** SIH26047 — Patient Case-Taking Software, Ministry of Ayush  
**Platform:** CodeScribe Health Longitudinal Health & Clinical Handoff Ecosystem

---

## 1. Architectural Overview

CodeScribe Health separates the clinical workflow into two dedicated, interoperable interfaces:

1. **Patient Mobile App (`index.html`)**: Mobile-first progressive interface for patients to link ABHA ID, record symptoms via speech or text in native languages (e.g. Kannada, Hindi, English), view verified prescriptions, and track OPD token numbers.
2. **Doctor Clinical Portal (`doctor.html`)**: Desktop-first clinical workstation for physicians to review incoming clinical handoffs, explore longitudinal history, dictate or scan prescriptions, and formally verify treatment plans.

```
+-----------------------------------+        +-----------------------------------+
|        Patient Mobile App         |        |      Doctor Clinical Portal       |
|  (index.html - Mobile 430px max)  |        |    (doctor.html - Desktop first)  |
|                                   |        |                                   |
| - ABHA Identity Management        |        | - Live OPD Queue & Triage Stats   |
| - Voice / Text Symptom Intake     |        | - Structured Clinical Handoff     |
| - OPD Token & Hospital Directory  |        | - Real Audio Player (Patient Rec) |
| - Verified Prescription Records   |        | - 3-Way Prescription Engine       |
+-----------------+-----------------+        +-----------------+-----------------+
                  |                                            |
                  +---------------------+----------------------+
                                        |
                         +--------------v--------------+
                         |    Shared Storage Engine    |
                         |   (Local / Supabase Sync)   |
                         +-----------------------------+
                                        |
       +--------------------------------+--------------------------------+
       |                                |                                |
+------v------+                  +------v------+                  +------v------+
| Patient     |                  | Clinical    |                  | Verified    |
| Identity    |                  | Handoffs    |                  | Scripts     |
+-------------+                  +-------------+                  +-------------+
```

---

## 2. Core Design Principles

- **No Repetition**: The doctor never asks what the patient has already stated.
- **Genuine Media Records**: No fake audio players or static mock strings. Audio recordings are held as real Audio Blobs / Base64 URIs.
- **Strict Clinical Verification**: AI suggestions and OCR drafts must be reviewed and explicitly signed off by a licensed doctor before entry into longitudinal history.
- **Separation of Concerns**: OCR extracts text; clinical parser interprets prescription regimens.
