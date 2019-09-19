var Discord = new require("discord.js");
var client = new Discord.Client();

client.on("ready", function() {
	console.log("Bot is ready");
});

client.on("message", function(msg) {
	if (msg.content == "ping") msg.channel.send("pong");
});

client.login("NjI0MDU3MDc3OTAzMzkyNzY4.XYN05A.KJWtg4vTy9DSdkxOa6pXAoicnUQ");
