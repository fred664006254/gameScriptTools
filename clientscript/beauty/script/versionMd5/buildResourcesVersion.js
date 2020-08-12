/**
 * Created by Administrator on 2016/8/9.
 */
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
 
var arguments = process.argv.splice(2);
var filename = arguments[0];
var filepath = path.dirname(filename);
var data = require(filename);
for(var key in data) {
    if (data.hasOwnProperty(key)) {
        for (var i = 0; i < data[key].length; i++) {
            var url = data[key][i].url;
            if (url) {
                var file2 = url.split("?")[0];
                if (fs.existsSync(filepath + "/" + file2)) {
                    var filedata=fs.readFileSync(filepath + "/" + file2); 
                    var h = crypto.createHash('md5');
                    h.update(filedata);
                    var retmd5 = h.digest('hex');
                    data[key][i].url = file2 + "?" + retmd5;                    
                }
            }
        }
    }
}

function writeFile(saveName,content) {// saveName 写入文件名字 content 保存的内容
    fs.writeFile(saveName,content,null,function(err){
        if( err != void 0 ){
            console.log("save RESOURCESVERSION error");
        }else{
            console.log("save RESOURCESVERSION success");
        }
    })
}

writeFile(filename, JSON.stringify(data));