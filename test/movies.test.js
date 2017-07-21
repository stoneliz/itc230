var expect = require("chai").expect;
var movie = require("../lib/movies");

describe("Movie module", function(){
    it("Returns requested movie?", function(){
        var found = movie.getOne("Amelie");
        expect(found).to.deep.equal(
            {title: "Amelie",
            releaseDate: 2001,
            leadActor: "Mathieu Kassovitz",
            leadActress: "Audrey Tautou"
            });
    });
    
    it("Returns undefined for an invalid movie?", function(){
        var found = movie.getOne("Fake");
        expect(found).to.be.undefined;
    });
    
    it("Valid Movie was deleted?", function(){
        var result = movie.deleteOne("Amelie");
        expect(result.deleted).to.be.true;
        //console.log(result)
    });
    
    it("Invalid Movie was not deleted?", function(){
        var result = movie.deleteOne("Fake");
        expect(result.deleted).to.be.false;
        //console.log(result)
    });
    
    it("New Movie was added?", function(){
       var result = movie.addOne({title: "Dune",
            releaseDate: 1984,
            leadActor: "Kyle MacLachlan",
            leadActress: "Virginia Madsen"
            });
        expect(result.added).to.be.true;
       // console.log(result);
            }); 
            
     it("Movie already in array was not added?", function(){
       var result = movie.addOne({title: "Dead Poets Society", 
               releaseDate: 1989, 
               leadActor: "Robin Wiliams", 
               leadActress: "none"
            });
        expect(result.added).to.be.false;
        //console.log(result);
            }); 
});