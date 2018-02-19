// function to check if all survey responses are filled out
function isValidResponse(input) {
	var isValid = true;
	if (input.name === '' || input.picture === '') {
		return false;
	}
	input.responses.forEach( (response) => {
		if (typeof response != 'number' || isNaN(response)) {
			isValid = false;
		}
	});
	return isValid;
}

// builds a new question and appends it to the page
function buildQuestion(questionId,index) {
	// build components of question
	var questionDiv = $(`<div class='question'></div>`);
	var questionHeading = $(`<h3 class='question-heading'></h3>`)
		.text('Question ' + (index+1).toString());
	var questionBody = $(`<p class='question-body'></p>`)
		.text(questions[index]);
	// append heading and body to question div
	questionDiv.append(questionHeading);
	questionDiv.append(questionBody);
	// append radio buttons to question div
	for (var i = 0; i < 5; i++) {
		var radioButton = $(`<input type='radio'>`).attr({ value:i+1, name:questionId});
		questionDiv.append(radioButton);
	}
	// build question labels
	var questionLabels = 				
	`<div class='radio-labels'>
		<div class='disagree'>Strongly<br>disagree</div>
		<div class='neutral'>Neutral</div>
		<div class='agree'>Strongly<br>agree</div>
	</div>`
	// append question lables
	questionDiv.append(questionLabels);
	// return the question div
	return questionDiv;
}

// creates a profile object based on inputted information
function buildProfile() {
	var profile = {};
	var responses = [];
	profile.name = $('input[type=name]').val();
	profile.picture = $('input[type=picture').val();
	questionIds.forEach((questionId) => {
		responses.push(parseInt($(`input[name=${questionId}]:checked`).val()));
	})
	profile.responses = responses;
	return profile;
}

// displays a modal based on server respons
function displayModal(res) {
	// otherwise, start by removing any previous match information from modal
	$('#match-message').remove();
	$('#match-image').remove();
	$('#match-count').remove();
	// build the match message, match image, and match count
	var matchMessage;
	var matchImage;
	var matchCount;
	if (!res[0]) { // if first profile entered, display special message
		matchMessage = $(`<p id='match-message'></p>`).text('You are the first profile! Please wait for more profiles to be created to get matched.');
		$('.modal-body').append(matchMessage);
	} else { // otherwise, display the best match to the user
		matchMessage = $(`<p id='match-message'></p>`).html(`Your best match is <strong>${res[0].name}</strong>`);
		$('.modal-body').append(matchMessage);					
		if (res[0].picture.slice(0,4) === 'http') {
			matchImage = $(`<img id='match-image'>`).attr('src',res[0].picture);
			$('.modal-body').append(matchImage);						
		}
	}
	// display the count of the number of potential matches in the system
	matchCount = $(`<p id='match-count'></p>`).text(`There are currently ${res[1].numFriends} people in the system to match with.`)
	$('.modal-body').append(matchCount);
	// display the modal
	$('#modal').modal()
}
