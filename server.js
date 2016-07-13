'use strict';

const express = require("express");

// Helper Files
const scrape = require('./js/scrape.js');
const job = require('./js/schedule.js');
const makeNotification = require('./js/notifications.js');

const app = express();

const newUsers = 100;
let text = `\ud83d\ude0e Billwise gained ${newUsers} users! \ud83d\ude1b`;
let devToken = "ca0b0fb0d067daa5bb61aa380431caa2c47b8995a4c4094d2fb22e8f3f803438";
makeNotification(text, devToken);

// Scrape on any url
app.get('*', (req, res) => {
	scrape(req, res, 'RETURN_JSON');
});

// Reverse Proxy URL
app.listen('8777', '10.132.4.187');
//app.listen('8080');

console.log("Server running on http://10.132.4.187:8777/");