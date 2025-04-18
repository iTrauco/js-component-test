import { getById } from './utils/domUtils.js'; // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.281Z line:1 uuid:df657856
import { showModal } from './components/Modal.js'; // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.281Z line:2 uuid:d1f7f0e6
// feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.281Z line:3 uuid:3798b5a8
document.addEventListener('DOMContentLoaded', () => { // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.281Z line:4 uuid:70dcbd08
  const btn = getById('test-btn'); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.281Z line:5 uuid:72d3079d
  btn.addEventListener('click', () => { // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.281Z line:6 uuid:e73569f2
    showModal('Modal opened by Button!'); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.281Z line:7 uuid:620f3f7b
  }); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.281Z line:8 uuid:b35a9798
}); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.281Z line:9 uuid:af90144a
// feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.281Z line:10 uuid:be37c0ae