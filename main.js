var Discord = new require("discord.js");
var client = new Discord.Client();

var bot_version = "1.0.0";

var commandIgniter = ":";
module.exports.commandIgniter = commandIgniter;

var BOT_KEY = process.env.BOT_KEY ? process.env.BOT_KEY : "NjI0MDU3MDc3OTAzMzkyNzY4.XYZLdw.Qih7o7HgbHwhCxxVgv1s0gjEeGY";

function rollDice() {
	return Math.round(Math.random() * 6);
}

function mentionMember(member) {
	return "<@" + member.id + ">";
}

module.exports.mentionMember = mentionMember;

var commandList = [];

// struktur data perintah [command, info, fn]
module.exports.addCommand = function(command, info, fn) {
	commandList.push({cmd:command,info:info,fn:fn});
}

module.exports.getCommandList = function() {
	return commandList;
}

function runCommand(command, ev) {
	var isCommandValid = false;
	for (var i = 0 ; i < commandList.length; i++) {
		var commandObject = commandList[i];
		if (commandObject.cmd == command) {
			commandObject.fn(ev);
			isCommandValid = true;
		}
	}

	if (!isCommandValid) ev.channel.send(mentionMember(ev.author) + ", perintah \`" + command + "\` tidak diketahui");
}

// jalankan file command.js
require("./command");


client.on("ready", function() {
	console.log("Bot Discord Dijalankan");
});

client.on("message", function(msg) {
	var message = msg.content.trim();
	if (message.length > 1 && message[0] == commandIgniter) runCommand(message.slice(1), msg);
});

client.login(BOT_KEY).then(function() {
	
	client.user.setPresence({game:{name:commandIgniter + "help | v" + bot_version}, status:"online"});

});