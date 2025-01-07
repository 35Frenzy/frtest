const { Client, Intents } = require('discord.js');
const path = require('path');
const fs = require('fs');
const config = require('./config.json');

// Intents v13 ile uyumlu olarak güncellenmiştir
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (file.startsWith('ready')) {
        client.once('ready', () => event(client));
    } else if (file.startsWith('voiceStateUpdate')) {
        client.on('voiceStateUpdate', event);
    }
}

//Aktiflik sağlama
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log('Sunucu ${port} numaralı bağlantı noktasında yürütülüyor.');
});



client.login(Process.env.token);
