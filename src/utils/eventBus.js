const listeners = {}; // time:2025-04-18T16:18:04.500Z line:1 uuid:f97124a2
// time:2025-04-18T16:18:04.500Z line:2 uuid:3d8e963d
export const eventBus = { // time:2025-04-18T16:18:04.500Z line:3 uuid:6e7fe464
  on(event, callback) { // time:2025-04-18T16:18:04.500Z line:4 uuid:7e18569b
    (listeners[event] ||= []).push(callback); // time:2025-04-18T16:18:04.500Z line:5 uuid:056f45d0
  }, // time:2025-04-18T16:18:04.500Z line:6 uuid:3f7f8adc
  emit(event, data) { // time:2025-04-18T16:18:04.500Z line:7 uuid:7fc3d285
    (listeners[event] || []).forEach(cb => cb(data)); // time:2025-04-18T16:18:04.500Z line:8 uuid:47be921a
  } // time:2025-04-18T16:18:04.500Z line:9 uuid:5e9ccf9f
}; // time:2025-04-18T16:18:04.500Z line:10 uuid:71d71e34
// time:2025-04-18T16:18:04.500Z line:11 uuid:4f9ad632