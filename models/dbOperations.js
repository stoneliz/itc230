var Movie = require("../models/movie");

// return a single record
// Movie.findOne({'title':'Amelie'}, function (err, item) {
//  //console.log(err)

//  //console.log(item);
//   // other code here
// }); 

// return all records that match a condition
Movie.findOne({title}, function (err, items) {
 //console.log(items.length);
 // other code here
});

// return all records
Movie.find({}, function (err, items) {
    //console.log(items);
});

Movie.find({}, function (err, items) {
  if (err) {console.log(err)
  }else {
   // console.log(items.length);
  }
});