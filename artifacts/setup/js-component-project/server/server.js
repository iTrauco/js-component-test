const express = require('express'); // line:1 uuid:ed462436
const path = require('path'); // line:2 uuid:a25da10c
const app = express(); // line:3 uuid:67f2de65
const PORT = 3000; // line:4 uuid:8a0b884a
// line:5 uuid:63ae257c
app.use(express.static(path.join(__dirname, '../public'))); // line:6 uuid:db8afd1b
app.use(express.static(path.join(__dirname, '../src'))); // line:7 uuid:1666c70d
// line:8 uuid:47aba629
app.listen(PORT, () => { // line:9 uuid:3da7f017
  console.log(`🚀 Server running at http://localhost:${PORT}`); // line:10 uuid:651c61cd
}); // line:11 uuid:0d39cfe2
// line:12 uuid:92c2a22f