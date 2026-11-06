/**
 * Clinical Handoff Model
 * Represents patient symptom intake and triage status for the doctor.
 */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CodeScribeModels = root.CodeScribeModels || {};
    root.CodeScribeModels.ClinicalHandoff = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  var STATUSES = [
    'Awaiting Intake',
    'Intake Complete',
    'AI Summary Ready',
    'Waiting for Doctor Review',
    'In Consultation',
    'Prescription Review',
    'Doctor Verified',
    'Completed'
  ];

  function createHandoff(data) {
    var d = data || {};
    return {
      handoffId: d.handoffId || 'HND-' + Date.now().toString(36).toUpperCase(),
      patientId: d.patientId || 'P005',
      patientName: d.patientName || 'Ananya Rao',
      tokenNumber: d.tokenNumber || 'A-27',
      facility: d.facility || 'Government General Hospital',
      department: d.department || 'General Medicine',
      chiefComplaint: d.chiefComplaint || 'Recurring Headache',
      duration: d.duration || '3 weeks',
      priority: d.priority || 'Moderate',
      status: d.status || 'AI Summary Ready',
      language: d.language || 'kn-IN',
      languageName: d.languageName || 'Kannada',
      originalStatement: {
        hasAudio: Boolean(d.hasAudio),
        audioBlobUrl: d.audioBlobUrl || null,
        audioDurationSeconds: d.audioDurationSeconds || 0,
        rawTranscript: d.rawTranscript || '',
        normalizedSummary: d.normalizedSummary || ''
      },
      relevantHistory: Array.isArray(d.relevantHistory) ? d.relevantHistory : [
        { date: '11 Sep 2026', facility: 'Government General Hospital', note: 'Headache • AI-assisted case-taking • Kannada' },
        { date: '12 Aug 2026', facility: 'Government General Hospital', note: 'Headache • Paracetamol • Symptoms improved' },
        { date: '22 Oct 2025', facility: 'City Care Hospital', note: 'Penicillin allergy recorded (skin rash)' }
      ],
      consentConfirmed: d.consentConfirmed !== false,
      createdAt: d.createdAt || new Date().toISOString()
    };
  }

  return {
    STATUSES: STATUSES,
    create: createHandoff
  };
}));
