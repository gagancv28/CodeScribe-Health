/**
 * Speech-to-Text (STT) Service
 * Multilingual speech transcription using Web Speech API with fallback guardrails.
 * Rule #19: No fake transcription without service connection.
 */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CodeScribeServices = root.CodeScribeServices || {};
    root.CodeScribeServices.STT = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  var SUPPORTED_LANGUAGES = {
    'kn-IN': 'Kannada',
    'hi-IN': 'Hindi',
    'ta-IN': 'Tamil',
    'te-IN': 'Telugu',
    'ml-IN': 'Malayalam',
    'mr-IN': 'Marathi',
    'bn-IN': 'Bengali',
    'en-IN': 'English (India)'
  };

  function getSpeechRecognitionClass() {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  function isAvailable() {
    return Boolean(getSpeechRecognitionClass());
  }

  function createRecognizer(options) {
    var SR = getSpeechRecognitionClass();
    if (!SR) return null;

    var opts = options || {};
    var r = new SR();
    r.continuous = opts.continuous !== undefined ? opts.continuous : true;
    r.interimResults = opts.interimResults !== undefined ? opts.interimResults : true;
    r.lang = opts.lang || 'kn-IN';
    return r;
  }

  return {
    SUPPORTED_LANGUAGES: SUPPORTED_LANGUAGES,
    isAvailable: isAvailable,
    createRecognizer: createRecognizer
  };
}));
