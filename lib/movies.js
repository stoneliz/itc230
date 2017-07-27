var movies = [
    {title: "The Princess Bride", releaseDate: 1987, leadActor: "Cary Elwes", leadActress: "Robin Wright"},
    {title: "Amelie", releaseDate: 2001, leadActor: "Mathieu Kassovitz", leadActress: "Audrey Tautou"},
    {title: "Dead Poets Society", releaseDate: 1989, leadActor: "Robin Wiliams", leadActress: "none"}
    ];
    
exports.getAll = function() {
    //return all movies 
        return movies
};

exports.getOne = function(title) {
    return movies.find(function(item) {
        return item.title == title;
    });
};

exports.deleteOne = function(title) {
    const oldLength = movies.length;
    movies = movies.filter(function(item){
        return item.title !==title;
    });
    return {deleted: oldLength !==movies.length, 
            total: movies.length 
    }; //object with 2 properties: boolean (old array length does not equal new array length) and number (length of array) 
};

exports.addOne = function(newMovie) {
    var added = false
    if (!this.getOne(newMovie.title)) {
        movies.push(newMovie);
        added = true;
    }
    return { added: added, 
             total: movies.length 
    };
 };
// console.log(movies.length);
//console.log(this.addOne({title:"Dune", releaseDate:1984, leadActor:"Kyle MacLachlan", leadActress:"Virginia Madsen"}));
// console.log(this.addOne({title:"Dune", releaseDate:1985, leadActor:"Kyle MacLachlan", leadActress:"Virginia Madsen"}));
// console.log(movies)