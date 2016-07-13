'use strict';

const express = require("express");

// Helper Files
const scrape = require('./js/scrape.js');
const job = require('./js/schedule.js');
const makeNotification = require('./js/notifications.js');

const app = express();

// Scrape on any url
app.get('*', (req, res) => {
	scrape(req, res, 'RETURN_JSON');
});

// Reverse Proxy URL
app.listen('8777', '10.132.4.187');
//app.listen('8080');

console.log("Server running on http://10.132.4.187:8777/");