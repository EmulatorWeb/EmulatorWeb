const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 8080;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle requests for /game/ds/:id
app.get('/game/ds/:id', (req, res) => {
    const gameId = req.params.id;
    const configPath = path.join(__dirname, 'public', 'rom', 'ds', gameId, 'config.json');

    // Read the contents of config.json
    fs.readFile(configPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading config file:', err);
            res.status(500).send('Error reading config file');
            return;
        }

        try {
            // Parse the JSON data
            const config = JSON.parse(data);
            // Extract the game name
            const gameName = config.name;

            // Render the EJS template with the extracted game name
            res.render('roms/ds.ejs', { gameName, gameId });
        } catch (parseError) {
            console.error('Error parsing config JSON:', parseError);
            res.status(500).send('Error parsing config JSON');
        }
    });
});

// Define a route to handle requests for /game/gba/:id
app.get('/game/gba/:id', (req, res) => {
    const gameId = req.params.id;
    const configPath = path.join(__dirname, 'public', 'rom', 'gba', gameId, 'config.json');

    // Read the contents of config.json
    fs.readFile(configPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading config file:', err);
            res.status(500).send('Error reading config file');
            return;
        }

        try {
            // Parse the JSON data
            const config = JSON.parse(data);
            // Extract the game name
            const gameName = config.name;

            // Render the EJS template with the extracted game name
            res.render('roms/gba.ejs', { gameName, gameId });
        } catch (parseError) {
            console.error('Error parsing config JSON:', parseError);
            res.status(500).send('Error parsing config JSON');
        }
    });
});

app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});