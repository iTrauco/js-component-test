const listeners = {}; // uuid:c0d948f1
// uuid:118980ba
export const eventBus = { // uuid:3bb38024
  on(event, callback) { // uuid:00471e61
    (listeners[event] ||= []).push(callback); // uuid:ecd5829f
  }, // uuid:9f9704f3
  emit(event, data) { // uuid:d6acaf5e
    (listeners[event] || []).forEach(cb => cb(data)); // uuid:ca405485
  } // uuid:04d186da
}; // uuid:4aac36ed
// uuid:f79621a5