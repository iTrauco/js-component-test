const listeners = {}; // line:1 uuid:5c86d304
// line:2 uuid:19c8dcaf
export const eventBus = { // line:3 uuid:b24a4324
  on(event, callback) { // line:4 uuid:8a188867
    (listeners[event] ||= []).push(callback); // line:5 uuid:9a754b6f
  }, // line:6 uuid:92288844
  emit(event, data) { // line:7 uuid:720c8ace
    (listeners[event] || []).forEach(cb => cb(data)); // line:8 uuid:70d97939
  } // line:9 uuid:82b028d5
}; // line:10 uuid:9ad06200
// line:11 uuid:9376ebfe