var friendsData = require('../data/friends');
var fs = require('fs');
var path = require('path');

// Routing for getting and posting friend data

module.exports = function(app) {

	// returns JSON of all friends that have submitted surveys
	app.get('/api/friends', (req, res) => {
		fs.readFile(__dirname + '/../data/friends.js', 'utf8', (err, data) => {
			if (err) throw err;
			res.send(JSON.parse(data));
		})
	});

	// saves a new profile and returns the closest match if applicable
	app.post('/api/friends', (req, res) => {
		// read in current saved profiles
		fs.readFile(__dirname + '/../data/friends.js','utf8', (err,data) => {
			if (err) throw err;
			var friendsData = JSON.parse(data);
			var equivalenceFlag = false;
			var numFriends = friendsData.length;
			// if posted profile already in saved profiles, tell client it's a duplicate
			friendsData.forEach((friend) => {
				if (isEquivalent(req.body, friend)) {
					equivalenceFlag = true;
				}
			});
			if (equivalenceFlag) {
				res.send('duplicate');
			} 
			// otherwise, if not a duplicate, get the closest match
			else {
				// add posted profile to current saved friend profiles
				friendsData.push(req.body);
				// persist profiles
				fs.writeFile(__dirname + '/../data/friends.js',JSON.stringify(friendsData),'utf8',(err) => { 
				if (err) throw err;
				// set the posted profile as the friend to match
				var friendToMatch = req.body;
				var smallestDiff = 100; // 100 is arbitrary, need a large initial value
				var closestMatch;
				// loop through the profiles in system, searching for best match
				friendsData.forEach( (friend) => {
					// if profile isn't the same person and if the profile difference is the
					// smallest found, set the closest match to the current friend
					if (!isEquivalent(friendToMatch, friend) && arrayDiff(friendToMatch['responses[]'], friend['responses[]']) < smallestDiff) {
						closestMatch = friend;
						smallestDiff = arrayDiff(friendToMatch['responses[]'], friend['responses[]']);
					}
				})
					// send the closest match object and the number of profiles in system back to client
					res.send([closestMatch,{numFriends: numFriends}]);
				});
			}
		});
	});

};

// returns absolute value of total difference in values of response arrays
function arrayDiff(a1, a2) {
	var totalDiff = 0;
	a2.forEach((elem, index) => {
		totalDiff += Math.abs(elem - a1[index]);
	});
	return totalDiff;
}

// checks if two friends objects are 'equivalent' in terms of their values
function isEquivalent(obj1, obj2) {
	if (obj1.name === obj2.name && obj1.picture === obj2.picture) {
		return true;
	} else {
		return false;
	}
}
