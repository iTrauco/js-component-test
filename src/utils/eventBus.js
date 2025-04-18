const listeners = {};

export const eventBus = {
  on(event, callback) {
    (listeners[event] ||= []).push(callback);
  },
  emit(event, data) {
    (listeners[event] || []).forEach(cb => cb(data));
  }
};
