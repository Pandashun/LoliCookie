module.exports = { // This basically works like every normal package you use.

	ping: function(channel) { // `ping` is the name of the function, then function() is where you can pass arguments.
        channel.send('Pong!');
    },

    cookie: function(channel) {
    	channel.send("Viens jouer avec moi!", {
			file: "./image/cookie.gif" // Or replace with FileOptions object
});
    }

}