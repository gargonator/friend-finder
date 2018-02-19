// run main page script
init();

// display the questions and execute the matching logic
function init() {
	$(document).ready(function() {

		// build a question div for each question and append to page
		questionIds.forEach((questionId,index) => {

			var questionDiv = buildQuestion(questionId,index);
			// append questionDiv to survey questions panel body
			$('#survey-questions').append(questionDiv);

		});
		// listen for submit button click
		// on click, get user input, post to server, and display the best match
		$('button[type=submit]').on('click', (e) => {
			// get all inputs and add to profile object
			var profile = buildProfile();
			// check if all required questions have been answered
			if (!isValidResponse(profile)) {
				alert('Please answer all the questions!'); // alert if not all answered
				return; // exit the function
			}
			// post request to send the profile to the server
			$.post('api/friends', profile, (res) => {
				// if profile is already in system, alert the user
				if (res === 'duplicate') {
					alert('This profile is already in the system! Try again.');
					return;
				}
				// build modal body and display the modal
				displayModal(res);
			});
		});
	});
}