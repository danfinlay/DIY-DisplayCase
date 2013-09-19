function makeDraggable(){

	var velocityModeEnabled = true;
	
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

		function animationLoop(d){

			requestAnimationFrame(animationLoop);     

			if(!isDragging && mapVelocity[0] !== 0 && mapVelocity[1] !== 0){
				mapVelocity = [mapVelocity[0]*0.95, mapVelocity[1]*0.95];
				mapCoords = [mapCoords[0] - mapVelocity[0], mapCoords[1] - mapVelocity[1]];
				translateMap();
	  // Firefox 23 / IE 10 / Chrome
				// window.mozRequestAnimationFrame(animationLoop);    // Firefox < 23
				// window.webkitRequestAnimationFrame(animationLoop);

			}
		}

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