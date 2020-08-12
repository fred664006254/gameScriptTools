/**
 * 重写EgretSubPackageLoading.js中背景图路径为加密后路径
 */
var fs = require('fs');
var params = process.argv;

// 首先从default.res.json读取到loginbg的路径
var _defaultPath = params[2];
var __json = fs.readFileSync(_defaultPath, 'utf8');
var ress = JSON.parse(__json).resources;
var loginbgUrl = "";
for (var i = 0; i < ress.length; i++) {
    if (ress[i].name === 'loginbg') {
        loginbgUrl = ress[i].url;
        break;
    }
}

// 替换EgretSubPackageLoading.js中的路径
var _loadPath = params[3];
var __code = fs.readFileSync(_loadPath, 'utf8');
__code = __code.replace("assets/loginres/loginbg.jpg", loginbgUrl);
fs.writeFile(_loadPath, __code, 'utf8', function (err) {
    if (err) {
        return console.error('写入失败！');
    }
    console.log('写入完成！');
    // console.log(fs.readFileSync(_loadPath, 'utf8'));
})
