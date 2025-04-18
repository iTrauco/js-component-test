import { getById } from './utils/domUtils.js'; // 6084808|2025-04-18T16:08:33.279Z line:1 uuid:fbae1a91
import { showModal } from './components/Modal.js'; // 6084808|2025-04-18T16:08:33.279Z line:2 uuid:6157977e
// 6084808|2025-04-18T16:08:33.279Z line:3 uuid:da7d2c54
document.addEventListener('DOMContentLoaded', () => { // 6084808|2025-04-18T16:08:33.279Z line:4 uuid:a8009f27
  const btn = getById('test-btn'); // 6084808|2025-04-18T16:08:33.279Z line:5 uuid:b95d9d6e
  btn.addEventListener('click', () => { // 6084808|2025-04-18T16:08:33.279Z line:6 uuid:b09ad596
    showModal('Modal opened by Button!'); // 6084808|2025-04-18T16:08:33.279Z line:7 uuid:d0c87db6
  }); // 6084808|2025-04-18T16:08:33.279Z line:8 uuid:e22617f9
}); // 6084808|2025-04-18T16:08:33.279Z line:9 uuid:00478cdf
// 6084808|2025-04-18T16:08:33.279Z line:10 uuid:af25985b