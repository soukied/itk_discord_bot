function dec2bin(num) {
	var binary = "";
	var d = Number(num);
	var isNegative = d < 0;
	d = Math.abs(d);
	while(true) {
		binary = Math.floor(d % 2) + "" + binary;
		if (d < 2)
			break;
		d /= 2;
	}
	return isNegative ? "-" + binary : binary;
}
module.exports.dec2bin = dec2bin;

function dec2oct(num) {
	var octal = "";
	var d = Number(num);
	var isNegative = d < 0;
	d = Math.abs(d);
	while(true) {
		octal = Math.floor(d % 8) + "" + octal;
		if (d < 8)
			break;
		d /= 8;
	}
	return isNegative ? "-" + octal : octal;
}
module.exports.dec2oct = dec2oct;

// fungsi dex2hex
function dec2hex(num) {
	var hexa = "";
	var d = Math.abs(Number(num));
	var isNegative = d < 0;
	d = Math.abs(d);
	while(true) {
		var hexaVal = Math.floor(d % 16);
		var val;
		switch(hexaVal) {
			case 10:
			val = "A";
			break;

			case 11:
			val = "B";
			break;

			case 12:
			val = "C";
			break;

			case 13:
			val = "D";
			break;

			case 14:
			val = "E";
			break;

			case 15:
			val = "F";
			break;

			default:
			val = hexaVal;
		}
		hexa = val +""+ hexa;
		if (d < 16)
			break;
		d /= 16;
	}
	return isNegative ? "-" + hexa : hexa;
}
module.exports.dec2hex = dec2hex;

// fungsi hex2dec
/**
 * 
 * @param {String} num 
 */
function hex2dec(num) {
	var val = 0;
	var isString = typeof num == "string";
	var hexaRegex = /[0-9A-Fa-f]+/g;
	if (isString && hexaRegex.exec(num)[0] == num) {
		num = num.trim().toUpperCase();
		for (var i = 0; i < num.length; i++) {
			var char = num[(num.length - 1) - i];
			var digit = 0;
			switch(char) {
				case "A":
				digit = 10;
				break;

				case "B":
				digit = 11;
				break;

				case "C":
				digit = 12;
				break;

				case "D":
				digit = 13;
				break;

				case "E":
				digit = 14;
				break;

				case "F":
				digit = 15;
				break;
			
				default:
				digit = char * 1;
			}
			val += Math.pow(16, i) * digit;
		}
		return val;
	} else return null;
}
module.exports.hex2dec = hex2dec;

function oct2dec(num) {
	num = num + "";
	var regex = /[0-7]+/g;
	var isString = typeof num == "string";
	var val = 0;
	if (isString && regex.exec(num)[0] == num) {
		for (var i = 0; i < num.length; i++) {
			var digit = 1 * num[(num.length - 1) - i];
			val += Math.pow(8, i) * digit;
		}
		return val;
	} else return null;
}
module.exports.oct2dec = oct2dec;

/**
 * @param {String} num 
 */
function bin2dec(num) {
	var isNegative = Number(num) < 0;
	num = Math.abs(num) + "";
	var isNumber = typeof num == "number";
	var isBinary = ("" + num).match(/([0-1])+/)[0] == (""+num);
	if (!isNumber && !isBinary) return null;
	var val = 0;
	for (var i = 0; i < num.length; i++) {
		val += Math.pow(2, i) * num[(num.length-1)-i];
	}
	return isNegative ? val * -1 : val;
}
module.exports.bin2dec = bin2dec;