function runFunction(){
	window.badgesWide = 20;

	window.width = $(window).width();
	window.height = $(window).height();
	window.badgeMapContainer = $('#badgeMapContainer');
	window.badgeMapContainer.css('height', window.height);

	//Scale badge map:
	window.trophyCaseDimensions = [window.badgesWide * 143 / 2, 1300];
	$badgeMap = $('#badgeMap');
	// $badgeMap.css('width', window.trophyCaseDimensions[0]);

	//Align badges:

	var badges = document.getElementsByClassName('badge');
	// console.log(badges);
	// console.log("We have "+ badges.length);

	for(var i = 0, iLen = badges.length; i < iLen; i++){

		var badge = $(badges.item(i));

		var coords = coordinatesForBadge( i );

		badge.css( 'left', coords[0] );

		badge.css( 'top', coords[1] );

	}

	highlightOwned();
	makeDraggable();
}

function coordinatesForBadge(i){
 
	var column = i % window.badgesWide;

	var x = column * 72;

	var y = Math.floor( i / window.badgesWide ) * 245;

	// var y = Math.floor( window.badgesWide / i ) * 290;

	//Stagger odd numbered badges:
	if(column % 2 === 1){
		y += 125;
	}

	return [x,y];


}