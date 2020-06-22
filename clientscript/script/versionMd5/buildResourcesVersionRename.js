/**
 * Created by Administrator on 2016/8/9.
 */
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
 
var arguments = process.argv.splice(2);
var filename = arguments[0];
var cversion = arguments[1];
var filepath = path.dirname(filename);
var data = require(filename);
for(var key in data) {
    if (data.hasOwnProperty(key)) {
        for (var i = 0; i < data[key].length; i++) {
            var url = data[key][i].url;
            if (url&&url.indexOf("other/")!=0) {
                var file2 = url;
                var dataVersion="";
                if(file2.indexOf("?")>-1)
                {
                    dataVersion=file2.substr(file2.indexOf("?"));
                    file2=file2.substr(0,file2.indexOf("?"));
                }

                var checkFile = fs.existsSync(filepath + "/" + file2);
                var fname = file2.substr(0, file2.lastIndexOf("."));
                var extname = file2.substr(file2.lastIndexOf("."));
                if (checkFile == false && fname.length > 32) {
                    console.log("找不到"+file2);
                    var t2 = fname.substr(fname.length - 32);
                    if (t2.indexOf("_") < 0 && fname.indexOf("_" + t2) > -1 && fs.existsSync(filepath + "/" + fname.substr(0, fname.length - 33)+extname)) {
                        fname = fname.substr(0, fname.length - 33);
                        file2 = fname + extname;
                        console.log("但是有对应的无版本号文件" + fname + extname +"，重新添加")
                    }
                }
                
                if (file2.indexOf(".json") !== -1 || file2.indexOf(".fnt") !== -1) {
                    var jsonObj = JSON.parse(fs.readFileSync(filepath + "/" + file2));
                    if (jsonObj.file && jsonObj.frames) {
                        var imageFile2 = file2.substr(0, file2.lastIndexOf("/")+1) + jsonObj.file;
                        // console.log(imageFile2);


                        var checkFile2 = fs.existsSync(filepath + "/" + imageFile2);
                        var fname2 = imageFile2.substr(0, imageFile2.lastIndexOf("."));
                        var extname2 = imageFile2.substr(imageFile2.lastIndexOf("."));
                        if (checkFile2 == false && fname2.length > 32) {
                            console.log("找不到" + imageFile2);
                            var tm2 = fname2.substr(fname2.length - 32);
                            if (tm2.indexOf("_") < 0 && fname2.indexOf("_" + tm2) > -1 && fs.existsSync(filepath + "/" + fname2.substr(0, fname2.length - 33) + extname2)) {
                                fname2 = fname2.substr(0, fname2.length - 33);
                                imageFile2 = fname2 + extname2;
                                console.log("但是有对应的无版本号文件" + fname2 + extname2 + "，重新添加")
                            }
                        }


                        var filedata=fs.readFileSync(filepath + "/" + imageFile2); 
                        var h = crypto.createHash('md5');
                        h.update(filedata);
                        var retmd5 = h.digest('hex');
                        
                        var toImageName = fname2 + "_" + retmd5 + extname2;
                        if (fname2.indexOf(retmd5)>-1)
                        {
                            toImageName = imageFile2;
                        }                   
                        fs.renameSync(filepath + "/" + imageFile2, filepath + "/" + toImageName);
                        jsonObj.file = toImageName.substr(toImageName.lastIndexOf("/")+1);
                        // console.log(jsonObj.file);
                        writeFile(filepath + "/" + file2, JSON.stringify(jsonObj));
                    }
                }
                var filedata=fs.readFileSync(filepath + "/" + file2); 
                var h = crypto.createHash('md5');
                h.update(filedata);
                var retmd5 = h.digest('hex');
                var versionStr="";
                if (cversion)
                {
                    versionStr = "?" + cversion;
                }
                else if(dataVersion)
                {
                    versionStr=dataVersion;
                }
                var josnurl = fname + "_" + retmd5 + extname;

                if (fname.indexOf(retmd5)>-1)
                {
                    josnurl = file2;
                }
                data[key][i].url = josnurl + versionStr;
                fs.renameSync(filepath + "/" + file2, filepath + "/" + josnurl);
            }
        }
    }
}

function writeFile(saveName,content) {// saveName 写入文件名字 content 保存的内容
    return fs.writeFileSync(saveName,content);
}

writeFile(filename, JSON.stringify(data));
console.log("save RESOURCESVERSION rename success");