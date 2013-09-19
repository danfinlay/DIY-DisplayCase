function runFunction(){
	var badgesWide = 20;

	$('#badgeMapContainer').css('height', $(window).height());

	//Scale badge map:
	window.trophyCaseDimensions = [badgesWide * 143, 1300];
	$badgeMap = $('#badgeMap');
	$badgeMap.css('width', window.trophyCaseDimensions[1]);

	//Align badges:

	var badges = document.getElementsByClassName('badge');
	// console.log(badges);
	// console.log("We have "+ badges.length);

	for(var i = 0, iLen = badges.length; i < iLen; i++){
		var badge = $(badges.item(i));

		var coords = coordinatesForBadge(i, badgesWide);

		badge.css( 'left', coords[0] );

		badge.css( 'top', coords[1] );

	}

	highlightOwned();
	makeDraggable();
}

function coordinatesForBadge(i, badgesWide){
 
	var column = i % badgesWide;

	var x = column * 72;

	var y = Math.floor( i / badgesWide ) * 245;

	// var y = Math.floor( badgesWide / i ) * 290;

	//Stagger odd numbered badges:
	if(column % 2 === 1){
		y += 125;
	}

	return [x,y];


}