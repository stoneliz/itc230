var movie = require("./lib/movies.js");
// console.log(movie.getAll());
// console.log(movie.getOne('Amelie'));
// console.log(movie.deleteOne());

var http = require('http'),
 fs = require('fs') , qs = require("querystring");
function serveStaticFile(res, path, contentType, responseCode) {
 if(!responseCode) responseCode = 200;
 fs.readFile(__dirname + path, function(err,data) {
 if(err) {
 res.writeHead(500, { 'Content-Type': 'text/plain' });
 res.end('500 - Internal Error');
 } else {
 res.writeHead(responseCode,
 { 'Content-Type': contentType });
 res.end(data);
 }
 });
}
http.createServer(function(req,res){
 var url = req.url.split("?");
 var params = qs.parse(url[1]);
 //console.log(params);
 // normalize url by removing querystring, optional
 // trailing slash, and making lowercase
 var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
 
 switch(path) {
 case '':
 serveStaticFile(res, '/public/home.html', 'text/html');
 break;
 
 case '/about':
 serveStaticFile(res, '/public/about.html', 'text/html');
 break;
 
 case '/img/dogcat.jpg':
 serveStaticFile(res, '/public/img/dogcat.jpg',
'image/jpeg');
 break;

 case '/get':
 var found = movie.getOne(params.title); //get movie object
 res.writeHead(200, {'Content-Type': 'text/plain'} );
 var results = (found) ? JSON.stringify(found) : "That title was not found.";
 res.end('Results for ' + params.title + ":" + "\n" + results);
 break;
 
 case '/delete':
 var result = movie.deleteOne(params.title);
 res.writeHead(200, {'Content-Type': 'text/plain'} );
 var message = (result.deleted) ? "removed." : "not found.";
 res.end(params.title + " was " + message + " There are " + result.total + " movies remaining." );
 break;
 
 default:
 serveStaticFile(res, '/public/404.html', 'text/html',
 404);
 break;
 }
}).listen(process.env.PORT || 3000);
console.log('Server started; press Ctrl-C to terminate....');