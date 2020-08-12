/**
 * Created by Administrator on 2016/8/9.
 */
var fs = require('fs');
var path = require('path');
var crc32 = require('crc-32');
 
var arguments = process.argv.splice(2);
var filepath = arguments[0];
console.log("filepath", filepath);

var mainjsFile = require(filepath + "/manifest.json").game[0];
console.log("mainjsFile", mainjsFile);


var filedata=fs.readFileSync(filepath + "/resource/default.res.json"); 
var truecrc32 = crc32.buf(filedata);
var defaultcrc32 = (truecrc32 + (truecrc32<0?0x100000000:0)).toString(16);
console.log("defaultcrc32", defaultcrc32);
fs.renameSync(filepath + "/resource/default.res.json", filepath + "/resource/default_"+defaultcrc32+".res.json");

var mainFileData = fs.readFileSync(filepath + "/" + mainjsFile, "utf-8");
mainFileData = mainFileData.replace(/default.res.json/g, "default_"+defaultcrc32+".res.json");
fs.writeFileSync(filepath + "/" + mainjsFile, mainFileData);