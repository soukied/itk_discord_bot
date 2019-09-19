var Discord = new require("discord.js");
var client = new Discord.Client();

function runCommand(ev) {
	
}

client.on("ready", function() {
	console.log("Bot is ready");
});

client.on("message", function(msg) {
	var message = msg.content.trim();
	if (message.length > 1 && message[0] == ".") runCommand({command:message.slice(1),event:msg});
});

client.login("BOT_TOKEN");
