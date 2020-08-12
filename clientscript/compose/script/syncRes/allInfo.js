var dirR = require("./dirR");
var md5Util = require("./md5Util");
var roleUtil = require("./roleUtil");
var fs = require("fs");
// 检测总信息
module.exports={
	getInfo:function (trunkPath) {
		
        // console.log("同步资源");
        // var trunkPath = "/Users/zhaozhantao/me/doc/gt/client/trunk";
        // var trunkPath = "/Users/zhaozhantao/me/doc/gt/resTestTrunk";
        // 新的md5
        var md5Map = {};
        // 旧的md5
        var oldMd5Map = require(trunkPath + "/resMd5.json");
        // 需要处理的
        var needProc = {};
        // 需要处理的文件总数
        var needProcCount = 0;
        // 需要删除的
        var needDelete = {};
        // 多语言标识
        // var multiArr = ["en"];
        var multiArr = ["en","hexie","iosshenhe","iosshenhe2",
        ];
        needDelete["cn"] = {};
        dirR.dirR(trunkPath + "/Composegt/resource/assets", (type, path)=>{
            if (type === "file") {
                needDelete["cn"][path] = true;
            }
            return true;
        });
        for (var i = 0; i < multiArr.length; i++) {
            var multiName = multiArr[i];
            needDelete[multiName] = {};
            dirR.dirR(trunkPath + "/resoucres_multi/assets_" + multiName, (type, path)=>{
                if (type === "file") {
                    needDelete[multiName][path] = true;
                }
                return true;
            });
        }
        md5Map["cn"] = {};
        dirR.dirR(trunkPath + "/resources/assets", (type, path)=>{
            if (type === "file") {
                md5Map["cn"][path] = this.getPathMd5(trunkPath, "cn", path, needDelete);
                if (!oldMd5Map["cn"] || md5Map["cn"][path] !== oldMd5Map["cn"][path]) {
                    var mergeDir = roleUtil.getMergeDir(path);
                    needProc["cn"] = needProc["cn"] || {};
                    if (mergeDir) {
                        needProc["cn"][mergeDir] = true;
                        for (var i = 0; i < multiArr.length; i++) {
                            if (fs.existsSync(trunkPath + "/resources/assets_" + multiArr[i] + mergeDir)) {                                
                                needProc[multiArr[i]] = needProc[multiArr[i]] || {};
                                if (!needProc[multiArr[i]][mergeDir]) {
                                    needProc[multiArr[i]][mergeDir] = true;
                                    needProcCount++;
                                }
                            }
                        }
                    } else {
                        needProc["cn"][path] = true;
                        needProcCount++;
                    }
                }
            }
            return true;
        });
        for (var i = 0; i < multiArr.length; i++) {
            var multiName = multiArr[i];
            md5Map[multiName] = {};
            dirR.dirR(trunkPath + "/resources/assets_" + multiName, (type, path)=>{
                // console.log("pathaaa", path);
                if (type === "file") {
                    md5Map[multiName][path] = this.getPathMd5(trunkPath, multiName, path, needDelete);
                    if (!oldMd5Map[multiName] || md5Map[multiName][path] !== oldMd5Map[multiName][path]) {
                        needProc[multiName] = needProc[multiName] || {};
                        var mergeDir = roleUtil.getMergeDir(path);
                        if (mergeDir) {
                            if (!needProc[multiName][mergeDir]) {
                                needProc[multiName][mergeDir] = true;
                                // console.log("mergeDir", mergeDir);

                                needProcCount ++;
                            }
                        } else {
                            needProc[multiName][path] = true;
                            // console.log("path", path);
                            needProcCount ++;
                        }
                    }
                }
                return true;
            });
        }
        
        // console.log("needProc", JSON.stringify(needProc, null, 4));
        return {
        	oldMd5Map:oldMd5Map,
        	trunkPath:trunkPath,
        	needProc:needProc,
        	md5Map:md5Map,
        	multiArr:multiArr,
            needProcCount:needProcCount,
            needDelete:needDelete
        };
    },
    getPathMd5:function(trunkPath, language, path, needDelete) {
        // 源文件的md5
        var md5src = ""; 
        // 是否合图
        var md5merge = "";
        // 是否不压缩
        var md5compress = "";
        // 生成文件的md5
        var md5target1 = "";
        // 生成文件2的md5(对于合图的来说会出现两个文件)
        var md5target2 = "";
        // 如果要合图，那合图里文件的个数
        var md5MergeCount = "";

        md5src = md5Util.fileMd5(trunkPath + "/resources/assets" + ((language === "cn")?"":("_"+language)) + path);
        md5merge = !!roleUtil.getMergeDir(path);
        md5compress = roleUtil.checkCompress(path);
        if (md5merge) {
            var f3 = roleUtil.getMergeDir(path);
            var ft1 = "";
            var ft2 = "";
            if (f3.split("view/").length === 2&&(f3 + "endwithview").indexOf("viewendwithview") !== -1) {
                // 以view结尾
                ft1 = f3+f3.substr(f3.lastIndexOf("/")) + ".png";
                ft2 = f3+f3.substr(f3.lastIndexOf("/")) + ".json";
            } else {
                var isFnt = f3.indexOf("_fnt") !== -1 || f3.indexOf("_fnt2") !== -1 || f3.indexOf("_upfnt") !== -1;
                ft1 = f3 + ".png";
                ft2 = f3+(isFnt?".fnt":".json");
            }
            delete needDelete[language][ft1];
            delete needDelete[language][ft2];
            ft1 = trunkPath + ((language === "cn")?"/Composegt/resource/assets":("/resoucres_multi/assets_"+language)) + ft1;
            ft2 = trunkPath + ((language === "cn")?"/Composegt/resource/assets":("/resoucres_multi/assets_"+language)) + ft2;
            if (fs.existsSync(ft1)) {
                md5target1 = md5Util.fileMd5(ft1);
            }
            if (fs.existsSync(ft2)) {
                md5target2 = md5Util.fileMd5(ft2);
            }
        } else {
            var ft1 = trunkPath + ((language === "cn")?"/Composegt/resource/assets":("/resoucres_multi/assets_"+language)) + path;
            delete needDelete[language][path];
            if (fs.existsSync(ft1)) {
                md5target1 = md5Util.fileMd5(ft1);
            }
        }
        if (md5merge) {
            var count = 0;
            var f3 = roleUtil.getMergeDir(path);
            var isFnt = f3.indexOf("_fnt") !== -1 || f3.indexOf("_fnt2") !== -1 || f3.indexOf("_upfnt") !== -1;
            dirR.dirR(trunkPath + "/resources/assets" + ((language === "cn")?"":("_"+language)) + f3, (fileType, mergeFilePath)=>{
                if (fileType === "dir") {
                    return isFnt;
                } else if (fileType === "file") {
                    count ++;
                }                
            });
            md5MergeCount = count.toString();
        }
        return "|" + md5src + "|" + md5merge + "|" + md5compress + "|" + md5target1 + "|" + md5target2 + "|" + md5MergeCount + "|"
    }
}