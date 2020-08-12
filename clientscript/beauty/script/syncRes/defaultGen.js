var dirR = require("./dirR");
var fileTypeCheck = require("./fileTypeCheck");
var saveFile = require("./saveFile");
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
                if (fileTypeCheck.ismp3(resourcePath + "/" + path)) {
                    defObj.resources.push({
                        "name": path.substring(path.lastIndexOf("/")+1, path.lastIndexOf(".")),
                        "type": "sound",
                        "url": path.substr(1)
                    });
                } else if (fileTypeCheck.isfnt(resourcePath + "/" + path)) {
                    defObj.resources.push({
                        "name": path.substring(path.lastIndexOf("/")+1, path.lastIndexOf(".")),
                        "type": "font",
                        "url": path.substr(1)
                    });
                } else if (fileTypeCheck.isdbbin(resourcePath + "/" + path)) {
                    defObj.resources.push({
                        "name": path.substring(path.lastIndexOf("/")+1, path.lastIndexOf(".")),
                        "type": "bin",
                        "url": path.substr(1)
                    });
                } else if (fileTypeCheck.isttf(resourcePath + "/" + path)) {
                    defObj.resources.push({
                        "name": path.substring(path.lastIndexOf("/")+1, path.lastIndexOf(".")),
                        "type": "bin",
                        "url": path.substr(1)
                    });
                } else if (fileTypeCheck.isjpg(resourcePath + "/" + path)) {
                    defObj.resources.push({
                        "name": path.substring(path.lastIndexOf("/")+1, path.lastIndexOf(".")),
                        "type": "image",
                        "url": path.substr(1)
                    });
                } else if (fileTypeCheck.ispng(resourcePath + "/" + path)) {
                    if (!fileTypeCheck.isPngOfFntOrJson(resourcePath + "/" + path)) {
                        defObj.resources.push({
                            "name": path.substring(path.lastIndexOf("/")+1, path.lastIndexOf(".")),
                            "type": "image",
                            "url": path.substr(1)
                        });
                    }
                } else if (fileTypeCheck.isJsonNotSheet(resourcePath + "/" + path)) {
                    if (path.indexOf("default.res.json") === -1) {
                        var name = path.substring(path.lastIndexOf("/")+1, path.lastIndexOf("."));
                        if (path.indexOf("config/plat/") !== -1) {
                            name += "_json";
                        }
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
                        "name": path.substring(path.lastIndexOf("/")+1, path.lastIndexOf(".")),
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