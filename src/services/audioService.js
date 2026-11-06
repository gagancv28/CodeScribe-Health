/**
 * Audio Recording and Web Audio Service
 * Provides genuine audio capture via MediaRecorder and Base64 persistence.
 * Adheres strictly to CodeScribe Rule #11: No fake audio.
 */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CodeScribeServices = root.CodeScribeServices || {};
    root.CodeScribeServices.Audio = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  var mediaRecorder = null;
  var audioChunks = [];
  var startTime = null;

  function isSupported() {
    return Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  }

  function startRecording() {
    return new Promise(function(resolve, reject) {
      if (!isSupported()) {
        reject(new Error('MediaRecorder or getUserMedia is not supported in this browser.'));
        return;
      }

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
          audioChunks = [];
          mediaRecorder = new MediaRecorder(stream);
          startTime = Date.now();

          mediaRecorder.ondataavailable = function(e) {
            if (e.data && e.data.size > 0) {
              audioChunks.push(e.data);
            }
          };

          mediaRecorder.start(250);
          resolve({ status: 'recording', stream: stream });
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  function stopRecording() {
    return new Promise(function(resolve, reject) {
      if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        reject(new Error('No active audio recording to stop.'));
        return;
      }

      var durationSeconds = Math.round((Date.now() - startTime) / 1000);

      mediaRecorder.onstop = function() {
        var blob = new Blob(audioChunks, { type: 'audio/webm' });
        var reader = new FileReader();
        reader.onloadend = function() {
          var base64Data = reader.result;
          resolve({
            blob: blob,
            base64: base64Data,
            durationSeconds: durationSeconds || 1,
            sizeBytes: blob.size
          });
        };
        reader.onerror = function(err) {
          reject(err);
        };
        reader.readAsDataURL(blob);

        // Stop all tracks to release hardware mic indicator
        if (mediaRecorder.stream) {
          mediaRecorder.stream.getTracks().forEach(function(track) { track.stop(); });
        }
      };

      mediaRecorder.stop();
    });
  }

  return {
    isSupported: isSupported,
    startRecording: startRecording,
    stopRecording: stopRecording
  };
}));
