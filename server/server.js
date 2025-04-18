const express = require('express'); // uuid:32fc92e7
const path = require('path'); // uuid:e07fabf5
const app = express(); // uuid:0a55bcd0
const PORT = 3000; // uuid:1cd2af70
// uuid:980a35b1
app.use(express.static(path.join(__dirname, '../public'))); // uuid:23aea865
app.use(express.static(path.join(__dirname, '../src'))); // uuid:1142696f
// uuid:32c1b902
app.listen(PORT, () => { // uuid:8a720157
  console.log(`🚀 Server running at http://localhost:${PORT}`); // uuid:4f3015c5
}); // uuid:291384d2
// uuid:1de9e038