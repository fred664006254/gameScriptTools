
var fs = require("fs");
var shell = require("./shell");
var path = require("path");
// 合图方法
module.exports={

    tpMerge:function (originDir, targetImg) {
        console.log("targetImg", targetImg);
        var tdir = path.dirname(targetImg);

        var fileext = path.extname(targetImg);
        var filename = path.basename(targetImg, fileext);

        var tmpJson = tdir + '/' + filename + fileext;
        var tmpPng = tdir + '/' + filename + '.png';

        // console.log(tmpJson, tmpPng);

        var tpTool = '/usr/local/bin/TexturePacker ' + originDir + 
            ' --data ' + tmpJson + 
            ' --sheet ' + tmpPng +
            ' --force-squared --format json-array --size-constraints AnySize --border-padding 2 --max-width 2048 --max-height 2048' +
            ' --disable-rotation'

        shell.shell(tpTool);

        var tpjsondata = fs.readFileSync(tmpJson);       
        var tpjson = JSON.parse(tpjsondata);

        var tmjson = {
            'file': filename + '.png',
            'frames': {},
        }

        tpjson['frames'].forEach(ele => {
            var eleName = path.basename(ele['filename'], path.extname(ele['filename']));

            tmjson['frames'][eleName] = {
                'x': ele['frame']['x'],
                'y': ele['frame']['y'],
                'w': ele['frame']['w'],
                'h': ele['frame']['h'],
                'offX': ele['spriteSourceSize']['x'],
                'offY': ele['spriteSourceSize']['y'],
                'sourceW': ele['sourceSize']['w'],
                'sourceH': ele['sourceSize']['h'],
            }
        });
        var fileData = JSON.stringify(tmjson);
        var role = [
            [/问号/g, "?"],
            [/斜杠/g, "/"],
            [/点号/g, "."],
        ];
        for (var i = 0; i < role.length; i++) {
            if (typeof(role[i][1]) === "string") {
                fileData = fileData.replace(role[i][0], role[i][1]);
            }
        }
        fs.writeFileSync(tmpJson, fileData);
    }
}