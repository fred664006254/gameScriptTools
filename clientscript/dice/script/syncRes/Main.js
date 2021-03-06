var dirR = require("./dirR");
var shell = require("./shell");
var roleUtil = require("./roleUtil");
var allInfo = require("./allInfo");
var fileTypeCheck = require("./fileTypeCheck");
var fs = require("fs");
var DIR = require("path").resolve();
var saveFile = require("./saveFile");
var tpMerge = require("./tpMerge");
var defaultGen = require("./defaultGen");
var arguments = process.argv.splice(2);
var trunkPath = arguments[0];
var Main = {
    main:function () {
        var info = allInfo.getInfo(trunkPath);
        this.deleteFile(info);
        // 已处理过的文件
        this.procedCount = 0;
        this.procCn(info);
        this.procMulti(info);
        info = allInfo.getInfo(trunkPath);
        saveFile.saveMd5(info);
        defaultGen.defaultGen(trunkPath + "/Dice/resource");
    },
    // 打印进度
    nextProgress(info) {
        this.procedCount ++;
        console.log(Math.floor(this.procedCount / info.needProcCount * 100) + "%");
    },
    // 删除无用的文件
    deleteFile(info) {
        for (const language in info.needDelete) {
            if (info.needDelete.hasOwnProperty(language)) {
                const element = info.needDelete[language];
                for (const filePath in element) {
                    if (element.hasOwnProperty(filePath)) {
                        var cmd = "rm -f " + info.trunkPath + ((language === "cn")?"/Dice/resource/assets":("/resoucres_multi/assets_"+language)) + filePath;
                        console.log(cmd);
                        shell.shell(cmd);
                    }
                }
            }
        }
    },
    procCn:function (info) {
        if (!info.needProc.cn) {
            return;
        }
        var cnProcArr = Object.keys(info.needProc.cn);
        for (var i = 0; i < cnProcArr.length; i++) {
            this.nextProgress(info);
            var f1 = cnProcArr[i];
            var f2 = info.trunkPath + "/resources/assets" + f1;
            var f3 = info.trunkPath + "/Dice/resource/assets" + f1;
            var stats = fs.statSync(f2);
            if (stats.isFile()) {
                console.log("isFile", f1);
                if (fileTypeCheck.ispng(f1) && roleUtil.checkCompress(f1)) {
                    dirR.hasDirNoFile(f3);
                    // 是png并且需要压缩
                    var cmd = DIR + "/../../tools/pngquant/pngquant" + " --speed=1 -o " + f3 + " " + f2;
                    shell.shell(cmd);
                } else if (fileTypeCheck.isjpg(f1) && roleUtil.checkCompress(f1)) {
                    dirR.hasDirNoFile(f3);
                    shell.shell("cp " + f2 + " " + f3);
                    // 是jpg并且需要压缩
                    var cmd = "/usr/local/bin/jpegoptim --strip-all --preserve --totals --all-progressive --max=80 " + f3;
                    shell.shell(cmd);
                } else {
                    dirR.hasDirNoFile(f3);
                    shell.shell("cp " + f2 + " " + f3);
                }
            } else if (stats.isDirectory()) {
                console.log("isDirectory", f1);
                // var cmd = "/Applications/TextureMerger.app/Contents/MacOS/TextureMerger -p " + f2 + " -o " + f3 + ".json";
                // shell.shell(cmd);
                // tpMerge.tpMerge(f2, f3+".json");
                if (f3.split("view/").length === 2&&(f3 + "endwithview").indexOf("viewendwithview") !== -1) {
                    // 以view结尾
                    tpMerge.tpMerge(f2 + "/*.??g", f3+f3.substr(f3.lastIndexOf("/")) + ".json");

                    if (roleUtil.checkCompress(f1)) {
                        shell.shell("mv " + f3+f3.substr(f3.lastIndexOf("/")) + ".png " + f3+f3.substr(f3.lastIndexOf("/")) + "_tmp.png");
                        var cmd2 = DIR + "/../../tools/pngquant/pngquant" + " --speed=1 -o " + f3+f3.substr(f3.lastIndexOf("/")) + ".png" + " " + f3+f3.substr(f3.lastIndexOf("/")) + "_tmp.png";
                        shell.shell(cmd2);
                        shell.shell("rm -f " + f3+f3.substr(f3.lastIndexOf("/")) + "_tmp.png");
                    }
                } else {
                    var isFnt = f3.indexOf("_fnt") !== -1 || f3.indexOf("_fnt2") !== -1 || f3.indexOf("_upfnt") !== -1;
                    tpMerge.tpMerge(f2 + (isFnt?"":"/*.??g"), f3+(isFnt?".fnt":".json"));

                    if (roleUtil.checkCompress(f1)) {
                        shell.shell("mv " + f3 + ".png " + f3 + "_tmp.png");
                        var cmd2 = DIR + "/../../tools/pngquant/pngquant" + " --speed=1 -o " + f3 + ".png" + " " + f3 + "_tmp.png";
                        shell.shell(cmd2);
                        shell.shell("rm -f " + f3 + "_tmp.png");
                    }
                }
            }
        }
    },
    procMulti:function (info) {
        for (var platIndex = 0; platIndex < info.multiArr.length; platIndex++) {
            var platName = info.multiArr[platIndex];
            if (!info.needProc[platName]) {
                continue;
            }
            console.log("platName", platName);
            var platProcArr = Object.keys(info.needProc[platName]);
            for (var i = 0; i < platProcArr.length; i++) {
                this.nextProgress(info);
                var f1 = platProcArr[i];
                var f2 = info.trunkPath + "/resources/assets_" + platName + f1;
                var f3 = info.trunkPath + "/resoucres_multi/assets_" + platName + f1;

                if (fs.existsSync(f2) && fs.statSync(f2).isFile()) {
                    console.log("isFile", f1);
                    if (fileTypeCheck.ispng(f1) && roleUtil.checkCompress(f1)) {
                        dirR.hasDirNoFile(f3);
                        // 是png并且需要压缩
                        var cmd = DIR + "/../../tools/pngquant/pngquant" + " --speed=1 -o " + f3 + " " + f2;
                        shell.shell(cmd);
                    } else if (fileTypeCheck.isjpg(f1) && roleUtil.checkCompress(f1)) {
                        dirR.hasDirNoFile(f3);
                        shell.shell("cp " + f2 + " " + f3);
                        // 是jpg并且需要压缩
                        var cmd = "/usr/local/bin/jpegoptim --strip-all --preserve --totals --all-progressive --max=80 " + f3;
                        shell.shell(cmd);
                    } else {
                        dirR.hasDirNoFile(f3);
                        shell.shell("cp " + f2 + " " + f3);
                    }
                } else if (!fs.existsSync(f2) || fs.statSync(f2).isDirectory()) {
                    console.log("isDirectory", f1);
                    dirR.cleanAndExistsDir(info.trunkPath + "/resourcestmp");
                    shell.shell("cp -rf " + info.trunkPath + "/resources/assets" + f1 + "/* " + info.trunkPath + "/resourcestmp/")
                    if (fs.existsSync(f2)) {
                        shell.shell("cp -rf " + f2 + "/* " + info.trunkPath + "/resourcestmp/");
                    }
                    // var cmd = "/Applications/TextureMerger.app/Contents/MacOS/TextureMerger -p " + info.trunkPath + "/resourcestmp" + " -o " + f3 + ".json";
                    // shell.shell(cmd);

                    if (f3.split("view/").length === 2&&(f3 + "endwithview").indexOf("viewendwithview") !== -1) {
                        // 以view结尾

                        tpMerge.tpMerge(
                            info.trunkPath + "/resourcestmp/*.??g",
                            f3+f3.substr(f3.lastIndexOf("/")) + ".json"
                            // f3+".json"
                            );
                        if (roleUtil.checkCompress(f1)) {
                            shell.shell("mv " + f3+f3.substr(f3.lastIndexOf("/")) + ".png " + f3+f3.substr(f3.lastIndexOf("/")) + "_tmp.png");
                            var cmd2 = DIR + "/../../tools/pngquant/pngquant" + " --speed=1 -o " + f3+f3.substr(f3.lastIndexOf("/")) + ".png" + " " + f3+f3.substr(f3.lastIndexOf("/")) + "_tmp.png";
                            shell.shell(cmd2);
                            shell.shell("rm -f " + f3+f3.substr(f3.lastIndexOf("/")) + "_tmp.png");
                        }
                    } else {

                        var isFnt = f3.indexOf("_fnt") !== -1 || f3.indexOf("_fnt2") !== -1 || f3.indexOf("_upfnt") !== -1;
                        tpMerge.tpMerge(
                            info.trunkPath + (isFnt?"/resourcestmp":"/resourcestmp/*.??g"),
                            f3+(isFnt?".fnt":".json")
                            // f3+".json"
                            );
                        if (roleUtil.checkCompress(f1)) {
                            shell.shell("mv " + f3 + ".png " + f3 + "_tmp.png");
                            var cmd2 = DIR + "/../../tools/pngquant/pngquant" + " --speed=1 -o " + f3 + ".png" + " " + f3 + "_tmp.png";
                            shell.shell(cmd2);
                            shell.shell("rm -f " + f3 + "_tmp.png");
                        }
                    }
                }
            }
        }
    }
};
Main.main();