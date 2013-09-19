var fs = require('fs');
var request = require('request');
var template = fs.readFileSync(__dirname + '/static/index.html');
var cheerio = require('cheerio');
var filledTemplate;

function updateBadgePage(){
	request('https://brain.diy.org/skills?limit=200', function(er, res, body){
		if(!er){

			var responseObject = JSON.parse(body).response;
			// console.log(JSON.stringify(responseObject, null, '\t'));

			$ = cheerio.load(template);
			$badgeMap = $('#badgeMap');
			$badgeMap.html('');

			for (var i = 0, iLen = responseObject.length; i < iLen; i++){
				var badge = responseObject[i];
				$badgeMap.append('<div class="badge" badgeId='+badge.id+'><a href="https://diy.org/skills/'+badge.url+'"><img src="https:'+badge.images.medium+'"></a></div>');
			}

			filledTemplate = $.html();
		}
	})
}

updateBadgePage();


module.exports = function(req, res){
	if(filledTemplate){
		res.writeHead(200);
		res.end( filledTemplate );
	}else{
		res.writeHead(500);
		res.end();
	}
}