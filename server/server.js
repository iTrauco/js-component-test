const express = require('express'); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:1 uuid:71d4dbb4
const path = require('path'); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:2 uuid:6f52ac5d
const app = express(); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:3 uuid:76440aea
const PORT = 3000; // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:4 uuid:5d958913
// feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:5 uuid:0a6a745f
app.use(express.static(path.join(__dirname, '../public'))); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:6 uuid:fcab2428
app.use(express.static(path.join(__dirname, '../src'))); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:7 uuid:ad2b2716
// feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:8 uuid:b89dcd0b
app.listen(PORT, () => { // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:9 uuid:54710e20
  console.log(\`🚀 Server running at http://localhost:\${PORT}\`); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:10 uuid:2fb5ebc1
}); // feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:11 uuid:08193b5f
// feat/uuidd-cli-testing|6962b87|2025-04-18T15:57:10.227Z line:12 uuid:5732a370