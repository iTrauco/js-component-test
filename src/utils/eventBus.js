const listeners = {}; // b129d2f|2025-04-18T16:13:59.644Z line:1 uuid:572fc6f4
// b129d2f|2025-04-18T16:13:59.644Z line:2 uuid:8b481d21
export const eventBus = { // b129d2f|2025-04-18T16:13:59.644Z line:3 uuid:291fdd56
  on(event, callback) { // b129d2f|2025-04-18T16:13:59.644Z line:4 uuid:999e4485
    (listeners[event] ||= []).push(callback); // b129d2f|2025-04-18T16:13:59.644Z line:5 uuid:000357fb
  }, // b129d2f|2025-04-18T16:13:59.644Z line:6 uuid:48254cf8
  emit(event, data) { // b129d2f|2025-04-18T16:13:59.644Z line:7 uuid:4e1fcc9b
    (listeners[event] || []).forEach(cb => cb(data)); // b129d2f|2025-04-18T16:13:59.644Z line:8 uuid:1daa5f25
  } // b129d2f|2025-04-18T16:13:59.644Z line:9 uuid:636e9105
}; // b129d2f|2025-04-18T16:13:59.644Z line:10 uuid:f974c386
// b129d2f|2025-04-18T16:13:59.644Z line:11 uuid:7d6db127