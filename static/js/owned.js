var badgesOwned = [];

var achievementURL = 'https://brain.diy.org/makers/';

var userIdStart = window.location.href.indexOf('#');
if(userIdStart !== -1){
	var userId = window.location.href.slice(userIdStart+1, window.location.href.length);
	achievementURL += userId;
	achievementURL += '/achievements';

	$.getJSON(achievementURL, function(data){
		if(data){
			// console.log(data.response.skills);
			badgesOwned = _.map(data.response.skills, function(a){
				return a.id;
			});
			// console.log(badgesOwned);
			highlightOwned();
		}
	});
}


function highlightOwned(){
	// console.log("Highlighting owned: ");
	for(var i = 0; i < badgesOwned.length; i++){
		// console.log("Badge "+i+" is ", $('div.badge[badgeId="'+badgesOwned[i]+'"]'))
		$('div.badge[badgeId="'+badgesOwned[i]+'"]').css('opacity', 1.0);
	}
}