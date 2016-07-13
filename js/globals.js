'use strict';

var globals = {
	'NEW_USERS': 0,
	'PREVIOUS_VALUE': 0,
	updateValues: (newUsers, prevValue) => {
		this.NEW_USERS = newUsers;
		this.PREVIOUS_VALUE = prevValue;
		console.log(this.NEW_USERS, this.PREVIOUS_VALUE);
	}
}

exports = module.exports = globals;