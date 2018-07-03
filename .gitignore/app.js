// Now, let's use discord.js
const Discord = require('discord.js');
const bot = new Discord.Client();
const EasySqlite = require('easysqlite'); // Require the Package
const db = new EasySqlite(); // Make a new Constructor with options
//const db = require('quick.db');

// We can call the file with all the functions here.
const func = require('./functions.js'); // If this returns an error for you (or you might be on ubuntu/linux), try '../functions.js'
// You can also change the name of func to somethings else like tools.

// Bot settings - Global settings this file can use.
const prefix = '*'; // This is the prefix, you can change it to whatever you want.

// Listener Event: Runs whenever a message is received.
bot.on('message', message => {

	// Variables make it easy to call things, since it require less typing.
	let msg = message.content.toUpperCase(); // this variable takes the message, and turns it all into uppercase so it isn't case sensitive.
	let sender = message.author; // This variable takes the message, and finds who the author is.
	let args = message.content.slice(prefix.length).trim().split(" "); // This variable slices of the prefix, then puts the rest in an array based off the spaces 
	let cmd = args.shift().toLowerCase(); // this takes away the first object in the cant array, then puts it un this.

	// Message Leveling System - Make sure you require quick.db
    db.updateValue(message.author.id + message.guild.id, 1).then(i => {
        // It also returns the new updated object, which is what we will use.

        let messages; // Create an empty variable - These IF statements will run if the new amount of messages sent is the same as the number.
        if (i.value == 25) messages = 25; // Level 1
        else if (i.value == 50) messages = 50; // Level 2
        else if (i.value == 75) messages = 75; // Level 3 - You can set these to any number, and any amount of them.
        else if (i.value == 100) messages = 100; // Level 4
        else if (i.value == 200) messages = 200; // Level 5
        else if (i.value == 300) messages = 300; // Level 6
        else if (i.value == 400) messages = 400; // Level 7
        else if (i.value == 500) messages = 500; // Level 8
        else if (i.value == 600) messages = 600; // Level 9
        else if (i.value == 800) messages = 800; // Level 10
        else if (i.value == 1000) messages = 1000; // Level 11

        if (!isNaN(messages)) { // If messages IS STILL empty, run this.
            db.updateValue(`userLevel_${message.author.id + message.guild.id}`, 1).then(o => { // This returns the updated object of userLevel_ID. 
                message.channel.send(`Tu as envoyés ${messages} messages, Ggay @${message.author.username} tu gagnes un niveau, tu as le droit a 1 cookie! Tu es maintenant niveau ${o.value}`) // Send their updated level to the channel.
            })
        }

    })

	// We also need to make sure it doesn't respond to bots
	if (sender.bot) return;
	if (!message.content.startsWith(prefix)) return; // We also want to make it so that if the message does not start with prefix, return.

	// Command Handler - .trim() removes the blank spaces on both sides of the string
	try {
		let commandFile = require(`./commands/${cmd}.js`); // This will assign that filename to commandFile
		commandFile.run(bot, message, args, func); // This will add the functions, from the functions.js file into each commandFile.
	} catch(e) { // If an error occurs, this will run
		console.log(e.message); // This log the error message
	} finally {
		console.log(`${message.author.username} ran the command: ${cmd}`);
	}

});

// Listener Event: Runs Whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {
	// We can post into console that the bot launched
	console.log('Bot started.')
	bot.user.setActivity(`produire que des Cookies`);
	// Set the bot's online/idle/dnd/invisible status
	//bot.user.setStatus("dnd");
});

// Ignore this, it only hides my login token. Example: bot.login('<token>');
bot.login('NDYwOTAxMTYwNTM1MTk1NjY4.DhLhtQ.6AdMMQtguKyez2qdRKi9bhPVe5U'); //Your token can be found un the last episode.