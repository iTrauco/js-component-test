import { getById } from './utils/domUtils.js'; // uuid:732a2948
import { showModal } from './components/Modal.js'; // uuid:e78af3ec
// uuid:90c4245d
document.addEventListener('DOMContentLoaded', () => { // uuid:5ba4671f
  const btn = getById('test-btn'); // uuid:36bade24
  btn.addEventListener('click', () => { // uuid:8e7f1a00
    showModal('Modal opened by Button!'); // uuid:82c2a979
  }); // uuid:06070e4c
}); // uuid:933276f7
// uuid:2faa7843