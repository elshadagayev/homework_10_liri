const keys = require("../keys");
const Spotify = require("node-spotify-api");
const chalk = require('chalk');

function SpotifyAPI () {
	var spotify = new Spotify({
	  id: keys.spotify.id,
	  secret: keys.spotify.secret
	});

	this.search = function (type, query) {
		type = type.toLowerCase();

		spotify.search({
			type,
			query
		}, function(err, data) {
			if(err) {
				console.log(err);
				return
			}

			type += 's';

			if(!data[type]) {
				console.log("Something is wrong");
				return false;
			}

			if(!data[type].items) {
				console.log("Something is wrong");
				return;
			}

			for(var i in data[type].items) {
				var item = data[type].items[i];
				
				switch(type) {
					case "tracks":
						var artists = [];
						for(var a in item.artists)
							if(item.artists[a])
								artists.push(item.artists[a].name);

						console.log(chalk.bold("Artists:"), artists.join(", "));
						console.log(chalk.bold("Song name:"), item.name);
						console.log(chalk.bold("Album name:"), item.album.name);
						console.log(chalk.bold("URL:"), item.preview_url);
						console.log("----------------------");
						break;
					case "albums":
						var artists = [];
						for(var a in item.artists)
							if(item.artists[a])
								artists.push(item.artists[a].name);

						console.log(chalk.bold("Album name:"), item.name);
						console.log(chalk.bold("Artists:"), artists.join(", "));
						console.log(chalk.bold("URL:"), item.external_urls.spotify);
						console.log("-----------------------");
						break;
					case "artists":
						console.log(chalk.bold("Artist name:"), item.name);
						console.log(chalk.bold("Popularity:"), item.popularity);
						console.log(chalk.bold("Genres:"), item.genres.join(", "));
						console.log(chalk.bold("URL:"), item.external_urls.spotify);
						console.log("-----------------------");
						break; 
				}
			}
		})
	}
}

module.exports = {
	SpotifyAPI
}