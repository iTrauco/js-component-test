const listeners = {}; // uuid:90e9145c
// uuid:0e63f342
export const eventBus = { // uuid:02f564fc
  on(event, callback) { // uuid:508fcc1c
    (listeners[event] ||= []).push(callback); // uuid:67144e64
  }, // uuid:531adf12
  emit(event, data) { // uuid:633801f8
    (listeners[event] || []).forEach(cb => cb(data)); // uuid:3fd3b946
  } // uuid:1d6056aa
}; // uuid:4869b3fb
// uuid:eebe4c10