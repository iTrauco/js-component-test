const listeners = {}; // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:1 uuid:1568efb9
// feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:2 uuid:0da9e34d
export const eventBus = { // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:3 uuid:13fd958e
  on(event, callback) { // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:4 uuid:55b57983
    (listeners[event] ||= []).push(callback); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:5 uuid:dd0e95db
  }, // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:6 uuid:32c5d36e
  emit(event, data) { // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:7 uuid:d78457d1
    (listeners[event] || []).forEach(cb => cb(data)); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:8 uuid:58af7096
  } // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:9 uuid:00c64032
}; // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:10 uuid:352bdab5
// feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.304Z line:11 uuid:885fca1b