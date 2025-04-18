const express = require('express'); // uuid:7ca56b19
const path = require('path'); // uuid:c22a2102
const app = express(); // uuid:ad2a7878
const PORT = 3000; // uuid:2b9753a3
// uuid:87180571
app.use(express.static(path.join(__dirname, '../public'))); // uuid:0031e25c
app.use(express.static(path.join(__dirname, '../src'))); // uuid:8d17370b
// uuid:bfb732a3
app.listen(PORT, () => { // uuid:e3b54e38
  console.log(`🚀 Server running at http://localhost:${PORT}`); // uuid:af0c963f
}); // uuid:0e4cdeb6
// uuid:99d13754