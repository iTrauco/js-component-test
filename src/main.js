import { getById } from './utils/domUtils.js'; // time:2025-04-18T16:18:04.460Z line:1 uuid:ce5ceb85
import { showModal } from './components/Modal.js'; // time:2025-04-18T16:18:04.460Z line:2 uuid:364e81de
// time:2025-04-18T16:18:04.460Z line:3 uuid:6000ab30
document.addEventListener('DOMContentLoaded', () => { // time:2025-04-18T16:18:04.460Z line:4 uuid:721317ac
  const btn = getById('test-btn'); // time:2025-04-18T16:18:04.460Z line:5 uuid:8808c27c
  btn.addEventListener('click', () => { // time:2025-04-18T16:18:04.460Z line:6 uuid:491cf457
    showModal('Modal opened by Button!'); // time:2025-04-18T16:18:04.460Z line:7 uuid:4aea3d0b
  }); // time:2025-04-18T16:18:04.460Z line:8 uuid:62438707
}); // time:2025-04-18T16:18:04.460Z line:9 uuid:ea752a1b
// time:2025-04-18T16:18:04.460Z line:10 uuid:1fe642dc