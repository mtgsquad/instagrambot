const Insta = require('@androz2091/insta.js');
const commands = require('./commands.json');
const config = require('./config.json')
const client = new Insta.Client();

client.on('connected', () => {
    console.log(`Logged in as ${client.user.username}`);
});

client.on('messageCreate', (message) => {
    if (message.author.id === client.user.id) return;

    commands.forEach(command => {
        if(!command.command) return console.log("Nothing provided!")
        if(!command.response) return console.log("No response for this command!");

        if(message.content === command.command) {
            message.markSeen()
            message.chat.sendMessage(command.response);
        }
    })
});

client.login(config.username, config.password);