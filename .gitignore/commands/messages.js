// Now, lets let the user fetch their level & messages
const EasySqlite = require('easysqlite'); // Require the Package
const db = new EasySqlite(); // Make a new Constructor with options
//const db = require('quick.db'); // We need to require quick.db in every file it's used in.

exports.run = (bot, message, args, func) => {

    db.fetchObject(message.author.id + message.guild.id).then(i => { // This is the object of messages sent
        db.fetchObject(`userLevel_${message.author.id + message.guild.id}`).then(o => { // This is the object of their level
            message.channel.send('Messages envoyés: `' + (i.value + 1) + '`\nNiveau: `' + o.value + '`'); // This returns their messages and level, the reason we used +1 for the messages is because
            // when someone calls this command, it also adds 1 earlier at the same, but since this is fetching the previous value, we need to add 1 to the answer, even thought it will be updated
            // seconds after this.
        })
    })

}