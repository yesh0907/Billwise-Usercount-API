'use strict';

var express = require("express");
var request = require("request");
var cheerio = require("cheerio");

var app = express();

app.get('/', (req, res) => {
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
			json.users = amountOfUsers.trim();	// Strip of any whitespace at the beginning or the end and store.
												// Also store it in the json object.

			json = JSON.stringify(json);
			res.send(json);
		}
		else {
			console.error(error);
		}
	});
});

app.listen('8080', '10.132.4.187');

console.log("Server running on http://10.132.4.187:8080/");

exports = module.exports = app;