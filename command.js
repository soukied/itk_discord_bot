var Discord = require("discord.js");
var nhentai = require("nhentai-js");
var main = require("./main");
var numeric = require("./numeric");
var addCommand = main.addCommand;
var getCommandList = main.getCommandList;
var mentionMember = main.mentionMember;

var lastNukeCode = 0;

// mendapatkan kode nuklir terakhir
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
		var output = "";
		output += "> **Berikut adalah daftar perintah yang tersedia:**";
		for (var i = 0; i < getCommandList().length; i++) {
			var command = getCommandList()[i];
			output += "\n> \`" + main.commandIgniter + command.cmd + "\` *" + command.info + "*";
		}
		ev.channel.send(output);
	}
);

// command credits
addCommand(
	"about",
	"Menampilkan author dari bot",
	function (args, ev) {

		var msg = new Discord.RichEmbed()
			.setColor("#0099ff")
			.setTitle("Credits")
			.setDescription("Bot Discord ITK diprogram oleh Adhya Adam Sulthan [11191003] menggunakan Javascript, Node.js, dan discord.js")
			.addField("Discord", "soukied#3969", true)
			.addField("Steam", "[soukied](https://steamcommunity.com/id/admajor/)", true)
			.addField("GitHub", "[soukied](https://github.com/soukied)", true)
			.addField("Instagram", "[@shtty_head](https://www.instagram.com/shtty_head/)", true)

		ev.channel.send(msg);

	}
);

// command dadu
addCommand(
	"dadu",
	"Memainkan dadu secara virtual",
	function (args, ev) {
		var nilaiDadu = 1 + Math.round(Math.random() * 5);
		ev.channel.send(ev.author.username + ", dadumu bernilai " + nilaiDadu);
	}
);

// command info
addCommand(
	"info",
	"Menampilkan informasi dari user",
	function (args, ev) {
		var member = ev.author;
		ev.channel.send(member.username + "'s ID is `" + member.id + "`");
	}
);

// // fungsi mencari index string
function getCharCode(string, char) {
	var charCode = 0;
	for (var i = string.length-1 ; i >= 0; i--)
		if (char == string.toLowerCase()[i]) charCode = i;
	return charCode;
}

// command ratewaifu
addCommand(
	"ratewaifu",
	"Memberi rating sesuai nama waifu yang diberikan",
	function(args, ev) {
		if (args.length < 1) {
			ev.channel.send(ev.author.username + ", kamu belum memasukkan nama waifumu!");
			return;
		}

		var rateSystem = 0;
		var fullName = "";
		for (var i = 0 ; i < args.length; i++) {
			var name = args[i].toLowerCase();
			fullName += name.toUpperCase() + " "; 
			for (var j = 0; j < name.length; j++) {
				var char = name[j];
				rateSystem += getCharCode("abcdefghijklmnopqrstuvwxyz", char);
			}
		}
		ev.channel.send("Nilai rating untuk **" + fullName.trim() + "** adalah `" + (rateSystem % 11) + "/10`");
	}
);

// command gachanuke
addCommand(
	"gachanuke",
	"GACHA KODE NUKLIR?!! **NSFW**",
	function(args, ev) {

		// apakah channel nsfw
		var isNSFW = ev.channel.nsfw;
		
		if (isNSFW) {
			var nuclearCode = 1 + Math.round(Math.random() * (lastNukeCode - 1));
			ev.channel.send("> Kode yang kamu dapatkan adalah `" + nuclearCode + "`\n> URL : https://nhentai.net/g/" + nuclearCode);
		} else ev.channel.send("Channel `#" + ev.channel.name + "` tidak mengizinkan konten NSFW");
	}
);

// command checknuke
addCommand(
	"checknuke",
	"Mengecek status validitas kode nuklir **NSFW**",
	function (args, ev) {
		
		// apakah channel NSFW
		var isNSFW = ev.channel.nsfw;

		if (args.length < 1) {
			ev.channel.send("Tidak ada kode nuklir yang dicek");
			return;
		}

		if (isNSFW) {
			for (var i = 0; i < args.length; i++) {
				var nuclearCode = args[i];
				nhentai.exists(nuclearCode).then(function (isExist) {
					if (isExist) ev.channel.send("> Kode `" + nuclearCode + "` tersedia. :white_check_mark:\n> URL : https://nhentai.net/g/" + nuclearCode);
					else ev.channel.send("> " + mentionMember(ev.author) + ", kode `" + nuclearCode + "` tidak tersedia. :negative_squared_cross_mark:");	
				});
			}
		} else ev.channel.send("Channel `#" + ev.channel.name + "` tidak mengizinkan konten NSFW");
});
	


// command dec2bin
addCommand(
	"dec2bin",
	"Mengkonversi bilangan desimal ke bilangan biner",
	function (args, ev) {
		if (args.length < 1) {
			ev.channel.send(ev.author.username + ", kamu belum memasukkan nilai yang ingin dikonversi!");
			return;
		}

		var output = "";
		
		for (var i = 0; i < args.length; i++) {
			var num = args[i] * 1;
			if (num != NaN) output += "Hasil konversi ke biner dari `" + num + "` adalah `" + numeric.dec2bin(num) + "`\n";
			else output += "Hasil konversi ke biner dari `" + num + "` tidak terdefinisi\n";
		}
		ev.channel.send(output.trim());
	});
	
// command bin2dec
addCommand(
	"bin2dec",
	"Mengkonversi bilangan biner ke bilangan desimal",
	function (args, ev) {
		if (args.length < 1) {
			ev.channel.send(ev.author.username + ", kamu belum memasukkan nilai yang ingin dikonversi!");
			return;
		}
		
		var output = "";
		
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
			ev.channel.send(ev.author.username + ", kamu belum memasukkan nilai yang ingin dikonversi!");
			return;
		}
		
		var output = "";
		
		for (var i = 0; i < args.length; i++) {
			var num = args[i] * 1;
			if (num != NaN) output += "Hasil konversi ke heksadesimal dari `" + num + "` adalah `" + numeric.dec2hex(num) + "`\n";
			else output += "Hasil konversi ke heksadesimal dari `" + num + "` tidak terdefinisi\n";
		}
		ev.channel.send(output.trim());
	});
	
// command hex2dec
addCommand(
	"hex2dec",
	"Mengkonversi bilangan heksadesimal ke bilangan desimal",
	function(args, ev){
		if (args.length < 1) {
			ev.channel.send(ev.author.username + ", kamu belum memasukkan nilai yang ingin dikonversi!");
			return;
		}
	
		var output = "";

		for (var i = 0; i < args.length; i++) {
			var num = args[i];
			var val = numeric.hex2dec(num);
			if (val != null) output += "Hasil konversi ke biner dari `" + num + "` adalah `" + val + "`\n";
			else output += "Hasil konversi ke biner dari `" + num + "` tidak terdefinisi\n";
		}
		ev.channel.send(output.trim());
	}
);

// command dec2oct
addCommand(
	"dec2oct",
	"Mengkonversi bilangan desimal ke bilangan oktal",
	function(args, ev) {
		if (args.length < 1) {
			ev.channel.send(ev.author.username + ", kamu belum memasukkan nilai yang ingin dikonversi!");
			return;
		}

		var output  = "";

		for (var i = 0; i < args.length; i++) {
			var num = args[i] * 1;
			var val = numeric.dec2oct(num);
			if (num != NaN) output += "Hasil konversi ke oktal dari `" + num + "` adalah `" + val + "`\n";
			else output += "Hasil konversi ke oktal dari `" + num + "` tidak terdefinisi\n";
		}
		ev.channel.send(output.trim());
	}
);

// command oct2dec
addCommand(
	"oct2dec",
	"Mengkonversi bilangan oktal ke bilangan desimal",
	function(args, ev) {
		if (args.length < 1) {
			ev.channel.send(ev.author.username + ", kamu belum memasukkan nilai yang ingin dikonversi!");
			return;
		}

		var output = "";

		for (var i = 0; i < args.length; i++) {
			var num = args[i] + "";
			var val = numeric.oct2dec(num);
			if (val != null) output += "Hasil konversi ke desimal dari `" + num + "` adalah `" + val + "`\n";
			else output += "Hasil konversi ke desimal dari `" + num + "` tidak terdefinisi\n";
		}
		ev.channel.send(output.trim());
	}
);