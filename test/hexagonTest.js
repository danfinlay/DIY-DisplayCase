var expect = require('../node_modules/expect.js');

function coordinatesForBadge(i, badgesWide){
 
	var column = i % badgesWide;

	var x = column * 72;

	var y = Math.floor( i / badgesWide ) * 290;

	// var y = Math.floor( badgesWide / i ) * 290;

	//Stagger odd numbered badges:
	if(column % 2 === 1){
		y += 125;
	}

	return [x,y];


}

describe('BadgeCoordinates', function(){

	it('should put the first badge at 0, 0', function(){
		var res1 = coordinatesForBadge(0, 20);
		expect(res1[0]).to.equal(0);
		expect(res1[1]).to.equal(0);
	});

	it('should put the first badge in the next row down by 165 px', function(){
		var res = coordinatesForBadge(21, 20);
		expect(res[0]).to.equal(0);
		expect(res[1]).to.equal(290);
	});

});