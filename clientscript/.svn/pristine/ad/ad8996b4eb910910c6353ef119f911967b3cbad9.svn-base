
var fs = require("fs");
// 文件类型检测
module.exports={
	ispng:function (path) {
		var typestr = ".png";
		return path.substr(path.length - typestr.length) === typestr;
	},
	isjpg:function (path) {
		var typestr = ".jpg";
		return path.substr(path.length - typestr.length) === typestr;
	},
	isttf:function (path) {
		var typestr = ".ttf";
		return path.substr(path.length - typestr.length) === typestr;
	},	
	ismp3:function (path) {
		var typestr = ".mp3";
		return path.substr(path.length - typestr.length) === typestr;
	},
	isfnt:function (path) {
		var typestr = ".fnt";
		return path.substr(path.length - typestr.length) === typestr;
	},
	isdbbin:function (path) {
		var typestr = ".dbbin";
		return path.substr(path.length - typestr.length) === typestr;
	},
	isPngOfFntOrJson:function (path) {
		var fntPath = path.substring(0, path.lastIndexOf(".")) + ".fnt";
		var jsonPath = path.substring(0, path.lastIndexOf(".")) + ".json";
		return fs.existsSync(fntPath) || fs.existsSync(jsonPath);
	},
	isJsonSheet:function (path) {
		var typestr = ".json";
		if (path.substr(path.length - typestr.length) === typestr) {
			var contentObj = require(path);
			if (contentObj.file && contentObj.frames) {
				return true;
			}
		}
		return false;
	},
	isJsonNotSheet:function (path) {
		var typestr = ".json";
		if (path.substr(path.length - typestr.length) === typestr) {
			var contentObj = require(path);
			if (!contentObj.file || !contentObj.frames) {
				return true;
			}
		}
		return false;
	}
}