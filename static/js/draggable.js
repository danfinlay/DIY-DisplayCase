function makeDraggable(){

	var velocityModeEnabled = true;
	var bouncyMode = true;
	var bouncing = [false, false];
	
	var mapCoords = [0,0];
	var mapVelocity = [0,0];

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
		mapVelocity = [mouseLocation[0]-x, mouseLocation[1]-y];
		mouseLocation = [x,y];
		mapCoords = [mapCoords[0] - mapVelocity[0], mapCoords[1] - mapVelocity[1]];
		translateMap();
	}

	function translateMap(){
		var transform = 'translateX('+mapCoords[0]+'px) translateY('+mapCoords[1]+'px)';
		// console.log(transform);
		$badgeMap.css('transform', transform);
		$badgeMap.css('-moz-transform', transform);
		$badgeMap.css('-webkit-transform', transform);
		$badgeMap.css('-o-transform', transform);
		$badgeMap.css('-ms-transform', transform);

	}
  
	if(velocityModeEnabled){
		var xLimitLow = -Math.floor( window.trophyCaseDimensions[0] * 0.4);
		var yLimitLow = -Math.floor( window.trophyCaseDimensions[1] * 0.7);
		var xLimitHigh = Math.floor( $(window).width() / 2 );
		var yLimitHigh = Math.floor( $(window).height() / 2 );

		function animationLoop(d){

			requestAnimationFrame(animationLoop);     

			if(!isDragging && mapVelocity[0] !== 0 && mapVelocity[1] !== 0){
				mapVelocity = [mapVelocity[0]*0.95, mapVelocity[1]*0.95];
				mapCoords = [mapCoords[0] - mapVelocity[0], mapCoords[1] - mapVelocity[1]];

				if(bouncyMode){

					//For debugging bounce ranges:
					// console.log("x: "+mapCoords[0] + " y: "+mapCoords[1]);
					// console.log("Low x: "+xLimitLow+" Low y: "+yLimitLow);
					// console.log("High x: "+xLimitHigh+" High y: "+yLimitHigh);

					if( (mapCoords[0] < xLimitLow || mapCoords[0] > xLimitHigh ) && !bouncing[0]){
						bouncing[0] = true;
						mapVelocity[0] *= -1;
					}else{
						bouncing[0] = false;
					}

					if( (mapCoords[1] < yLimitLow || mapCoords[1] > yLimitHigh ) && !bouncing[1]){
						mapVelocity[1] *= -1;
						bouncing[1] = true;
					}else{
						bouncing[1] = false;
					}
				}
				

				translateMap();
			}
		}

		// This closure allows easy use of requestAnimationFrame()
		// As described in this blog post:
		// http://creativejs.com/resources/requestanimationframe/
		(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
		    if (!window.cancelAnimationFrame)
		        window.cancelAnimationFrame = function(id) {
		            clearTimeout(id);
		        };
			}());


		animationLoop();
	}

}