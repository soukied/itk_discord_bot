var Discord = new require("discord.js");
var client = new Discord.Client();

function runCommand(ev) {
	
}

client.on("ready", function() {
	console.log("Bot is ready");
});

client.on("message", function(msg) {
	if (msg.content == "ping") msg.channel.send("pong");
});

client.login("NjI0MDU3MDc3OTAzMzkyNzY4.XYN4fQ.-ySrau2-Ii3OekARWn7fbWW2AKY");
