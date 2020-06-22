var fs = require("fs");
var crypto = require('crypto');
var dirR = require("./dirR");
// md5工具
module.exports={
    dirMd5:function (filepath) {
        var allMd5 = "";
        dirR.dirR(filepath, (type, filepath2)=>{
            if (type === "file") {
                allMd5 += fileMd5(filepath2);
            }
            return true;
        });
        var h = crypto.createHash('md5');
        h.update(allMd5);
        return h.digest('hex');
    },
    // 计算文件md5
    fileMd5: function(filepath) {
        // console.log("fileMd5", filepath);
        var filedata=fs.readFileSync(filepath); 
        var h = crypto.createHash('md5');
        h.update(filedata);
        return h.digest('hex');
    }
};