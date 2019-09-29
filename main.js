var dotenv = require("dotenv");
dotenv.config();

var Discord = new require("discord.js");
var client = new Discord.Client();

var bot_version = "1.0.0";

var commandIgniter = ":";
module.exports.commandIgniter = commandIgniter;

var BOT_KEY = process.env.BOT_KEY;

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

function runCommand(args, ev) {
	var isCoolingdown = false;
	var cmd = args.split(" ");
	var command = cmd[0];
	var isCommandValid = false;
	for (var i = 0 ; i < commandList.length; i++) {
		var commandObject = commandList[i];
		if (commandObject.cmd == command) {
			if (!isCollingdown) {
				commandObject.fn(cmd.slice(1), ev);
				isCommandValid = true;
				isCoolingdown = true;
				setTimeout(function(){
					isCommandValid = false;
				},1000 * 3);
			} else ev.channel.send("Menunggu cooldown setelah menjalankan perintah");
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