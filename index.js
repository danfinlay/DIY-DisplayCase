var http = require('http');
var fs = require('fs');
var ecstatic = require('ecstatic');
var url = require('url');
var badgePager = require('./badgePager');

http.createServer(function(req, res){

	var parsedReq = url.parse(req.url,true);
    var path = parsedReq.pathname.split('/');
    console.log("Path requested: "+JSON.stringify(path));

    if(path[1] === ''  || path[1] === '/'){
    	console.log("BadgePager requested");
    	badgePager(req, res);
    }else{
    	console.log("Running ecstatic.");
    	ecstatic({root: __dirname+'/static', handleError:false})(req, res);
    }

}).listen( parseInt(process.argv[2]) || 8005 );