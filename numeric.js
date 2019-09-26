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