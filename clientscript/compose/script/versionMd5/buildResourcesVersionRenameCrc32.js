/**
 * Created by Administrator on 2016/8/9.
 */
var fs = require('fs');
var path = require('path');
var crc32 = require('crc-32');

var arguments = process.argv.splice(2);
var filename = arguments[0];
var filepath = path.dirname(filename);
var data = require(filename);
for(var key in data) {
    if (data.hasOwnProperty(key)) {
        for (var i = 0; i < data[key].length; i++) {
            var url = data[key][i].url;
            if (url) {
                var file2 = url;
                if (file2.indexOf(".json") !== -1 || file2.indexOf(".fnt") !== -1) {
                    // console.log(file2)
                    var jsonObj = JSON.parse(fs.readFileSync(filepath + "/" + file2, "utf-8"));
                    if (jsonObj.file && jsonObj.frames) {
                        var imageFile2 = file2.substr(0, file2.lastIndexOf("/")+1) + jsonObj.file;
                        // console.log(imageFile2);
                        var filedata=fs.readFileSync(filepath + "/" + imageFile2); 
                        var truecrc32 = crc32.buf(filedata);
                        var retcrc32 = (truecrc32 + (truecrc32<0?0x100000000:0)).toString(16);
                        var toImageName = imageFile2.substr(0, imageFile2.lastIndexOf(".")) + "_" + retcrc32 + imageFile2.substr(imageFile2.lastIndexOf("."));                    
                        fs.renameSync(filepath + "/" + imageFile2, filepath + "/" + toImageName);
                        jsonObj.file = toImageName.substr(toImageName.lastIndexOf("/")+1);
                        // console.log(jsonObj.file);
                        // console.log(writeFile(filepath + "/" + file2, JSON.stringify(jsonObj)));
                        writeFile(filepath + "/" + file2, JSON.stringify(jsonObj));
                    }
                }
                var filedata=fs.readFileSync(filepath + "/" + file2); 
                var truecrc32 = crc32.buf(filedata);
                var retcrc32 = (truecrc32 + (truecrc32<0?0x100000000:0)).toString(16);
                data[key][i].url = file2.substr(0, file2.lastIndexOf(".")) + "_" + retcrc32 + file2.substr(file2.lastIndexOf("."));                    
                fs.renameSync(filepath + "/" + file2, filepath + "/" + data[key][i].url);
            }
        }
    }
}

function writeFile(saveName,content) {// saveName 写入文件名字 content 保存的内容
    return fs.writeFileSync(saveName,content);
}

writeFile(filename, JSON.stringify(data));
console.log("save RESOURCESVERSION rename success");