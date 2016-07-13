'use strict';

const request = require("request");
const cheerio = require("cheerio");
const globals = require('./globals.js');

const scrape = (req, res, type=null) => {
	if (type === "RETURN_JSON") {
		// Url to scrape
		const url = "https://billwise.co/press";

		// Make the request
		request(url, (error, response, html) => {
			// Check if there is no error
			if (!error) {
				// Gets the HTML of the webpage
				const $ = cheerio.load(html);

				// Sets up JSON to store data and return
				let users;
				var json = { users: "" };

				let text = $('.well').text();				// Gets the text that needs to be parsed
				let keywords = ['for', 'Singaporeans']		// The keywords that are helpful

				var positions = [];							// Positions of the keywords.

				for (let i in keywords) {
					if (keywords[i] == 'for') {
						let len = keywords[i].length;
						positions.push(text.lastIndexOf(keywords[i]) + len);	// Adding the length to isolate the number
					}
					else {
						positions.push(text.indexOf(keywords[i]));
					}
				}

				const amountOfUsers = text.slice(positions[0], positions[1]);	//Store the amount of users

				// Check to see how many new users joined.
				global.NEW_USERS = amountOfUsers - global.PREVIOUS_VALUE; 	// REMOVE + 1 LATER JUST FOR TESTING...
				console.log("USERS:", global.NEW_USERS);
				// Store the current value as the previous for the next scrape
				global.PREVIOUS_VALUE = amountOfUsers.trim();

				json.users = amountOfUsers.trim();	// Strip of any whitespace at the beginning or the end and store.
													// Also store it in the json object.
				json = JSON.stringify(json);
				res.send(json);
			}
			else {
				console.error(error);
			}
		});
	}
	else {
		// Url to scrape
		const url = "https://billwise.co/press";

		// Make the request
		request(url, (error, response, html) => {
			// Check if there is no error
			if (!error) {
				// Gets the HTML of the webpage
				const $ = cheerio.load(html);

				let text = $('.well').text();				// Gets the text that needs to be parsed
				let keywords = ['for', 'Singaporeans']		// The keywords that are helpful

				var positions = [];							// Positions of the keywords.

				for (let i in keywords) {
					if (keywords[i] == 'for') {
						let len = keywords[i].length;
						positions.push(text.lastIndexOf(keywords[i]) + len);	// Adding the length to isolate the number
					}
					else {
						positions.push(text.indexOf(keywords[i]));
					}
				}

				const amountOfUsers = text.slice(positions[0], positions[1]);	//Store the amount of users

				// Check to see how many new users joined.
				global.NEW_USERS = amountOfUsers - global.PREVIOUS_VALUE; 	// REMOVE + 1 LATER JUST FOR TESTING...

				// Store the current value as the previous for the next scrape
				global.PREVIOUS_VALUE = amountOfUsers.trim();
			}
			else {
				console.error(error);
			}
		});
	}
}

exports = module.exports = scrape;