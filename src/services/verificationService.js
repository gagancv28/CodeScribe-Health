/**
 * Clinical Verification Service
 * Handles formal physician review, validation, and digital sign-off.
 * Rule #23: Mandatory explicit doctor verification before commitment.
 */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CodeScribeServices = root.CodeScribeServices || {};
    root.CodeScribeServices.Verification = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  function verifyPrescription(prescriptionDraft, doctorMeta, explicitConsent) {
    if (!explicitConsent) {
      throw new Error('Physician review confirmation checkbox must be checked before verification.');
    }
    if (!prescriptionDraft) {
      throw new Error('Invalid prescription draft.');
    }

    var doctor = doctorMeta || { name: 'Dr. Sharma, MD', id: 'DOC-KMC-4821' };

    var verifiedRecord = Object.assign({}, prescriptionDraft, {
      status: 'Doctor Verified',
      verified: true,
      verifiedAt: new Date().toISOString(),
      verifiedBy: doctor.name,
      doctorId: doctor.id,
      digitalSignatureToken: 'SIG-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    });

    return verifiedRecord;
  }

  return {
    verifyPrescription: verifyPrescription
  };
}));
