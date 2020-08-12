/**
 * Created by Administrator on 2016/8/9.
 */
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
 
var arguments = process.argv.splice(2);
// 项目路径
var projectPath = arguments[0];
// 版本信息的文件路径
var infoJsonPath = arguments[1];
// 是否增长appversion
var addAppVersion = arguments[2];
// tag
var tag = arguments[3];
// svn
var svn = arguments[4];

console.log("projectPath", projectPath);
console.log("addAppVersion", addAppVersion);
console.log("infoJsonPath", infoJsonPath);
console.log("tag", tag);
console.log("svn", svn);

var infoJson = require(infoJsonPath);
if (addAppVersion === "true") {
    infoJson.appversion ++;
    fs.writeFileSync(infoJsonPath, JSON.stringify(infoJson));
}

var loginviewversion = tag.substr(10) + "." + svn;
console.log("loginviewversion", loginviewversion);
console.log("projectPath", projectPath);
console.log("svn", svn);

var appversion = infoJson.appversion;
console.log("appversion", appversion);

var mainjsFile = "stage1/main.min.js";
console.log("mainjsFile", mainjsFile);

var mainFileData = fs.readFileSync(projectPath + "/" + mainjsFile, "utf-8");
mainFileData = mainFileData.replace(/modifybywxgamescript_svnversion/g, svn);
mainFileData = mainFileData.replace(/modifybyqqscript_loginviewversion/g, loginviewversion);
mainFileData = mainFileData.replace(/modifybyqqscript_appversion/g, appversion);
fs.writeFileSync(projectPath + "/" + mainjsFile, mainFileData);