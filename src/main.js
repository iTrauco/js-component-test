import { getById } from './utils/domUtils.js'; // time:2025-04-18T16:17:35.652Z line:1 uuid:8df93a62
import { showModal } from './components/Modal.js'; // time:2025-04-18T16:17:35.652Z line:2 uuid:d3bca688
// time:2025-04-18T16:17:35.652Z line:3 uuid:f2d46465
document.addEventListener('DOMContentLoaded', () => { // time:2025-04-18T16:17:35.652Z line:4 uuid:71745174
  const btn = getById('test-btn'); // time:2025-04-18T16:17:35.652Z line:5 uuid:aa14da89
  btn.addEventListener('click', () => { // time:2025-04-18T16:17:35.652Z line:6 uuid:1f5fe952
    showModal('Modal opened by Button!'); // time:2025-04-18T16:17:35.652Z line:7 uuid:d93d6c2e
  }); // time:2025-04-18T16:17:35.652Z line:8 uuid:22a595cf
}); // time:2025-04-18T16:17:35.652Z line:9 uuid:e512fc6f
// time:2025-04-18T16:17:35.652Z line:10 uuid:ea3e7abf