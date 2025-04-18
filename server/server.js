const express = require('express'); // time:2025-04-18T16:17:35.577Z line:1 uuid:4b956231
const path = require('path'); // time:2025-04-18T16:17:35.577Z line:2 uuid:2e8aa075
const app = express(); // time:2025-04-18T16:17:35.577Z line:3 uuid:433140b4
const PORT = 3000; // time:2025-04-18T16:17:35.577Z line:4 uuid:0bce7cd8
// time:2025-04-18T16:17:35.577Z line:5 uuid:f02317aa
app.use(express.static(path.join(__dirname, '../public'))); // time:2025-04-18T16:17:35.577Z line:6 uuid:a351516c
app.use(express.static(path.join(__dirname, '../src'))); // time:2025-04-18T16:17:35.577Z line:7 uuid:0cdac861
// time:2025-04-18T16:17:35.577Z line:8 uuid:5049aaf1
app.listen(PORT, () => { // time:2025-04-18T16:17:35.577Z line:9 uuid:ec49b4fb
  console.log(`🚀 Server running at http://localhost:${PORT}`); // time:2025-04-18T16:17:35.577Z line:10 uuid:1a84a7ec
}); // time:2025-04-18T16:17:35.577Z line:11 uuid:343cbf6a
// time:2025-04-18T16:17:35.577Z line:12 uuid:288a363b