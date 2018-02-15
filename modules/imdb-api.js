const request = require("request");
const chalk = require("chalk");

function ImdbAPI () {
	this.search = function (query) {
		request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var movie = JSON.parse(body);
				console.log(chalk.bold("Movie title:"), movie.Title);
				console.log(chalk.bold("Year:"), movie.Year);
				console.log(chalk.bold("Rating:"), movie.imdbRating);
				if(movie.Ratings[1])
					console.log(chalk.bold("Rotten Tomatoes Rating:"), movie.Ratings[1].Value);
				console.log(chalk.bold("Country:"), movie.Country);
				console.log(chalk.bold("Language:"), movie.Language);
				console.log(chalk.bold("Plot of the movie:"), movie.Plot);
				console.log(chalk.bold("Actors:"), movie.Actors);
			}
		});
	}
}

module.exports = {
	ImdbAPI
}