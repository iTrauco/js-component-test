const listeners = {}; // time:2025-04-18T16:17:35.693Z line:1 uuid:46e34ad9
// time:2025-04-18T16:17:35.693Z line:2 uuid:4934ba0e
export const eventBus = { // time:2025-04-18T16:17:35.693Z line:3 uuid:43a3a740
  on(event, callback) { // time:2025-04-18T16:17:35.693Z line:4 uuid:6521e900
    (listeners[event] ||= []).push(callback); // time:2025-04-18T16:17:35.693Z line:5 uuid:e24847f8
  }, // time:2025-04-18T16:17:35.693Z line:6 uuid:16016892
  emit(event, data) { // time:2025-04-18T16:17:35.693Z line:7 uuid:51113f55
    (listeners[event] || []).forEach(cb => cb(data)); // time:2025-04-18T16:17:35.693Z line:8 uuid:b4e2ca4f
  } // time:2025-04-18T16:17:35.693Z line:9 uuid:2f045f39
}; // time:2025-04-18T16:17:35.693Z line:10 uuid:79bd573b
// time:2025-04-18T16:17:35.693Z line:11 uuid:4cce0b3d