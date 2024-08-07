const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const outputDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');

// Ensure output directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Copy static assets from 'public' to 'dist'
fs.cpSync(publicDir, outputDir, { recursive: true });

// Function to render and save an EJS template to a static HTML file
const renderTemplate = (templatePath, outputPath, data) => {
    ejs.renderFile(templatePath, data, (err, str) => {
        if (err) {
            console.error(`Error rendering template ${templatePath}:`, err);
            return;
        }
        fs.writeFileSync(outputPath, str);
    });
};

// Render the index page
renderTemplate(path.join(__dirname, 'views', 'index.ejs'), path.join(outputDir, 'index.html'), {});

// Simulate generating static files for DS games
const dsGameIds = ['game1', 'game2']; // Replace with actual game IDs
dsGameIds.forEach(gameId => {
    const configPath = path.join(__dirname, 'public', 'rom', 'ds', gameId, 'config.json');
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const gameName = config.name;
        renderTemplate(
            path.join(__dirname, 'views', 'roms', 'ds.ejs'),
            path.join(outputDir, `game/ds/${gameId}.html`),
            { gameName, gameId }
        );
    }
});

// Simulate generating static files for GBA games
const gbaGameIds = ['game1', 'game2']; // Replace with actual game IDs
gbaGameIds.forEach(gameId => {
    const configPath = path.join(__dirname, 'public', 'rom', 'gba', gameId, 'config.json');
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const gameName = config.name;
        renderTemplate(
            path.join(__dirname, 'views', 'roms', 'gba.ejs'),
            path.join(outputDir, `game/gba/${gameId}.html`),
            { gameName, gameId }
        );
    }
});

console.log('Build complete.');