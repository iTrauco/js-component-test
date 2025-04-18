const express = require('express'); // time:2025-04-18T16:18:04.383Z line:1 uuid:807aefcb
const path = require('path'); // time:2025-04-18T16:18:04.383Z line:2 uuid:9257b6ad
const app = express(); // time:2025-04-18T16:18:04.383Z line:3 uuid:59262081
const PORT = 3000; // time:2025-04-18T16:18:04.383Z line:4 uuid:31021a4a
// time:2025-04-18T16:18:04.383Z line:5 uuid:6c035cad
app.use(express.static(path.join(__dirname, '../public'))); // time:2025-04-18T16:18:04.383Z line:6 uuid:24da69a6
app.use(express.static(path.join(__dirname, '../src'))); // time:2025-04-18T16:18:04.383Z line:7 uuid:ab9d28de
// time:2025-04-18T16:18:04.383Z line:8 uuid:873011cd
app.listen(PORT, () => { // time:2025-04-18T16:18:04.383Z line:9 uuid:0e7da8ca
  console.log(`🚀 Server running at http://localhost:${PORT}`); // time:2025-04-18T16:18:04.383Z line:10 uuid:6ad6013c
}); // time:2025-04-18T16:18:04.383Z line:11 uuid:e1488cae
// time:2025-04-18T16:18:04.383Z line:12 uuid:e4f298ce