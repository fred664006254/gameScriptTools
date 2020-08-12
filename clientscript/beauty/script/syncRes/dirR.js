var fs = require("fs");
var path = require("path");
var shell = require("./shell");

// 文件遍历工具
module.exports={
    dirR:function (dirPath, cb) {
        this._dirR(dirPath, "", cb);
    },
    _dirR:function(basePath, dirPath, cb) {
        var files = fs.readdirSync(basePath + dirPath);
        files.sort();
        for (var i = 0; i < files.length; i++) {
            if (files[i].indexOf(".DS_Store") !== -1) {
                continue;
            }
            var fileOrDirPath = dirPath + "/" + files[i];
            var stats = fs.statSync(basePath + fileOrDirPath);
            if (stats.isFile()) {
                cb("file", fileOrDirPath);
            } else if (stats.isDirectory()) {
                if (cb("dir", fileOrDirPath)) {
                    this._dirR(basePath, fileOrDirPath, cb);
                }
            }
        }
    },
    /**让目录存在，文件不存在 */ 
    hasDirNoFile:function (filePath) {
        var pathName = path.dirname(filePath);
        if (!fs.existsSync(pathName) || !fs.statSync(pathName).isDirectory()) {
            shell.shell("mkdir -p " + pathName);
        }
        if (fs.existsSync(filePath)) {
            shell.shell("rm -f " + filePath);
        }
    },
    /**让目录存在并且清空 */ 
    cleanAndExistsDir:function (dirPath) {
        if (fs.existsSync(dirPath)) {
            shell.shell("rm -rf " + dirPath + "/*");
        } else {
            shell.shell("mkdir -p " + dirPath);
        }
    }
};