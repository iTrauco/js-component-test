const express = require('express'); // b129d2f|2025-04-18T16:13:59.589Z line:1 uuid:7438d5ae
const path = require('path'); // b129d2f|2025-04-18T16:13:59.589Z line:2 uuid:878a96ef
const app = express(); // b129d2f|2025-04-18T16:13:59.589Z line:3 uuid:acd54250
const PORT = 3000; // b129d2f|2025-04-18T16:13:59.589Z line:4 uuid:42e3de94
// b129d2f|2025-04-18T16:13:59.589Z line:5 uuid:8e60c729
app.use(express.static(path.join(__dirname, '../public'))); // b129d2f|2025-04-18T16:13:59.589Z line:6 uuid:ad218a78
app.use(express.static(path.join(__dirname, '../src'))); // b129d2f|2025-04-18T16:13:59.589Z line:7 uuid:f36bd080
// b129d2f|2025-04-18T16:13:59.589Z line:8 uuid:914cd00f
app.listen(PORT, () => { // b129d2f|2025-04-18T16:13:59.589Z line:9 uuid:c66b16a1
  console.log(`🚀 Server running at http://localhost:${PORT}`); // b129d2f|2025-04-18T16:13:59.589Z line:10 uuid:bbf88567
}); // b129d2f|2025-04-18T16:13:59.589Z line:11 uuid:49be8dcc
// b129d2f|2025-04-18T16:13:59.589Z line:12 uuid:469cba5b