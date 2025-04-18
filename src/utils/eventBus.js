const listeners = {}; // uuid:a0524b39
// uuid:d2026aca
export const eventBus = { // uuid:0971ea4f
  on(event, callback) { // uuid:0ec1733c
    (listeners[event] ||= []).push(callback); // uuid:4f6b7eca
  }, // uuid:69937abb
  emit(event, data) { // uuid:654d2fb5
    (listeners[event] || []).forEach(cb => cb(data)); // uuid:5dff3b9e
  } // uuid:ca01e9bb
}; // uuid:dd313677
// uuid:6bd157ba