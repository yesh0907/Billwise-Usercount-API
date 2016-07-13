'use strict';

var schedule = require('node-schedule');

const scrape = require('./scrape.js');
const makeNotification = require('./notifications.js');
const getDeviceIDs = require('./getDeviceID.js');
const globals = require('./globals.js');

// Get Device Tokens
var deviceTokens = getDeviceIDs();

const newUsers = 100;
let text = `\ud83d\ude0e Billwise gained ${newUsers} users! \ud83d\ude1b`;
let devToken = "ca0b0fb0d067daa5bb61aa380431caa2c47b8995a4c4094d2fb22e8f3f803438";
makeNotification(text, devToken);

// Schedule to scrape site every 5 minutes, if change send push notification
var job = schedule.scheduleJob('*/5 * * * *', () => {
	scrape();
	if (global.NEW_USERS !== 0) {
		const newUsers = global.NEW_USERS;
		for (let i in deviceTokens) {
			let text = `\ud83d\ude0e Billwise gained ${newUsers} users! \ud83d\ude1b`;
			let devToken = deviceTokens[i];
			makeNotification(text, devToken);
		}
	}
});

exports = module.exports = job;