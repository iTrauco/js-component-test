import { getById } from './utils/domUtils.js'; // time:2025-04-18T16:51:26.036Z uuid:2411fce4
import { showModal } from './components/Modal.js'; // time:2025-04-18T16:51:26.036Z uuid:d35c49e6
// time:2025-04-18T16:51:26.036Z uuid:f39ebf5e
document.addEventListener('DOMContentLoaded', () => { // time:2025-04-18T16:51:26.036Z uuid:75508293
  const btn = getById('test-btn'); // time:2025-04-18T16:51:26.036Z uuid:eaadd976
  btn.addEventListener('click', () => { // time:2025-04-18T16:51:26.036Z uuid:3723c172
    showModal('Modal opened by Button!'); // time:2025-04-18T16:51:26.036Z uuid:e905693b
  }); // time:2025-04-18T16:51:26.036Z uuid:98c43963
}); // time:2025-04-18T16:51:26.036Z uuid:134e3957
// time:2025-04-18T16:51:26.036Z uuid:dbb8db02