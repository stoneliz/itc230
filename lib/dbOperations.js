var Movie = require("../models/movie");

// return all records
Movie.find({}, function (err, items) {
  if (err) return next(err);
  console.log(items.length);
});