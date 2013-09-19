var badgesOwned = [];

var achievementURL = 'https://brain.diy.org/makers/';

var userIdStart = window.location.href.indexOf('#');
if(userIdStart !== -1){
	var userId = window.location.href.slice(userIdStart+1, window.location.href.length);
	achievementURL += userId;
	achievementURL += '/achievements';

	$.getJSON(achievementURL, function(data){
		if(data){
			badgesOwned = _.map(data.response.skills, function(a){
				return a.id;
			});
			highlightOwned();
		}
	});
}


function highlightOwned(){
	for(var i = 0; i < badgesOwned.length; i++){
		$('div.badge[badgeId="'+badgesOwned[i]+'"]').css('opacity', 1.0);
	}
}