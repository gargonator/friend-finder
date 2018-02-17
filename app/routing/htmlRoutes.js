var path = require('path');

// Routing for displaying home page and survey page

module.exports = function(app) {

	// route for stylesheet
	app.get('/css', (req,res) => {
		res.sendFile(path.join(__dirname, '../public/style.css'));
	})

	// route for survey page
	app.get('/survey', (req, res) => {
		// returns survey content
		res.sendFile(path.join(__dirname, '../public/survey.html'));
	});

	// route for home page
	app.get('/:home?', (req, res) => {
		// returns home page content
		res.sendFile(path.join(__dirname, '../public/home.html'));
	});

};