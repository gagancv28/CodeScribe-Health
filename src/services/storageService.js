/**
 * Storage & Synchronization Service
 * Handles unified state between Patient App and Doctor Portal.
 */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CodeScribeServices = root.CodeScribeServices || {};
    root.CodeScribeServices.Storage = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  var KEYS = {
    PATIENTS: 'codescribe_patients_v1',
    HANDOFFS: 'codescribe_handoffs_v1',
    PRESCRIPTIONS: 'codescribe_prescriptions_v1',
    CURRENT_OPD: 'codescribe_current_opd_v1'
  };

  function getJSON(key, fallback) {
    try {
      var item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn('Storage read failed for', key, e);
      return fallback;
    }
  }

  function setJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage write failed for', key, e);
      return false;
    }
  }

  function initDefaultData() {
    if (!localStorage.getItem(KEYS.PATIENTS)) {
      var defaultPatients = [
        {
          id: 'P005',
          name: 'Ananya Rao',
          age: 34,
          gender: 'Female',
          phone: '+91 98451 23456',
          abhaId: '91-4829-1029-4820',
          primaryLanguage: 'kn-IN',
          languageName: 'Kannada',
          allergies: ['Penicillin (Moderate rash)'],
          chronicConditions: ['Migraine history since 2024'],
          vitals: { bp: '118/76', pulse: '72 bpm', temp: '98.4 F', spO2: '99%' }
        },
        {
          id: 'P006',
          name: 'Ramesh Gowda',
          age: 58,
          gender: 'Male',
          phone: '+91 94481 98765',
          abhaId: '91-3312-9988-1209',
          primaryLanguage: 'kn-IN',
          languageName: 'Kannada',
          allergies: ['None recorded'],
          chronicConditions: ['Type-2 Diabetes', 'Hypertension'],
          vitals: { bp: '138/88', pulse: '78 bpm', temp: '98.6 F', spO2: '97%' }
        },
        {
          id: 'P007',
          name: 'Sunita Sharma',
          age: 42,
          gender: 'Female',
          phone: '+91 97110 33445',
          abhaId: '91-7761-4432-8812',
          primaryLanguage: 'hi-IN',
          languageName: 'Hindi',
          allergies: ['Sulfa drugs'],
          chronicConditions: ['Hypothyroidism'],
          vitals: { bp: '122/80', pulse: '70 bpm', temp: '98.2 F', spO2: '98%' }
        }
      ];
      setJSON(KEYS.PATIENTS, defaultPatients);
    }

    if (!localStorage.getItem(KEYS.HANDOFFS)) {
      var defaultHandoffs = [
        {
          handoffId: 'HND-2026-001',
          patientId: 'P005',
          patientName: 'Ananya Rao',
          tokenNumber: 'A-27',
          facility: 'Government General Hospital',
          department: 'General Medicine',
          chiefComplaint: 'Recurring right-sided throbbing headache',
          duration: '3 weeks',
          priority: 'Moderate',
          status: 'AI Summary Ready',
          language: 'kn-IN',
          languageName: 'Kannada',
          timestamp: new Date().toISOString(),
          originalStatement: {
            hasAudio: true,
            audioBlobUrl: null, // Populated dynamically or on live recording
            rawTranscript: 'ನಿನ್ನೆ ಸಂಜೆಯಿಂದ ತಲೆನೋವು ಇದೆ. ಬಲಭಾಗದಲ್ಲಿ ಹೆಚ್ಚು ನೋವು ಇದೆ ಮತ್ತು ಬೆಳಕನ್ನು ನೋಡಿದಾಗ ಹೆಚ್ಚಾಗುತ್ತದೆ.',
            normalizedSummary: 'Patient reports unilateral throbbing headache on right side for ~3 weeks, exacerbated since yesterday evening with photophobia and mild nausea.'
          },
          relevantHistory: [
            { date: '11 Sep 2026', facility: 'Government General Hospital', note: 'Headache • AI-assisted case-taking • Kannada' },
            { date: '12 Aug 2026', facility: 'Government General Hospital', note: 'Headache • Paracetamol 500mg • Partial relief' },
            { date: '22 Oct 2025', facility: 'City Care Hospital', note: 'Penicillin allergy noted (erythematous rash)' }
          ]
        },
        {
          handoffId: 'HND-2026-002',
          patientId: 'P006',
          patientName: 'Ramesh Gowda',
          tokenNumber: 'A-28',
          facility: 'Government General Hospital',
          department: 'General Medicine',
          chiefComplaint: 'Bilateral knee joint stiffness and morning swelling',
          duration: '2 months',
          priority: 'Low',
          status: 'Waiting for Doctor Review',
          language: 'kn-IN',
          languageName: 'Kannada',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          originalStatement: {
            hasAudio: false,
            audioBlobUrl: null,
            rawTranscript: 'ಎರಡು ತಿಂಗಳಿಂದ ಎರಡೂ ಮೊಣಕಾಲುಗಳಲ್ಲಿ ನೋವು ಮತ್ತು ಊತ ಇದೆ. ಬೆಳಗ್ಗೆ ಎದ್ದಾಗ ನಡೆಯಲು ಕಷ್ಟ.',
            normalizedSummary: 'Bilateral knee pain with early morning stiffness lasting >30 minutes, progressive over 2 months.'
          },
          relevantHistory: [
            { date: '04 Jul 2026', facility: 'City Care Hospital', note: 'Routine diabetic check • HbA1c 7.4%' }
          ]
        }
      ];
      setJSON(KEYS.HANDOFFS, defaultHandoffs);
    }
  }

  // API Methods
  return {
    init: initDefaultData,
    getPatients: function() {
      initDefaultData();
      return getJSON(KEYS.PATIENTS, []);
    },
    getPatientById: function(id) {
      var patients = this.getPatients();
      var clean = String(id).replace('#', '').trim().toLowerCase();
      for (var i = 0; i < patients.length; i++) {
        if (patients[i].id.toLowerCase() === clean || patients[i].name.toLowerCase().includes(clean)) {
          return patients[i];
        }
      }
      return null;
    },
    getHandoffs: function() {
      initDefaultData();
      return getJSON(KEYS.HANDOFFS, []);
    },
    saveHandoff: function(handoff) {
      var list = this.getHandoffs();
      var idx = list.findIndex(function(h) { return h.handoffId === handoff.handoffId; });
      if (idx >= 0) {
        list[idx] = handoff;
      } else {
        list.unshift(handoff);
      }
      setJSON(KEYS.HANDOFFS, list);
      return handoff;
    },
    updateHandoffStatus: function(handoffId, status) {
      var list = this.getHandoffs();
      var found = list.find(function(h) { return h.handoffId === handoffId; });
      if (found) {
        found.status = status;
        found.updatedAt = new Date().toISOString();
        setJSON(KEYS.HANDOFFS, list);
      }
      return found;
    },
    getPrescriptions: function() {
      return getJSON(KEYS.PRESCRIPTIONS, []);
    },
    savePrescription: function(rx) {
      var list = this.getPrescriptions();
      list.unshift(rx);
      setJSON(KEYS.PRESCRIPTIONS, list);
      return rx;
    },
    subscribe: function(callback) {
      window.addEventListener('storage', function(e) {
        callback(e.key, e.newValue);
      });
    }
  };
}));
