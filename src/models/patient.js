/**
 * Patient Data Model
 * CodeScribe Health (SIH26047)
 */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CodeScribeModels = root.CodeScribeModels || {};
    root.CodeScribeModels.Patient = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  function createPatient(data) {
    var d = data || {};
    return {
      id: d.id || 'P' + Math.floor(100 + Math.random() * 900),
      name: d.name || 'Anonymous Patient',
      age: d.age || 30,
      gender: d.gender || 'Not Specified',
      bloodGroup: d.bloodGroup || 'Unknown',
      phone: d.phone || '+91 98765 43210',
      abhaId: d.abhaId || '91-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000),
      primaryLanguage: d.primaryLanguage || 'kn-IN',
      languageName: d.languageName || 'Kannada',
      allergies: Array.isArray(d.allergies) ? d.allergies : ['Penicillin (mild rash)'],
      chronicConditions: Array.isArray(d.chronicConditions) ? d.chronicConditions : ['Migraine history'],
      emergencyContact: d.emergencyContact || { name: 'Suresh Rao', relation: 'Spouse', phone: '+91 98765 43211' },
      createdAt: d.createdAt || new Date().toISOString()
    };
  }

  function validatePatient(patient) {
    var errors = [];
    if (!patient.name || patient.name.trim().length === 0) errors.push('Name is required.');
    if (!patient.id) errors.push('Patient ID is required.');
    return { valid: errors.length === 0, errors: errors };
  }

  return {
    create: createPatient,
    validate: validatePatient
  };
}));
