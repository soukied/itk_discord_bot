var nhentai = require("nhentai-js");
var lastCode;

nhentai.exists("349820")
	.then(function(isExists){
		if (isExists) console.log("Ada cuy");
		else console.log("Ngak ada cuy");
	});
