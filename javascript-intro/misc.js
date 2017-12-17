function printMovies(m) {
    m.forEach(function(x) {
		var result = "You have ";
        if (x.hasWatched) {  
            result += "watched ";
        }
        else {
			result += "not watched "
        }
		result += "\"" + x.title + "\" - " + x.rating + " stars";
		console.log(result);
    });
};

var movies = [
    { title: "Pursuit Of Happiness",
      rating: 5,
      hasWatched: true
    },
    {
        title: "Shawshank Redemption",
        rating: 4.8,
        hasWatched: true
    },
    {
        title: "Dunkirk",
        rating: 4,
        hasWatched: false
    }
    ];
	
printMovies(movies);