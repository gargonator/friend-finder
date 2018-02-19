var path = require('path');

// Routing for displaying home page and survey page

module.exports = function(app) {

	// ROUTING FOR STYLESHEETS
	// ****************************************************

	// route for home stylesheet
	app.get('/css/home', (req,res) => {
		res.sendFile(path.join(__dirname, '../public/css/homestyle.css'));
	});

	// route for survey stylesheet
	app.get('/css/survey', (req,res) => {
		res.sendFile(path.join(__dirname, '../public/css/surveystyle.css'));
	});

	// ROUTING FOR SCRIPTS
	// ****************************************************

	// route for question data
	app.get('/js/questions', (req,res) => {
		res.sendFile(path.join(__dirname, '../public/javascript/questions.js'));
	});

	// route for helper functions
	app.get('/js/helper_functions', (req,res) => {
		res.sendFile(path.join(__dirname, '../public/javascript/helper_functions.js'));
	});

	// route for main survey page script
	app.get('/js/init', (req,res) => {
		res.sendFile(path.join(__dirname, '../public/javascript/init.js'));
	});

	// ROUTING FOR HTML PAGES
	// ****************************************************

	// route for survey page
	app.get('/survey', (req, res) => {
		// returns survey content
		res.sendFile(path.join(__dirname, '../public/html/survey.html'));
	});

	// route for home page
	app.get('/:home?', (req, res) => {
		// returns home page content
		res.sendFile(path.join(__dirname, '../public/html/home.html'));
	});

};