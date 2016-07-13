var apn = require('apn');

// Push Notifications
var makeNotification = (text, deviceToken) => {	
	// Options for the push notification config
	var options = {
		"cert": "conf/cert.pem",
		"key": "conf/key.pem",
		"passphrase": "TeamBillWise4970",
		"gateway": "gateway.sandbox.push.apple.com",
	    "port": 2195,
	    "enhanced": true,
	    "cacheLength": 5
	};

	// Make connection with the opetions set above
	var apnConnection = new apn.Connection(options);

	// My Device Token... Will change later
	var myDevice = new apn.Device(deviceToken);

	// Making the contents of the notifiaction
	var note = new apn.Notification();
	note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	note.alert = text;									// Alert Message
	note.payload = {'messageFrom': 'Billwise Users'};	// Sending User
	apnConnection.pushNotification(note, myDevice);		// Send the Push Notification!
}

exports = module.exports = makeNotification;