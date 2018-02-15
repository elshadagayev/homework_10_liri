const keys = require("../keys");

const Twitter = require("twitter");


function TwitterAPI () {
	var client = new Twitter({
	  consumer_key: keys.twitter.consumer_key,
	  consumer_secret: keys.twitter.consumer_secret,
	  access_token_key: keys.twitter.access_token_key,
	  access_token_secret: keys.twitter.access_token_secret
	});

	this.getTweets = function(screen_name, count) {
		count = isNaN(count) ? 20 : count;
		var params = {
			count,
			screen_name
		}

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	var n = 1;
		  	for(var i in tweets) {
		    	var tweet = tweets[i];
		    	console.log(n++ + ". ", "[", tweet.created_at, "]", tweet.user.name, " - ", tweet.text);
		    }
		  }
		});
	}
}

module.exports = {
	TwitterAPI
}