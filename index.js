'strict'

function handleSubmitButton () {
	let startYear = 2006;
	let endYear = new Date().getFullYear();
	for (let year = startYear; year <= endYear; year++) {
		$('.js-query').append(`<option value="${year}">${year}</option>`)
	}
	$('.js-submit-form').submit( event => {
 		event.preventDefault();
 		getApiData();
 	});
}

function getApiData () {
	let searchEntry = $('.js-query').val();
	let url = 'https://api.spacexdata.com/v2/launches/all';
	let params = {
		launch_year: `${searchEntry}`
	};
	$.getJSON(url, params, function(data) {
		displayResults(data);
	});f
}

function displayResults (info) {
	$('.js-results-container').empty();
	if (info.length) {
		$.each(info, function(index, value) {
	    	let html = `
	    		<div class="launch-results">
	    				<div class="one">
	    					<h2>${value.rocket.rocket_name}</h2>
			      			<img src="${value.links.mission_patch_small}" alt="image of mission patch">
			      		</div>
			      		<div class="two">
			      			<h3>Details</h3>
			      			<ul>
				      			<li><strong>Video: </strong>Click <a href=${value.links.video_link} target="_blank">here</a> for full launch video.</li>
				      			<li><strong>Launch Date/Time: </strong> ${value.launch_date_local}</li>
				      			<li><strong>Article: </strong>Click <a href=${value.links.article_link} target="_blank">here</a> to read article.</li>
				      			<li><strong>Description: </strong>${value.details}</li>
			      			</ul>
			      		</div>			      
		      	</div>	
		    `
	        $('.js-results-container').append(html);
		});
	} else {
		let html = `
			<h2>Unfortunately there wasn't any launches in the year you selected.</h2>
		`
		$('.js-results-container').append(html);
	}
	$('.js-query').val('');
}

$(handleSubmitButton);

// <a href=${value.links.video_link} target="_blank"></a>


