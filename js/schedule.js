'use strict';

var schedule = require('node-schedule');

const scrape = require('./scrape.js');
const makeNotification = require('./notifications.js');
const getDeviceIDs = require('./getDeviceID.js');
const globals = require('./globals.js');

// Get Device Tokens
var deviceTokens = getDeviceIDs();

// Schedule to scrape site every 30 minutes, if change send push notification
var job = schedule.scheduleJob('*/30 * * * *', () => {
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