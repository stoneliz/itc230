'use strict'
//var movie = require("./lib/movies.js");
const express = require("express");
const app = express();
var Movie = require("./models/movie"); //database model

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

var handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', function(req,res,next){
 Movie.find({}, function (err, items) {
  var context = {
   items: items.map(function(movie){
    return {
     title: movie.title
    }
   })
  };
  res.render('home.html', context);
    //console.log(items);
});
 //res.type('text/html');
 //res.sendFile(__dirname + '/public/home.html');
//  res.render('home.html', {movies: movie.getAll});
 });

// send static file as response
app.get('/about', function(req,res){
 res.type('text/html');
 res.sendFile(__dirname + '/public/about.html');
 res.render('about.html');
});

app.get('/detail', function(req,res,next){
  Movie.findOne({title:req.query.title}, function (err, items) {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: items});
  });
  
});

//handle POST
app.post('/detail', function(req,res, next){
  Movie.findOne({title:req.body.title}, function (err, items) {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: items});
  });
});

app.get('/delete', function(req,res){
  Movie.remove({ title:req.query.title}, function (err, result){
    if (err) return next(err);
    let deleted = result.result.n !==0; // n will be 0 if no docs deleted
    Movie.count((err, total) => {
      res.type('text/html');
      res.render('delete', {title: req.query.title, deleted: result.result.n !==0, total: total});
    });
  });
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