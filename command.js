var Discord = require("discord.js");
var nhentai = require("nhentai-js");
var main = require("./main");
var numeric = require("./numeric");
var addCommand = main.addCommand;
var getCommandList = main.getCommandList;
var mentionMember = main.mentionMember;

var lastNukeCode = 0;

function getLastBookID() {
	nhentai.getHomepage(1).then(function(ev){
		lastNukeCode = ev.results[0].bookId;
	});
}

setInterval(getLastBookID, 1000 * 60);
getLastBookID();

// command help
addCommand(
	"help",
	"Menampilkan perintah yang tersedia",
	function (args, ev) {
		var output = "> " + mentionMember(ev.author);
		output += "\n> **Berikut adalah daftar perintah yang tersedia:**";
		for (var i = 0; i < getCommandList().length; i++) {
			var command = getCommandList()[i];
			output += "\n> \`" + main.commandIgniter + command.cmd + "\` *" + command.info + "*";
		}
		ev.channel.send(output);
	}
);

// command credits
addCommand(
	"credits",
	"Menampilkan author dari bot",
	function (args, ev) {

		var msg = new Discord.RichEmbed()
			.setColor("#0099ff")
			.setTitle("Credits")
			.setDescription("Bot Discord ITK diprogram oleh Adhya Adam Sulthan [11191003] menggunakan Javascript, Node.js, dan discord.js")
			.addBlankField()
			.addField("Discord", "soukied#3969", true)
			.addField("Steam", "admajor", true)
			.addField("GitHub", "soukied", true)
			.addField("Instagram", "@shtty_head", true)

		ev.channel.send(msg);

	}
);

// command dadu
addCommand(
	"dadu",
	"Memainkan dadu secara virtual",
	function (args, ev) {
		var nilaiDadu = 1 + Math.round(Math.random() * 5);
		ev.channel.send(mentionMember(ev.author) + ", dadumu bernilai " + nilaiDadu);
	}
);

// command info
addCommand(
	"info",
	"Menampilkan informasi dari user",
	function (args, ev) {
		var member = ev.author;
		ev.channel.send(mentionMember(member) + " ID : " + member.id);
	}
);

// gachanuke
addCommand(
	"gachanuke",
	"GACHA KODE NUKLIR?!!",
	function(args, ev) {
		var nuclearCode = Math.round(Math.random() * lastNukeCode);
		ev.channel.send("> " + mentionMember(ev.author) + "\n> Kode yang kamu dapatkan adalah `" + nuclearCode + "`\n> URL : https://nhentai.net/g/" + nuclearCode);
	}
);

// command checknuke
addCommand(
	"checknuke",
	"Mengecek status validitas kode nuklir",
	function (args, ev) {

		if (args.length < 1) {
			ev.channel.send(mentionMember(ev.author) + ", tidak ada kode nuklir yang dicek.");
			return;
		}

		for (var i = 0; i < args.length; i++) {
			var nuclearCode = args[i];
			nhentai.exists(nuclearCode).then(function (isExist) {
				if (isExist) ev.channel.send("> " + mentionMember(ev.author) + "\n> Kode `" + nuclearCode + "` tersedia. :white_check_mark:\n> URL : https://nhentai.net/g/" + nuclearCode);
				else ev.channel.send("> " + mentionMember(ev.author) + ", kode `" + nuclearCode + "` tidak tersedia. :negative_squared_cross_mark:");
			});
		}
	});

// command dec2hex
addCommand(
	"dec2bin",
	"Mengkonversi bilangan desimal ke bilangan biner",
	function (args, ev) {
		if (args.length < 1) {
			ev.channel.send(mentionMember(ev.author) + ", kamu belum memasukkan nilai yang ingin dikonversi!");
			return;
		}

		var output = mentionMember(ev.author) + "\n";

		for (var i = 0; i < args.length; i++) {
			var num = args[i] * 1;
			if (num != NaN) output += "Hasil konversi ke biner dari `" + num + "` adalah `" + numeric.dec2bin(num) + "`\n";
			else output += "Hasil konversi ke biner dari `" + num + "` tidak terdefinisi\n";
		}
		ev.channel.send(output.trim());
	}
);

// command bin2dec
addCommand(
	"bin2dec",
	"Mengkonversi bilangan biner ke bilangan desimal",
	function (args, ev) {
		if (args.length < 1) {
			ev.channel.send(mentionMember(ev.author) + ", kamu belum memasukkan nilai yang ingin dikonversi!");
			return;
		}

		var output = mentionMember(ev.author) + "\n";

		for (var i = 0; i < args.length; i++) {
			var num = args[i] * 1;
			var val = numeric.bin2dec(num);
			if (val != null) output += "Hasil konversi ke desimal dari `" + num + "` adalah `" + val + "`\n";
			else output += "Hasil konversi ke desimal dari `" + num + "` tidak terdefinisi\n";
		}
		ev.channel.send(output.trim());
	}
);

// command dec2hex
addCommand(
	"dec2hex",
	"Mengkonversi bilangan desimal ke bilangan heksadesimal",
	function (args, ev) {
		if (args.length < 1) {
			ev.channel.send(mentionMember(ev.author) + ", kamu belum memasukkan nilai yang ingin dikonversi!");
			return;
		}

		var output = mentionMember(ev.author) + "\n";

		for (var i = 0; i < args.length; i++) {
			var num = args[i] * 1;
			if (num != NaN) output += "Hasil konversi ke heksadesimal dari `" + num + "` adalah `" + numeric.dec2hex(num) + "`\n";
			else output += "Hasil konversi ke heksadesimal dari `" + num + "` tidak terdefinisi\n";
		}
		ev.channel.send(output.trim());
	}
);