const express = require('express'); // 6084808|2025-04-18T16:08:33.235Z line:1 uuid:5a1d4db0
const path = require('path'); // 6084808|2025-04-18T16:08:33.235Z line:2 uuid:eb5751b7
const app = express(); // 6084808|2025-04-18T16:08:33.235Z line:3 uuid:1a0db296
const PORT = 3000; // 6084808|2025-04-18T16:08:33.235Z line:4 uuid:2f6e0de6
// 6084808|2025-04-18T16:08:33.235Z line:5 uuid:35c48416
app.use(express.static(path.join(__dirname, '../public'))); // 6084808|2025-04-18T16:08:33.235Z line:6 uuid:817b0dac
app.use(express.static(path.join(__dirname, '../src'))); // 6084808|2025-04-18T16:08:33.235Z line:7 uuid:162def35
// 6084808|2025-04-18T16:08:33.235Z line:8 uuid:143d1224
app.listen(PORT, () => { // 6084808|2025-04-18T16:08:33.235Z line:9 uuid:1688695b
  console.log(`🚀 Server running at http://localhost:${PORT}`); // 6084808|2025-04-18T16:08:33.235Z line:10 uuid:98dab2dc
}); // 6084808|2025-04-18T16:08:33.235Z line:11 uuid:8b770ff8
// 6084808|2025-04-18T16:08:33.235Z line:12 uuid:820b3f16