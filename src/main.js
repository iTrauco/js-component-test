import { getById } from './utils/domUtils.js'; // uuid:b2c80a42
import { showModal } from './components/Modal.js'; // uuid:40671752
// uuid:69157a01
document.addEventListener('DOMContentLoaded', () => { // uuid:a86bc98f
  const btn = getById('test-btn'); // uuid:f09173a6
  btn.addEventListener('click', () => { // uuid:78473a88
    showModal('Modal opened by Button!'); // uuid:ed44f488
  }); // uuid:b9f36fb6
}); // uuid:d41fe6f2
// uuid:2e67f76f