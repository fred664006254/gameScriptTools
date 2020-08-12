var dirR = require("./dirR");
var fileTypeCheck = require("./fileTypeCheck");
var saveFile = require("./saveFile");
var sizeof = require('image-size');
module.exports={
    defaultGen:function (resourcePath) {
        console.log("开始生成default.res.json");
        var jsonUrl = resourcePath;
        if (resourcePath.substr(resourcePath.length - 5)!=".json")
        {
            if (resourcePath.substr(resourcePath.length - 1) == "/")
            {
                resourcePath = resourcePath.substr(0, resourcePath.length - 1);
                jsonUrl=resourcePath;
            }
            var res = "/resource";
            if (resourcePath.substr(resourcePath.length - res.length) != res)
            {
                resourcePath = resourcePath +"/resource";
                jsonUrl = resourcePath;
            }
            jsonUrl = resourcePath + "/default.res.json";
        }
        else
        {
            resourcePath = resourcePath.replace("/default.res.json","");
        }
        var defObj = require(jsonUrl);
        // console.log(Object.keys(defObj));
        defObj.resources = [];
        dirR.dirR(resourcePath + "/", (type, path)=>{
            if (type === "file") {
                var fileName=path.substring(path.lastIndexOf("/")+1, path.lastIndexOf("."));
                var fileNadExt=path.substring(path.lastIndexOf("/")+1);
                fileNadExt=fileNadExt.replace(".","_");

                if (fileTypeCheck.ismp3(resourcePath + "/" + path)) {
                    defObj.resources.push({
                        "name": fileName,
                        "type": "sound",
                        "url": path.substr(1)
                    });
                } else if (fileTypeCheck.isfnt(resourcePath + "/" + path)) {
                    defObj.resources.push({
                        "name": fileName,
                        "type": "font",
                        "url": path.substr(1)
                    });
                } else if (fileTypeCheck.isdbbin(resourcePath + "/" + path)) {
                    defObj.resources.push({
                        "name": fileName,
                        "type": "bin",
                        "url": path.substr(1)
                    });
                } else if (fileTypeCheck.isjpg(resourcePath + "/" + path)) {
                    var resData={
                        "name": fileName,
                        "type": "image",
                        "url": path.substr(1)
                    };
                    var ressize = sizeof(resourcePath + "/" + path);
                    resData.sz=ressize.width+","+ressize.height;
                    defObj.resources.push(resData);
                } else if (fileTypeCheck.ispng(resourcePath + "/" + path)) {
                    var name=fileName;
                    if (!fileTypeCheck.isPngOfFntOrJson(resourcePath + "/" + path)) {
                        var sz="";
                        if(fileNadExt.indexOf("_tex_png")>-1)
                        {
                            // name=fileNadExt;
                        }
                        else if(path.indexOf("assets/icon/")>-1||path.indexOf("assets/effect/")>-1||path.indexOf("assets/public/itembg/")>-1)
                        {
                            var ressize = sizeof(resourcePath + "/" + path);
                            sz=ressize.width+","+ressize.height;
                        }

                        var resData={
                            "name": name,
                            "type": "image",
                            "url": path.substr(1)
                        };
                        if(sz)
                        {
                            resData.sz=sz;
                        }
                        defObj.resources.push(resData);
                    }
                } else if (fileTypeCheck.isJsonNotSheet(resourcePath + "/" + path)) {
                    if (path.indexOf("default.res.json") === -1) {
                        var name = fileName;
                        if (path.indexOf("config/plat/") !== -1) {
                            name += "_json";
                        }
                        // else if(fileNadExt.indexOf("_tex_json")>-1)
                        // {
                        //     name=fileNadExt;
                        // }
                        defObj.resources.push({
                            "name": name,
                            "type": "json",
                            "url": path.substr(1)
                        });
                    }
                } else if (fileTypeCheck.isJsonSheet(resourcePath + "/" + path)) {
                    var jsonContent = require(resourcePath + "/" + path);

                    subkeysStr = "";
                    var subkeys = Object.keys(jsonContent.frames);
                    for (var i = 0; i < subkeys.length; i++) {
                        subkeysStr += "," + subkeys[i];
                    }
                    subkeysStr = subkeysStr.substring(1);
                    defObj.resources.push({
                        "name": fileName,
                        "type": "sheet",
                        "url": path.substr(1),
                        "subkeys": subkeysStr
                    });
                } 
            }
            return true;
        });
        // console.log(defObj);
        this.checkDefObj(defObj);
        saveFile.saveDefault(resourcePath, defObj);
    },
    // 校验文件
    checkDefObj:function(defObj) {
        console.log("开始检测default.res.json");
        var repeatMap = {};
        for(var i = 0; i < defObj.resources.length; i++){
            var res = defObj.resources[i];
            if (res.name) {
                if (!repeatMap[res.name]) {
                    repeatMap[res.name] = [];
                }
                repeatMap[res.name].push(res.url);
            }
            if (res.subkeys) {
                var subkeys = res.subkeys.split(",");
                for (let j = 0; j < subkeys.length; j++) {
                    const element = subkeys[j];                    
                    if (!repeatMap[element]) {
                        repeatMap[element] = [];
                    }
                    repeatMap[element].push(res.url);
                }
            }
        }
        var errorFlag = false;
        for (const key in repeatMap) {
            if (repeatMap.hasOwnProperty(key)) {
                const element = repeatMap[key];
                if (element.length > 1) {
                    for (let i = 0; i < element.length; i++) {
                        console.log("default.res.json发现重复key", key, element[i]);
                        errorFlag = true;
                    }
                }
            }
        }
        if (errorFlag) {
            throw new Error("default.res.json校验错误，请检查");
        } else {
            console.log("default.res.json检测无误");
        }
    }
}