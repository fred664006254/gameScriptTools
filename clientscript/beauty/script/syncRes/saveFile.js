
var fs = require("fs");
// 保存文件
module.exports={
    saveMd5:function (info) {
        fs.writeFile(info.trunkPath + "/resMd5.json",JSON.stringify(info.md5Map, null, 4),null,function(err){
            if( err != void 0 ){
                console.log("save error");
            }else{
                console.log("save success");
            }
        })
    },
    saveDefault:function (resourcePath, defaultObj) {
        fs.writeFile(resourcePath + "/default.res.json",JSON.stringify(defaultObj, null, 4),null,function(err){
            if( err != void 0 ){
                console.log("save error", err);
            }else{
                console.log("save success");
            }
        })
    }
}