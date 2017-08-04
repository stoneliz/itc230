'use strict'
var movie = require("./lib/movies.js");
const express = require("express");
const app = express();

var handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

// send static file as response
app.get('/', function(req,res){
 res.type('text/html');
 //res.sendFile(__dirname + '/public/home.html');
 res.render('home.html', {movies: movie.getAll});
});

// send static file as response
app.get('/about', function(req,res){
 res.type('text/html');
 res.sendFile(__dirname + '/public/about.html');
 res.render('about.html');
});

//handle GET
app.get('/delete', function(req,res){
 var result = movie.deleteOne(req.query.title); //delete movie object
 res.render('delete', {title: req.query.title, result: result});
 });

app.get('/detail', function(req,res){
  console.log(req.query); // display parsed querystring object
  var found = movie.getOne(req.query.title);
  res.render("details", {title: req.query.title, result: found, movies: movie.getAll()});
});

//handle POST
app.post('/detail', function(req,res){
  console.log(req.body); // display parsed form submission
  var found = movie.getOne(req.body.title);
  res.render("details", {title: req.body.title, result: found, movies: movie.getAll()});
});

// define 404 handler
app.use(function(req,res) {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
 console.log('Express started'); 
});