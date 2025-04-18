const listeners = {}; // commit:6a2a820|time:2025-04-18T16:15:27.107Z line:1 uuid:38097e76
// commit:6a2a820|time:2025-04-18T16:15:27.107Z line:2 uuid:61b42d14
export const eventBus = { // commit:6a2a820|time:2025-04-18T16:15:27.107Z line:3 uuid:57e9046d
  on(event, callback) { // commit:6a2a820|time:2025-04-18T16:15:27.107Z line:4 uuid:9aec8dfd
    (listeners[event] ||= []).push(callback); // commit:6a2a820|time:2025-04-18T16:15:27.107Z line:5 uuid:d68f074e
  }, // commit:6a2a820|time:2025-04-18T16:15:27.107Z line:6 uuid:7fdfccdc
  emit(event, data) { // commit:6a2a820|time:2025-04-18T16:15:27.107Z line:7 uuid:f05dab22
    (listeners[event] || []).forEach(cb => cb(data)); // commit:6a2a820|time:2025-04-18T16:15:27.107Z line:8 uuid:c5a0a60b
  } // commit:6a2a820|time:2025-04-18T16:15:27.107Z line:9 uuid:cc4ba44e
}; // commit:6a2a820|time:2025-04-18T16:15:27.107Z line:10 uuid:e724c2d0
// commit:6a2a820|time:2025-04-18T16:15:27.107Z line:11 uuid:680fd427