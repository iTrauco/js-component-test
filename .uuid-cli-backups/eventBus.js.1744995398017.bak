const listeners = {}; // time:2025-04-18T16:51:26.056Z uuid:3510b755
// time:2025-04-18T16:51:26.056Z uuid:51632583
export const eventBus = { // time:2025-04-18T16:51:26.056Z uuid:92167ee9
  on(event, callback) { // time:2025-04-18T16:51:26.056Z uuid:6c0261c3
    (listeners[event] ||= []).push(callback); // time:2025-04-18T16:51:26.056Z uuid:4b183dde
  }, // time:2025-04-18T16:51:26.056Z uuid:7057c412
  emit(event, data) { // time:2025-04-18T16:51:26.056Z uuid:da32d8b1
    (listeners[event] || []).forEach(cb => cb(data)); // time:2025-04-18T16:51:26.056Z uuid:2302bbb2
  } // time:2025-04-18T16:51:26.056Z uuid:1ed7cbe9
}; // time:2025-04-18T16:51:26.056Z uuid:3052d3c4
// time:2025-04-18T16:51:26.056Z uuid:288f50ee