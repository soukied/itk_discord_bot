var Discord = require("discord.js");
var main = require("./main");
var addCommand = main.addCommand;
var getCommandList = main.getCommandList;
var mentionMember = main.mentionMember;

// tambah perintah help
addCommand(
	"help",
	"Menampilkan perintah yang tersedia",
	function(ev) {
		var output = mentionMember(ev.author);
		output += "\n> **Berikut adalah daftar perintah yang tersedia:**";
		for (var i = 0; i < getCommandList().length; i++) {
			var command = getCommandList()[i];
			output += "\n> \`" + main.commandIgniter + command.cmd + "\` *" + command.info + "*";
		}
		ev.channel.send(output);		
	}
);

addCommand(
	"credits",
	"Menampilkan author dari bot",
	function(ev) {

		var msg = new Discord.RichEmbed()
		.setColor("#0099ff")
		.setTitle("Credits")
		.setDescription("Bot Discord ITK diprogram oleh Adhya Adam Sulthan [11191003] menggunakan Javascript, Node.js, dan discord.js")
		.addBlankField()
		.addField("Discord", "soukied#2969", true)
		.addField("Steam", "admajor",true)
		.addField("GitHub", "soukied", true)
		.addField("Instagram", "@shtty_head", true)

		ev.channel.send(msg);

	}
);

addCommand(
	"dadu",
	"Memainkan dadu secara virtual",
	function(ev) {
		var nilaiDadu = Math.round(Math.random() * 6);
		ev.channel.send(mentionMember(ev.author) + ", dadumu bernilai " + nilaiDadu);
	}
);

