var fortuneCookies = [
    "You will have a happy adventure soon.",
    "You will have a pleasant surprise.",
    "Conquer your fears or they will conquer you.",
    "Do not fear what you do not know.",
    "Do unto others as you would have them do unto you.",
    ];
    
exports.getFortune = function() {
    var idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies [idx];
};