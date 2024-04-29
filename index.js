const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Port 8080 by default

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root directory
app.get('/game/gba/1', (req, res) => {
  res.render('roms/gba/1');
});

app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
