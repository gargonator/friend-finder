var friendsData = require('../data/friends');
var fs = require('fs');
var path = require('path');

// Routing for getting and posting friend data

module.exports = function(app) {

	app.get('/api/friends', (req, res) => {
		// returns JSON of all friends that have submitted surveys
		fs.readFile(__dirname + '/../data/friends2.js', 'utf8', (err, data) => {
			if (err) throw err;
			res.send(JSON.parse(data));
		})
	});

	app.post('/api/friends', (req, res) => {
		fs.readFile(__dirname + '/../data/friends2.js','utf8', (err,data) => {
			if (err) throw err;
			var friendsData = JSON.parse(data);
			friendsData.push(req.body);
			fs.writeFile(__dirname + '/../data/friends2.js',JSON.stringify(friendsData),'utf8',(err) => { 
				if (err) throw err; 
				var friendToMatch = req.body;
				var smallestDiff = 100;
				var closestMatch;
				friendsData.forEach( (friend) => {
					console.log(friend)
					console.log(friend['responses[]'])
					if (!isEquivalent(friendToMatch, friend) && arrayDiff(friendToMatch['responses[]'], friend['responses[]']) < smallestDiff) {
						closestMatch = friend;
						smallestDiff = arrayDiff(friendToMatch['responses[]'], friend['responses[]']);
					}
			})
				res.json('Closest match is: ' + JSON.stringify(closestMatch));
			});
		});
	});

	app.post('/api/clear', () => {
		fs.writeFile(__dirname + '/../data/friends2.js', "[]", (err) => { if (err) throw err; })
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

// console.log(arrayDiff([1,2,3],[4,6,7])); // should output 11
// console.log(arrayDiff([1,1],[5,1])); // should output 4
