CODE-SCRIBE HEALTH — DOCTOR DASHBOARD COMPLETE CONTEXT
1. Project Overview

We are building CodeScribe Health, a healthcare case-taking and longitudinal patient-history platform for the Smart India Hackathon 2026 problem statement SIH26047 — Patient Case-Taking Software, Ministry of Ayush.

The system has separate interfaces for separate users:

Patient
Mobile application
Patient records symptoms using voice or text
Patient can book an appointment
Patient can connect/identify through ABHA
Patient can view prescriptions, consultations, medications and documents
Doctor
Desktop-first web portal
This is the interface currently being developed/debugged
Used ONLY by doctors/authorized clinical staff
Receives patient information from the patient app/hospital intake
Shows complete longitudinal patient history
Allows doctor to review the patient's case before consultation
Allows doctor to create and verify prescriptions
Hospital / OPD
Separate operational flow
Patient arrives physically or books appointment
Patient gets connected to doctor through appointment/token/OPD queue
Doctor receives the structured clinical handoff

Important: Do NOT turn the doctor portal into a mobile patient interface. The patient experience and doctor experience are intentionally separate.

2. Main Purpose of the Doctor Portal

The doctor dashboard exists to solve one major problem:

A doctor should understand the patient's current problem and relevant medical history BEFORE starting the consultation, without making the patient repeat everything or searching through paper records.

The intended workflow is:

Patient input

↓

Structured clinical handoff

↓

Doctor receives patient in OPD queue

↓

Doctor reviews concise case summary

↓

Doctor reviews relevant longitudinal history

↓

Doctor starts consultation

↓

Doctor creates prescription

↓

Prescription is reviewed and verified by doctor

↓

Prescription becomes part of patient's longitudinal record

↓

Patient receives updated prescription/history

The product philosophy is:

NO REPETITION.
NO MANUAL PAPERWORK.
NO LOST HISTORY.
NO BLIND SPOTS.

3. Doctor Dashboard Design Philosophy

The doctor portal should feel like professional clinical software, not a generic AI dashboard.

It should be:

Desktop-first
Fast
Information-dense
Clean
Clinical
Easy to scan during an OPD
Minimal clicking
Clear hierarchy
Strong patient identity
Strong clinical timeline
Strong status indicators

It should NOT look like:

A flashy AI SaaS landing page
A consumer mobile app
A futuristic AI interface
A dashboard filled with gradients
Glassmorphism
Huge rounded cards
Excessive animations
Purple/pink AI gradients
Stock illustrations

AI should be assistive, not visually dominant.

4. Visual Design System

The doctor portal and patient application belong to the same product, so their visual language should remain consistent.

Primary

Medical Azure Blue

#2563EB

Used for:

Primary buttons
Active navigation
OPD highlights
Important actions
Mic controls
Selected states
Secondary

#06B6D4

Cyan

#38BDF8

Sky

Used for:

AI-assisted indicators
Voice recording indicators
Sync states
Secondary highlights
Dark

#0F172A

Slate/Navy

Used for:

Main headings
Important clinical text
Sidebar
Strong contrast areas
Background

#F8FAFC

Off-white / Slate 50

Cards

#FFFFFF

Borders

#E2E8F0

Secondary text

#64748B

Success

#10B981

Used for:

Verified
Completed
Connected
Synced
Warning

#F59E0B

Used for:

Moderate priority
Review required
Attention
Critical

#EF4444

Used for:

High priority
Critical alerts
Serious warnings

Typography should preferably use:

Inter

Icons should preferably use:

Lucide-style clean line icons

5. Doctor Portal Navigation

The doctor portal currently has the concept of a persistent left sidebar.

Main sections:

Dashboard
OPD Queue
Patients
Records
FHIR / ABDM
Analytics
Settings

There may also be:

Switch to Patient View
Kiosk Mode
Doctor profile

The doctor profile should remain visible at the bottom-left of the sidebar, even when the main content is long.

The sidebar should behave properly while the main content scrolls.

6. Dashboard Home

The dashboard should immediately answer:

What is happening in my OPD right now?

Important KPI cards include:

Patients Waiting

How many patients are currently waiting.

Cases Ready

How many patients have completed intake and have a structured case ready for the doctor.

High Priority

Patients requiring urgent attention.

Seen Today

Number of completed consultations today.

These should be real values from the application state/backend when connected, not hardcoded values.

7. Priority Queue

The dashboard should contain a clear patient queue.

Each queue entry should show relevant information such as:

Patient
Patient ID
Age
Gender where appropriate
Language
Chief complaint
Duration
Priority
Token / appointment
Current status
Updated time
Review/Open action

Example:

Ananya Rao

P005

Age: 34

Language: Kannada

Chief complaint: Recurring headache

Duration: 3 weeks

Priority: Moderate

Token: 07

Status: AI Summary Ready

8. OPD Status Flow

The doctor needs to understand where every patient is in the workflow.

Possible states:

Awaiting Intake

Patient has registered but case information isn't complete.

Intake Complete

Patient has submitted the required information.

AI Summary Ready

The patient information has been structured into a clinical handoff.

Waiting for Doctor Review

The doctor needs to review the case.

In Consultation

Doctor has started consultation.

Prescription Review

Prescription has been created and is awaiting doctor confirmation.

Doctor Verified

Doctor has confirmed the prescription.

Completed

Consultation is completed.

The UI must always reflect the actual state.

Never show "Doctor Verified" before the doctor has actually confirmed the prescription.

9. THE MOST IMPORTANT FEATURE — CLINICAL HANDOFF

This is the central feature of the entire project.

When the patient submits symptoms through the patient application, the doctor should NOT simply receive a raw paragraph.

Instead, the system creates a structured Clinical Handoff.

The handoff should contain:

Patient identity
Patient name
Patient ID
Age
Gender where appropriate
ABHA connection status
Appointment/token
Current complaint

Example:

Chief Complaint

Recurring headache

Duration

Example:

Duration

3 weeks

Symptoms

Example:

Headache
Mild nausea
Sensitivity to light
Patient-reported history

What the patient actually said.

Structured clinical summary

A concise doctor-readable summary.

Language

Example:

Kannada

Source

Example:

Patient Voice

Timestamp

When the information was recorded/submitted.

Consent

Whether the patient consented to sharing the information with the doctor.

Priority

Low / Moderate / High

Status

Example:

Digital Handoff Complete

10. Original Patient Statement

The doctor must be able to distinguish:

What the patient actually said

from

What the system structured from it.

Therefore the portal should provide access to:

Original Patient Statement

This may contain:

Original voice recording
Original transcript
Original language
Normalized/translated text

Example:

Patient speaks in Kannada.

The portal may display:

Original Kannada statement

and then:

Normalized English summary

This is important for transparency.

11. VERY IMPORTANT AUDIO REQUIREMENT

If the patient recorded actual audio, the doctor must be able to play the actual recording.

The system must NOT show a fake audio player that points to nonexistent/mock audio.

Correct architecture:

Patient records audio

↓

Real audio Blob/file

↓

Stored locally during prototype OR Supabase Storage later

↓

Audio URL/storage path

↓

Doctor portal retrieves actual audio

↓

Doctor presses Play

↓

Actual recording plays

If audio does not exist:

Show:

Audio recording unavailable

Do NOT create fake audio.

12. Longitudinal Patient History

The doctor should be able to understand:

What happened to this patient before today?

Patient history should include:

Previous illnesses

Examples:

Migraine
Diabetes
Hypertension
Asthma
Previous treatments
Treatment received
Where it was received
Approximate date
Outcome where available
Previous consultations

Each visit should contain:

Date
Facility
Doctor/specialty where available
Chief complaint
Clinical summary
Diagnosis/documented assessment
Prescription
Follow-up
Reports
Medication history

Show:

Medication
Dose
Frequency
Start date
Stop date if applicable
Current/discontinued status
Documents

Examples:

Lab reports
Prescription documents
Imaging/report documents
Uploaded medical records
13. Healthcare Journey

The patient should have a visual timeline/journey.

Example:

2024

Government Hospital

↓

Headache consultation

↓

Prescription

↓

2025

Private Clinic

↓

Follow-up

↓

Medication changed

↓

2026

Current Government Hospital OPD

↓

Current consultation

The doctor should be able to expand a visit.

If the UI says:

Click for visits

that interaction MUST actually work.

Clicking should open or expand the relevant visits.

Never leave dead buttons.

14. Relevant History

The doctor shouldn't have to read the entire history every time.

The system should highlight history relevant to the current complaint.

For example:

Current complaint:

Recurring headache

Relevant history:

Previous headache consultation
Previous migraine diagnosis
Previous headache medication
Previous related report

The doctor can still access the complete history.

Important distinction:

Relevant history ≠ diagnosis.

AI should not claim that historical information proves a diagnosis.

15. Patient Directory

The doctor should be able to search patients.

Search should support:

Patient name
Patient ID
ABHA-linked identifier where supported
Possibly phone/other permitted identifier

Example:

P005

If the doctor searches:

#P005

the system should normalize the input and correctly find:

P005

It should NOT just leave the text in the search box.

Search result should load the actual patient.

If no patient exists:

No patient found.

Never silently load a default patient.

16. Critical Dynamic Data Rule

This is extremely important for the entire portal.

There must be NO relationship like this:

Patient ID → default patient data

or:

Any input → default prescription

or:

Any uploaded image → Paracetamol 500 mg

or:

Any voice recording → same transcript

User input must actually drive the result.

17. Prescription Workflow

Prescription creation has three possible input methods:

1. Write / Type

Doctor manually enters the prescription.

2. Voice Prescription

Doctor speaks the prescription.

3. Upload Prescription Photo

Doctor uploads a handwritten prescription/photo.

All three must eventually converge into:

Raw Input
↓
Transcription / OCR / Manual Text
↓
Structured Prescription Draft
↓
Doctor Review
↓
Doctor Confirmation
↓
Verified Prescription
↓
Patient Record Update
18. Voice Prescription

When doctor clicks:

Voice Prescription

the browser should actually request microphone access.

Correct conceptual flow:

IDLE
↓
REQUESTING MICROPHONE
↓
RECORDING
↓
RECORDED
↓
TRANSCRIBING
↓
TRANSCRIBED
↓
EXTRACTING
↓
DRAFT READY
↓
DOCTOR REVIEW
↓
VERIFIED

Do NOT make:

Record
↓
Immediately show default prescription

The recording must produce an actual audio Blob.

The doctor should be able to:

Start recording
Stop recording
Play recording
Re-record
See duration
Process recording
19. Critical Voice Transcription Rule

If there is no actual Speech-to-Text service connected:

DO NOT FAKE TRANSCRIPTION.

Instead show something like:

Voice transcription service is not connected.

And optionally allow:

Enter transcript manually

The prototype must never pretend that a transcription happened when it did not.

This is especially important because the current bug is:

Doctor says something completely different, but the system produces the same default prescription.

That must be eliminated.

20. Prescription Photo Upload

The doctor can upload a handwritten prescription.

The application must use the actual selected File.

Flow:

File picker
↓
Actual File object
↓
Image preview
↓
OCR
↓
Actual OCR text
↓
Prescription extraction
↓
Structured draft
↓
Doctor review
↓
Confirmation

If the uploaded image is a completely random WhatsApp image with no prescription:

The system must NOT return:

Paracetamol 500 mg

Instead it should say something like:

No prescription content detected in this image.

Or:

OCR could not identify a valid prescription.

21. OCR and Prescription Extraction Must Be Separate

Architecturally:

ocrService

should be responsible for:

Image → Text

Then:

prescriptionService

should be responsible for:

Prescription text → Structured prescription

Do NOT directly map:

Image → predefined prescription.

22. Prescription Review Screen

Before saving the prescription, doctor must see:

Source

Examples:

Doctor Voice Dictation
Prescription Photo OCR
Doctor Manual Entry
Raw input

Show the original input where possible.

For voice:

Audio player
Transcript

For image:

Original image
OCR text

For manual:

Original typed text

Then:

Structured Prescription

For each medicine:

Medicine name
Strength
Dose
Frequency
Route
Duration
Instructions

Additional:

Advice
Follow-up
23. Doctor Must Verify

This is mandatory.

The system should NOT automatically submit an AI/OCR-generated prescription.

Doctor should explicitly confirm.

Example:

☑ I have reviewed the prescription and confirm that the information is accurate.

Then:

Confirm & Submit

Only after that:

Doctor Verified

The verification action should be timestamped and associated with the doctor.

24. Prescription Must Update Patient History

Once confirmed:

The prescription must update:

Current consultation

↓

Patient longitudinal history

↓

Medication history

↓

Patient mobile application

The patient should then be able to see the newly issued prescription.

This should eventually be backed by Supabase.

25. Important Current Prototype Bug

A major issue in the current prototype is:

User input is being ignored and the application keeps returning default/sample output.

Examples:

Voice

Doctor says:

"Amoxicillin 500 milligrams twice daily for five days."

But application returns:

Paracetamol 500 mg

Image

Doctor uploads a random image.

Application still returns:

Paracetamol / Domperidone / default advice.

Text

Doctor enters something different.

Application still produces predefined output.

This indicates the processing pipeline is likely using:

hardcoded data
mock extraction
default state
static seed response
placeholder AI response
fallback prescription

instead of the actual user input.

26. Hardcoded Data That Must NOT Drive User Input

Gemini should search the codebase for things such as:

defaultPrescription
mockPrescription
samplePrescription
demoPrescription
fallbackPrescription
mockTranscription
sampleTranscript
defaultTranscript
sampleOCR
mockOCR
fakeResponse
dummyResponse

Also search for hardcoded medicine strings such as:

Paracetamol
Domperidone
Cetirizine

The medicines themselves aren't forbidden.

The problem is:

They must not automatically appear as the result of unrelated user input.

Static demo data can exist for initial patient records, but it must be separated from actual processing logic.

27. Data Model Concept

The doctor portal should conceptually work with entities like:

Patient
patientId
name
age
gender
abhaStatus
language
contact
Appointment
appointmentId
patientId
doctorId
token
date
time
status
priority
Clinical Handoff
handoffId
patientId
appointmentId
source
originalStatement
transcript
normalizedSummary
chiefComplaint
duration
symptoms
language
priority
consent
createdAt
status
Consultation
consultationId
patientId
doctorId
appointmentId
startedAt
completedAt
notes
assessment
Prescription
prescriptionId
consultationId
patientId
doctorId
sourceType
rawInput
normalizedText
medications
advice
followUp
createdAt
verifiedAt
status
28. Records Page

The Records page should allow doctors to see historical clinical records.

Possible columns:

Patient
Case ID
Date/time
Demographics
Language
Priority
Status
Open

Opening a record should load the actual record.

No page should silently display the same patient regardless of what record was clicked.

29. FHIR / ABDM Section

The project should communicate interoperability as a prototype capability unless actual ABDM integration has been implemented.

Do NOT claim:

Live ABDM data retrieved

unless that is genuinely implemented.

Do NOT claim:

Live FHIR synchronization

unless there is an actual working integration.

For the hackathon prototype, it is acceptable to show the intended architecture/workflow.

The portal should communicate that ABHA/ABDM is the intended health identity/interoperability layer.

30. Consent and Audit Trail

The system should maintain an audit concept.

Important events:

Patient consent
Patient record accessed
Handoff created
Doctor opened record
Prescription created
Prescription reviewed
Prescription verified
Prescription updated

Each important event should have:

Actor
Action
Timestamp
Patient
Record/consultation ID

This is especially important for healthcare software.

31. Analytics

Analytics should help understand the OPD.

Potential metrics:

Patients seen today
Patients waiting
Cases processed
High-priority cases
Average consultation duration
Cases by language
Cases by priority
Daily/weekly patient volume

Analytics must be derived from actual application data once backend integration exists.

Do not show fake dynamic charts pretending to be real hospital statistics.

32. Settings

Settings can contain:

Doctor profile
Hospital/clinic information
Language preferences
Notification preferences
Recording preferences
System status

But clinical functionality should not be hidden behind unnecessary settings.

33. Supabase Future Architecture

The project is eventually going to connect to Supabase.

The frontend should therefore avoid putting all data directly inside UI components.

Prefer service boundaries such as:

patientService
appointmentService
handoffService
consultationService
prescriptionService
audioService
ocrService
speechService
fileService

Later these services can communicate with:

Supabase Database
Supabase Storage
Supabase Auth

For example:

Patient App
     ↓
Supabase
     ↓
Clinical Handoff
     ↓
Doctor Dashboard

And:

Doctor
↓
Prescription
↓
Supabase
↓
Patient App
34. Supabase Storage

Audio and prescription images should eventually be stored in Supabase Storage.

For example:

patient-audio/
prescriptions/
clinical-documents/

Database should store metadata and storage paths.

The doctor portal should retrieve the actual file associated with the current patient/consultation.

35. Important Separation

Do not mix:

UI state

with:

Clinical data

with:

AI processing

with:

Database logic

For example, a React component should NOT contain a huge hardcoded function that says:

if (recordingFinished) {
    setPrescription(defaultPrescription)
}

Instead:

UI
 ↓
Service
 ↓
Actual processing
 ↓
Structured result
 ↓
UI
36. Error Handling

The system must fail honestly.

If microphone permission is denied:

Microphone permission is required for voice recording.

If recording fails:

Unable to record audio. Please try again.

If transcription service isn't connected:

Voice transcription is currently unavailable.

If OCR fails:

Unable to read text from this image.

If uploaded image contains no prescription:

No prescription content detected.

If patient isn't found:

Patient not found.

If database fails:

Unable to load patient record. Please try again.

Never replace an error with fake data.

37. Demo Patient

The prototype can still have predefined patients such as:

Ananya Rao — P005

This is okay.

The problem is NOT demo data itself.

The problem is using demo data as the output of every operation.

For example:

Correct

Patient P005 exists as a seeded patient.

Doctor opens P005.

→ Shows P005 history.

Incorrect

Doctor searches P018.

→ Application silently displays P005.

38. Current Main Patient Example

One of the existing prototype patient cases is:

Ananya Rao

Patient ID:

P005

The case involves:

Recurring headache

The patient has a history that can include:

Previous consultations
Previous treatment
Medication history
Healthcare journey
Patient-reported symptoms
Current consultation

This patient can be used as the demonstration patient.

But all components should be data-driven so another patient works correctly too.

39. Complete Demo Story

The ideal hackathon demonstration should be:

Step 1 — Patient

Patient opens mobile application.

Records symptoms in their own language.

Example:

Kannada voice recording describing recurring headache.

Step 2 — Patient confirms

The patient reviews the captured information.

Confirms submission.

Step 3 — Hospital / Appointment

Patient books an appointment or arrives at the hospital.

Token:

07

Step 4 — Doctor Dashboard

Doctor sees:

Ananya Rao — P005

Language:

Kannada

Chief complaint:

Recurring headache

Duration:

3 weeks

Priority:

Moderate

Status:

AI Summary Ready

Step 5 — Clinical Handoff

Doctor opens the case.

Sees:

Patient information
Chief complaint
Duration
Symptoms
Structured summary
Original Kannada statement
Audio
Consent
Token
Timestamp
Step 6 — History

Doctor opens longitudinal history.

Sees previous:

Visits
Illnesses
Treatments
Medications
Reports
Healthcare facilities

Relevant headache history is highlighted.

Step 7 — Consultation

Doctor clicks:

Start Consultation

The case becomes:

In Consultation

Step 8 — Prescription

Doctor can:

Type

or

Speak

or

Upload prescription photo

Step 9 — Processing

The actual input is processed.

The application must NOT invent a predefined result.

Step 10 — Review

Doctor reviews:

Original input
Structured prescription
Medicines
Dose
Frequency
Duration
Advice
Follow-up
Step 11 — Verify

Doctor checks:

I have reviewed and confirm this prescription.

Then:

Confirm & Submit

Step 12 — Patient Record

Status becomes:

Doctor Verified

Prescription is added to:

Current consultation
Medication history
Longitudinal record
Step 13 — Patient App

Patient receives the updated prescription.

This demonstrates the complete connected system.

40. What Gemini Should NOT Do

When debugging this project:

Do NOT rebuild the application.
Do NOT replace the existing design.
Do NOT randomly redesign screens.
Do NOT remove working features.
Do NOT replace real functionality with another mock.
Do NOT add fake AI.
Do NOT make every uploaded image produce a successful prescription.
Do NOT make every voice recording produce a successful prescription.
Do NOT use patient ID as a shortcut to determine prescription.
Do NOT silently fall back to Ananya Rao/P005.
Do NOT show fake confidence scores.
Do NOT claim live ABDM/FHIR integration if it isn't connected.
Do NOT fabricate clinical information.
41. Definition of "Working"

A feature is NOT considered working just because:

Button changes color
Modal opens
Loading spinner appears
Fake transcript appears
Default prescription appears
UI status changes

A feature is working only if the actual input produces the corresponding actual output.

For example:

Voice

Input A:

"Take amoxicillin twice daily."

Output must be based on Input A.

Input B:

"Take paracetamol after food."

Output must be different.

Image

Upload prescription image A.

→ OCR must process image A.

Upload prescription image B.

→ OCR must process image B.

Upload random image.

→ Should NOT generate a prescription.

Patient search

Search:

P005

→ P005.

Search:

P018

→ P018 if it exists.

Search nonexistent ID.

→ No patient found.

42. Debugging Priority

When debugging the doctor dashboard, use this priority:

P0 — Critical
Real voice recording
Real audio playback
Actual transcription or honest unavailable state
Real image upload
Real OCR or honest unavailable state
No hardcoded prescription output
No hardcoded transcript output
Correct patient lookup
Correct patient-specific data
Prescription verification
P1 — Important
Clinical handoff
Patient history
Healthcare journey
OPD queue
Consultation state
Prescription persistence
Patient app synchronization
P2 — Important UX
PDF export
Search/filter
Sidebar persistence
Error states
Loading states
Empty states
Responsive desktop layout
P3 — Enhancement
Analytics
FHIR/ABDM prototype visualization
Advanced audit visualization
Additional clinical insights
43. Most Important Engineering Principle

The doctor portal must be data-driven.

The application should follow:

REAL USER INPUT
       ↓
CAPTURE
       ↓
VALIDATE
       ↓
PROCESS
       ↓
STRUCTURE
       ↓
DOCTOR REVIEW
       ↓
DOCTOR CONFIRMATION
       ↓
PERSIST
       ↓
PATIENT RECORD

Never:

USER INPUT
    ↓
DEFAULT SAMPLE DATA
44. Final Product Identity

The Doctor Dashboard is not just an appointment dashboard.

It is the clinical workstation of CodeScribe Health.

Its job is to give the doctor:

The right patient + the right context + the right history + the current complaint + the consultation tools + verified documentation

in one workflow.

The core value proposition is:

Patient tells the story once.
The system structures it.
The doctor understands it.
The doctor verifies the care.
The patient's health record remembers it.

This is the complete context you should understand before making any code changes.

Additional context for Gemini

The broader design direction is consistent with modern Indian doctor-facing clinical software: current products emphasize a single clinical workspace combining the OPD queue, patient history, consultation and prescription rather than separating these into disconnected screens.

For AI-assisted documentation specifically, the important pattern is AI drafts → doctor reviews → doctor signs/confirms, rather than automatically publishing AI output.

Use the context above as the product specification. Do not start changing code yet. First inspect the existing doctor-dashboard codebase and identify how the current data flow actually works.