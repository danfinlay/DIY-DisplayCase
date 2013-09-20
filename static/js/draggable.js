function makeDraggable(){

	var velocityModeEnabled = true;

	var bouncyMode = true;

	//Energy retained from frame to frame:
	var resistance = 1; // Zero friction, would float forever in a vacuum.
	// var resistance = 0.95; //A pleasant ammount, like an air hockey table.
	var restitution = -1; // Impossibly perfectly bouncing walls lose no velocity.
	// var restitution = -0.92;  //The coefficient of restitution of Zectron, the world's bounciest material!
	
	var mapCoords = [0,0];
	var mapVelocity = [-2,-1.5];

	var mouseLocation;
	var isDragging = false;
	var ignoreClicks = false;
	var mouseIsDown = false;

	$badgeMap = $('div#badgeMap');

//Some notes for adding mobile event handlers eventually:
	// el.addEventListener("touchstart", handleStart, false);
 //  el.addEventListener("touchend", handleEnd, false);
 //  el.addEventListener("touchcancel", handleCancel, false);
 //  el.addEventListener("touchleave", handleEnd, false);
 //  el.addEventListener("touchmove", handleMove, false);
 //  log("initialized.");

	$badgeMap.mousedown(touchedDown)

	function touchedDown (e){
		e.preventDefault();
		mouseLocation = [e.clientX, e.clientY];
		isDragging = true;
		mouseIsDown = true;
	}

	$('.badge a').click(function(e){
		if(ignoreClicks){
			e.preventDefault();
		}
	})

	$badgeMap.mouseup(function(e){
		e.preventDefault();
		isDragging = false;
		mouseIsDown = false;

		setTimeout(function(){
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

	$body = $('body');
	function translateMap(){
		var transform = 'translateX('+mapCoords[0]+'px) translateY('+mapCoords[1]+'px)';
		// console.log(transform);
		$badgeMap.css('transform', transform);
		$badgeMap.css('-moz-transform', transform);
		$badgeMap.css('-webkit-transform', transform);
		$badgeMap.css('-o-transform', transform);
		$badgeMap.css('-ms-transform', transform);

		$body.css('background-position', mapCoords[0]/4+'px '+mapCoords[1]/4+'px');

	}
  

	//Variables needed for bouncing:
	var xLimitLow, yLimitLow, xLimitHigh, yLimitHigh;

	var configureLimits = function(){
		// console.log("Width & Height: "+window.width+" and "+window.height);
		console.log(window.trophyCaseDimensions[0], window.width);
		xLimitLow = - Math.abs(  window.trophyCaseDimensions[0] - ( window.width * 0.75 ));
		yLimitLow = - Math.abs(  window.trophyCaseDimensions[1] - ( window.height * 0.8 ));
		// console.log("Absolutes: "+xLimitLow+", "+yLimitLow);
		xLimitHigh = Math.floor( window.width / 5 );
		yLimitHigh = Math.floor( window.height / 5 );
	}

	$(window).resize(function(){
		// console.log("Window resized");
		window.width = $(window).width();
		window.height = $(window).height();
		window.badgeMapContainer.css('height', window.height);
		configureLimits();
	});

	if(velocityModeEnabled){

		configureLimits();

		function animationLoop(d){

			requestAnimationFrame(animationLoop);     

			if(!isDragging && mapVelocity[0] !== 0 && mapVelocity[1] !== 0){
				mapVelocity = [ mapVelocity[0] * resistance, mapVelocity[1] * resistance ];
				mapCoords = [ mapCoords[0] - mapVelocity[0], mapCoords[1] - mapVelocity[1] ];

				if(bouncyMode){

					//For debugging bounce ranges:
					// console.log("x: "+mapCoords[0] + " y: "+mapCoords[1]);
					// console.log("Low x: "+xLimitLow+" Low y: "+yLimitLow);
					// console.log("High x: "+xLimitHigh+" High y: "+yLimitHigh);

					if( ( mapCoords[0] < xLimitLow && mapVelocity[0] > 0 ) || ( mapCoords[0] > xLimitHigh && mapVelocity[0] < 0 ) ){
						mapVelocity[0] *= restitution;
					}

					if( ( mapCoords[1] < yLimitLow && mapVelocity[1] > 0 ) || ( mapCoords[1] > yLimitHigh && mapVelocity[1] < 0 ) ){
						mapVelocity[1] *= restitution;
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