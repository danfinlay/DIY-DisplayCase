function makeDraggable(){
	var mapCoords = [0,0];

	var mouseLocation;
	var isDragging = false;
	var ignoreClicks = false;
	var mouseIsDown = false;

	$badgeMap = $('div#badgeMap');


	$('div#badgeMap').mousedown(function(e){
		mouseLocation = [e.clientX, e.clientY];
		e.preventDefault();
		// console.log("Moused down");
		isDragging = true;
		mouseIsDown = true;

		// ignoreClicks = true;
	})

	$('.badge a').click(function(e){
		// console.log("Click received.");
		if(ignoreClicks){
			// console.log("Click ignored.");
			e.preventDefault();
		}

		// e.preventDefault();
	})

	$badgeMap.mouseup(function(e){
		// console.log("Moused up");
		e.preventDefault();
		isDragging = false;
		mouseIsDown = false;

		// console.log("Stopped dragging.");
		setTimeout(function(){
			// console.log("No longer ignoring clicks.");
			ignoreClicks = false;
		}, 100);
	})

	window.onmousemove = handleMouseMove;
	function handleMouseMove(event) {

		if(mouseIsDown){
			ignoreClicks = true;
			isDragging = true;
		    event = event || window.event; // IE-ism
		    draggedTo(event.clientX, event.clientY);
		}
	}

	function draggedTo(x, y){
		if(!mouseLocation) mouseLocation = [x,y];
		var dragVector = [mouseLocation[0]-x, mouseLocation[1]-y];
		mouseLocation = [x,y];
		mapCoords = [mapCoords[0] - dragVector[0], mapCoords[1] - dragVector[1]];
		translateMap();
	}


	function translateMap(){
		// var transform = 'translateX('+mapCoords[0]+'px) translateY('+mapCoords[1]+'px)';
		// console.log(transform);
		$badgeMap.css('transform', transform);
		$badgeMap.css('-moz-transform', transform);
		$badgeMap.css('-webkit-transform', transform);
		$badgeMap.css('-o-transform', transform);
		$badgeMap.css('-ms-transform', transform);

	}
}