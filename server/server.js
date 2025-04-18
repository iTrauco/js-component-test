const express = require('express'); // commit:6a2a820|time:2025-04-18T16:15:27.019Z line:1 uuid:af898543
const path = require('path'); // commit:6a2a820|time:2025-04-18T16:15:27.019Z line:2 uuid:7ba8342b
const app = express(); // commit:6a2a820|time:2025-04-18T16:15:27.019Z line:3 uuid:0602163b
const PORT = 3000; // commit:6a2a820|time:2025-04-18T16:15:27.019Z line:4 uuid:5893f988
// commit:6a2a820|time:2025-04-18T16:15:27.019Z line:5 uuid:ae5f8380
app.use(express.static(path.join(__dirname, '../public'))); // commit:6a2a820|time:2025-04-18T16:15:27.019Z line:6 uuid:7327df93
app.use(express.static(path.join(__dirname, '../src'))); // commit:6a2a820|time:2025-04-18T16:15:27.019Z line:7 uuid:296bb166
// commit:6a2a820|time:2025-04-18T16:15:27.019Z line:8 uuid:73d5460e
app.listen(PORT, () => { // commit:6a2a820|time:2025-04-18T16:15:27.019Z line:9 uuid:8c8ed517
  console.log(`🚀 Server running at http://localhost:${PORT}`); // commit:6a2a820|time:2025-04-18T16:15:27.019Z line:10 uuid:6c5fcec3
}); // commit:6a2a820|time:2025-04-18T16:15:27.019Z line:11 uuid:b9e31a2f
// commit:6a2a820|time:2025-04-18T16:15:27.019Z line:12 uuid:6a6b061d