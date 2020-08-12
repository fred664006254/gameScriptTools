/**
 * Created by Administrator on 2016/8/9.
 */
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
 
var arguments = process.argv.splice(2);
// 项目路径
var projectPath = arguments[0];
// svn
var svn = arguments[1];
console.log("projectPath", projectPath);
console.log("svn", svn);

var mainjsFile = "stage1/main.min.js";
console.log("mainjsFile", mainjsFile);

var mainFileData = fs.readFileSync(projectPath + "/" + mainjsFile, "utf-8");
mainFileData = mainFileData.replace(/modifybywxgamescript_svnversion/g, svn);
fs.writeFileSync(projectPath + "/" + mainjsFile, mainFileData);