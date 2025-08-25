// generate-config.js
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

// On lit la variable depuis le .env
const apiKey = process.env.API_KEY;

// On génère un fichier config.js utilisable dans le navigateur
const content = `export const API_KEY = "${apiKey}";\n`;
fs.writeFileSync("config.js", content);

console.log("✅ config.js généré avec succès !");