const {TwitterAPI} = require("./twitter-api");
const {SpotifyAPI} = require("./spotify-api");
const {ImdbAPI} = require('./imdb-api');
const inquirer = require("inquirer");
const chalk = require('chalk');
const fs = require("fs");

function printLiri () {
	var liriWord = chalk.blue('L');
	liriWord += chalk.red('I');
	liriWord += chalk.green('R');
	liriWord += chalk.red('I');
	return liriWord;
}

function ArgumentController () {
	var argv = process.argv;

	console.log("Hi! I'm", printLiri(), ". How can I help you?");
	var command = argv[2];
		if(!command) {
		inquirer.prompt([{
			type: 'list',
			message: 'Select one of these commands',
			choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
			name: 'command'
		}]).then(function(resp){
			callback(resp.command);
		});
	} else {
		callback(command);
	}

	function callback (command, value) {
		switch(command.toLowerCase()) {
			case "my-tweets":
				inquirer.prompt([
					{
						type: 'input',
						name: 'screen_name',
						message: 'Type user name',
						default: value
					},
					{
						type: 'input',
						name: 'limit',
						message: 'Type the limit of tweets. This is optional. By default you will get 20 tweets',
						default: value
					}
				]).then(function(res) {
					if(!res.screen_name.trim()) {
						console.log("User name cannot be empty");
						return;
					}

					console.log("\n\n------------------\nFetching...\n------------------\n");

					var tw = new TwitterAPI();
					tw.getTweets(res.screen_name, res.limit);
				});
				break;
			case "spotify-this-song":
				inquirer.prompt([
					{
						type: 'list',
						message: 'Choose the type',
						name: "type",
						choices: ['album', 'track', 'artist'],
						default: value
					},
					{
						type: 'input',
						message: value ? "You can change the default search. This is optional. By default will be searched" : 'What you want to search?',
						name: 'query',
						default: value
					}
				]).then(function(res){
					console.log("\n\n------------------\nFetching...\n------------------\n");
					var sp = new SpotifyAPI();
					sp.search(res.type, res.query);
				});
				break;
			case "movie-this":
				inquirer.prompt([{
					type: "input",
					message: "Type movie name",
					name: "movie",
					default: value
				}]).then(function(res){
					console.log("\n\n------------------\nFetching...\n------------------\n");
					var imdb = new ImdbAPI();
					imdb.search(res.movie);
				})
				break;
			case "do-what-it-says":
				console.log("Reading random.txt to get command...");
				fs.readFile("./random.txt", "utf8", function(err, data){
					if(err) {
						return console.log(err);
					}

					data = data.split(",");
					var command = data[0]
					var value = data[1].replace(/"/gi, "");
					console.log("Command from random.txt is:", command, '"' + value + '"');
					console.log("Calling command", command);
					callback(command, value);
				});
				break;
		}
	}
}


module.exports = {
	ArgumentController
}