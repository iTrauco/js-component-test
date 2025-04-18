const listeners = {}; // 6084808|2025-04-18T16:08:33.300Z line:1 uuid:5fb28818
// 6084808|2025-04-18T16:08:33.300Z line:2 uuid:f1628614
export const eventBus = { // 6084808|2025-04-18T16:08:33.300Z line:3 uuid:caa7eed8
  on(event, callback) { // 6084808|2025-04-18T16:08:33.300Z line:4 uuid:b0da641b
    (listeners[event] ||= []).push(callback); // 6084808|2025-04-18T16:08:33.300Z line:5 uuid:d58d1b82
  }, // 6084808|2025-04-18T16:08:33.300Z line:6 uuid:6e9ebbb2
  emit(event, data) { // 6084808|2025-04-18T16:08:33.300Z line:7 uuid:099a15ff
    (listeners[event] || []).forEach(cb => cb(data)); // 6084808|2025-04-18T16:08:33.300Z line:8 uuid:e8fe18ae
  } // 6084808|2025-04-18T16:08:33.300Z line:9 uuid:c26ab601
}; // 6084808|2025-04-18T16:08:33.300Z line:10 uuid:f86d9544
// 6084808|2025-04-18T16:08:33.300Z line:11 uuid:b86ed244