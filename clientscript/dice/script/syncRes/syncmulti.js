/**
 * 同步assets 和多语言assets 目录结构和文件位置
 */
var fs = require("fs")
var path1 = require("path")
var shell = require('child_process');

var arguments = process.argv.splice(2);

var root = path1.join(__dirname)
var fromroot = path1.join(__dirname + "/resources/assets")
var toroot = path1.join(__dirname + "/resources/assets_vi")
console.log(__dirname);
var resDic = {};
var toRes = {};
readDirSync(fromroot)
function readDirSync(path){
	var pa = fs.readdirSync(path);
	pa.forEach(function(ele,index){
		var info = fs.statSync(path+"/"+ele)
		if(info.isDirectory()){
			console.log("dir: "+ele)
			readDirSync(path+"/"+ele);
		}else{
			console.log(String(path).replace(fromroot,"") + "/" + ele)
			resDic[ele] = String(path).replace(fromroot, "");
			console.log("file: "+ele)
		}
	})
}
writeDirSync(toroot, 1);
function writeDirSync(path,one){
	var pa = fs.readdirSync(path);
	pa.forEach(function (ele, index) {
		var info = fs.statSync(path + "/" + ele)
		if (info.isDirectory()) {
			// console.log("dir: " + ele)
			writeDirSync(path + "/" + ele);
		} else {
			try {
				toRes[ele] = String(path).replace(toroot, "");
			} catch (error) {
				console.log(error);
			}

		}
	});
}

deleteall(toroot + "back");
fs.renameSync(toroot, toroot+"back");
mkdirsSync(toroot);
for(var key in toRes)
{
	// console.log(key,toRes[key]);
	if (resDic[key] && String(toRes[key]).indexOf("fnt")<0)
	{
		mkdirsSync(toroot + resDic[key]);
		// console.log("----mv " + toroot + "back" + toRes[key] + "/" + key + " " + toroot + resDic[key] + "/" + key);
		shell.execSync("mv " + toroot + "back" + toRes[key] + "/" + key + " " + toroot + resDic[key] + "/" + key);
	}
	else
	{
		mkdirsSync(toroot + toRes[key]);
		// console.log("----mv " + toroot + "back" + toRes[key] + "/" + key + " " + toroot + toRes[key] + "/" + key);
		shell.execSync("mv " + toroot + "back" + toRes[key] + "/" + key + " " + toroot + toRes[key] + "/" + key);
	}
}
deleteall(toroot + "back");


function deleteall(path) {
	var files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function (file, index) {
			var curPath = path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) { // recurse
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};



// 递归创建目录 同步方法
function mkdirsSync(dirname) {
	if (fs.existsSync(dirname)) {
		return true;
	} else {
		if (mkdirsSync(path1.dirname(dirname))) {
			fs.mkdirSync(dirname);
			return true;
		}
	}
}
