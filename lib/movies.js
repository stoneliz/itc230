var movies = [
    {title: 'The Princess Bride', releaseDate: 1987, leadActor: 'Cary Elwes', leadActress: 'Robin Wright'},
    {title: 'Amelie', releaseDate: 2001, leadActor: 'Mathieu Kassovitz', leadActress: 'Audrey Tautou'},
    {title: 'Dead Poets Society', releaseDate: 1989, leadActor: 'Robin Wiliams', leadActress: 'none'}
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
    total: movies.length };
};

//console.log(this.deleteOne('Amelie'));

// exports.addOne = function(newTitle) {
//     return movies.push(newtitle);
// };

//console.log(this.getOne('Amelie'));