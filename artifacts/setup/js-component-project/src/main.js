import { getById } from './utils/domUtils.js'; // line:1 uuid:87a24090
import { showModal } from './components/Modal.js'; // line:2 uuid:193be5e7
// line:3 uuid:e5942e0a
document.addEventListener('DOMContentLoaded', () => { // line:4 uuid:62f43d68
  const btn = getById('test-btn'); // line:5 uuid:d8af42d4
  btn.addEventListener('click', () => { // line:6 uuid:74c816a6
    showModal('Modal opened by Button!'); // line:7 uuid:cafa64e5
  }); // line:8 uuid:89ddfa63
}); // line:9 uuid:b6800616
// line:10 uuid:ceb73f2f