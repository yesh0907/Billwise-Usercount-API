const firebase = require('firebase');

// Initialize Firebase
firebase.initializeApp({
	serviceAccount: 'conf/BillwiseUsers-493f1df56d07.json',
	databaseURL: 'https://billwiseusers.firebaseio.com/'
});

// Getting Users
var getUsersDeviceIDs = () => {
	let deviceTokens = [];
	const db = firebase.database();
	const users = db.ref("users");

	users.on('child_added', (snap) => {
		deviceTokens.push(snap.val());
	});

	users.on('child_removed', (snap) => {
		const index = deviceTokens.indexOf(snap.val());
		if (index > -1) {
			deviceTokens.splice(index, 1);
		}
	});

	return deviceTokens;
}

exports = module.exports = getUsersDeviceIDs;