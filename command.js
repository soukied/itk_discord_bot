var main = require("./main");
var addCommand = main.addCommand;
var getCommandList = main.getCommandList;
var mentionMember = main.mentionMember;

// tambah perintah help
addCommand(
	"help",
	"Menampilkan perintah yang tersedia",
	function(ev) {
		ev.channel.send(mentionMember(ev.author));
		ev.channel.send("Berikut adalah daftar perintah yang tersedia:");
		
	}
);
