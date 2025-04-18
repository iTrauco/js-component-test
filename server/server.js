const express = require('express'); // uuid:71a9d668
const path = require('path'); // uuid:d0def0f2
const app = express(); // uuid:f05d4e18
const PORT = 3000; // uuid:a29c1a18
// uuid:9623f523
app.use(express.static(path.join(__dirname, '../public'))); // uuid:00c1d98c
app.use(express.static(path.join(__dirname, '../src'))); // uuid:df31ebcc
// uuid:a0847909
app.listen(PORT, () => { // uuid:ab327d0e
  console.log(`🚀 Server running at http://localhost:${PORT}`); // uuid:874ed27f
}); // uuid:df82d825
// uuid:1b933d8b