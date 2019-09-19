var Discord = new require("discord.js");
var client = new Discord.Client();

var bot_key = "BOT_KEY";

function runCommand(ev) {
	
}

client.on("ready", function() {
	console.log("Bot is ready");
});

client.on("message", function(msg) {
	if (msg.content == "ping") msg.channel.send("pong");
});

client.login(bot_key);
