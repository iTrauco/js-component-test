import { getById } from './utils/domUtils.js'; // uuid:e94a42b8
import { showModal } from './components/Modal.js'; // uuid:56756b6d
// uuid:77fa081e
document.addEventListener('DOMContentLoaded', () => { // uuid:e9b5f0d5
  const btn = getById('test-btn'); // uuid:d3da1968
  btn.addEventListener('click', () => { // uuid:26ea5e0b
    showModal('Modal opened by Button!'); // uuid:c67041ab
  }); // uuid:2f51b68f
}); // uuid:0044184f
// uuid:4ef6b8a8