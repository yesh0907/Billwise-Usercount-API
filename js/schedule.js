'use strict';

var schedule = require('node-schedule');

const scrape = require('./scrape.js');
const makeNotification = require('./notifications.js');
const getDeviceIDs = require('./getDeviceID.js');
const globals = require('./globals.js');

// Get Device Tokens
var deviceTokens = getDeviceIDs();

// Schedule to scrape site every 20 minutes, if change send push notification
var job = schedule.scheduleJob('*/20 * * * * *', () => {
	scrape();
	if (global.NEW_USERS !== 0) {
		const newUsers = global.NEW_USERS;
		for (let i in deviceTokens) {
			let text = `\ud83d\ude0e Billwise gained ${newUsers} new users! \ud83d\ude1b`;
			let devToken = deviceTokens[i];
			console.log(`${new Date()} - Pushing Notification: Billwise gained ${newUsers} new users!`);
			makeNotification(text, devToken);
		}
	}
});

exports = module.exports = job;
