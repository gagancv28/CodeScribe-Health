# Clinical Handoff Specification (SIH26047)

## Data Contract

A Clinical Handoff bridges the patient symptom capture to the doctor's queue.

```json
{
  "handoffId": "HND-2026-001",
  "patientId": "P005",
  "tokenNumber": "A-27",
  "timestamp": "2026-11-06T11:50:00Z",
  "patient": {
    "name": "Ananya Rao",
    "age": 34,
    "gender": "Female",
    "abhaId": "91-4829-1029-4820",
    "primaryLanguage": "kn-IN",
    "languageName": "Kannada"
  },
  "complaint": {
    "chiefComplaint": "Recurring right-sided throbbing headache",
    "duration": "3 weeks",
    "severity": "Moderate to High",
    "aggravatingFactors": ["Bright light", "Loud sound"],
    "relievingFactors": ["Rest in dark room"]
  },
  "originalPatientStatement": {
    "hasAudio": true,
    "audioUrl": "data:audio/webm;base64,...",
    "audioDurationSeconds": 14,
    "sourceLanguage": "kn-IN",
    "rawTranscript": "ನಿನ್ನೆ ಸಂಜೆಯಿಂದ ತಲೆನೋವು ಇದೆ. ಬಲಭಾಗದಲ್ಲಿ ಹೆಚ್ಚು ನೋವು ಇದೆ ಮತ್ತು ಬೆಳಕನ್ನು ನೋಡಿದಾಗ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    "normalizedEnglish": "Throbbing headache since yesterday evening, localized on the right side, worsened by exposure to light."
  },
  "status": "AI Summary Ready",
  "priority": "Moderate",
  "triageLevel": 2,
  "consentConfirmed": true
}
```

### Status Lifecycle
1. `Awaiting Intake`
2. `Intake Complete`
3. `AI Summary Ready`
4. `In Consultation`
5. `Prescription Review`
6. `Doctor Verified`
7. `Completed`
