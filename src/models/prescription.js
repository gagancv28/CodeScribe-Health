/**
 * Prescription Data Model
 * Explicit structure for doctor verification and longitudinal integration.
 */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CodeScribeModels = root.CodeScribeModels || {};
    root.CodeScribeModels.Prescription = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  function createPrescription(data) {
    var d = data || {};
    return {
      prescriptionId: d.prescriptionId || 'RX-' + Date.now().toString(36).toUpperCase(),
      patientId: d.patientId || 'P005',
      patientName: d.patientName || 'Ananya Rao',
      doctorName: d.doctorName || 'Dr. Sharma, MD',
      doctorId: d.doctorId || 'DOC-KMC-4821',
      date: d.date || new Date().toISOString().split('T')[0],
      source: d.source || 'Doctor Manual Entry', // 'Doctor Manual Entry' | 'Doctor Voice Dictation' | 'Prescription Photo OCR'
      rawInput: d.rawInput || '',
      medicines: Array.isArray(d.medicines) ? d.medicines : [],
      diagnosis: d.diagnosis || 'Tension-type headache with migraine tendencies',
      advice: d.advice || 'Drink adequate water, reduce screen exposure, avoid missed meals.',
      followUp: d.followUp || '10 days or SOS if symptoms aggravate',
      verified: Boolean(d.verified),
      verifiedAt: d.verifiedAt || null,
      verificationDoctorSignature: d.verificationDoctorSignature || null
    };
  }

  function createMedicineItem(med) {
    var m = med || {};
    return {
      name: m.name || '',
      strength: m.strength || '',
      dose: m.dose || '1 tablet',
      frequency: m.frequency || '1-0-1',
      timing: m.timing || 'After food',
      duration: m.duration || '5 days',
      instructions: m.instructions || ''
    };
  }

  return {
    create: createPrescription,
    createMedicineItem: createMedicineItem
  };
}));
