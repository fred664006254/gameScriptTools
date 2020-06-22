var fs = require('fs');

function delPath(path) 
{
    var files = [];
    if (fs.existsSync(path)) {
        var stats = fs.statSync(path);
        var isFile = stats.isFile();//是文件
        var isDir = stats.isDirectory();//是文件夹
        if(isDir)
        {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    delPath(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
        else
        {
            fs.unlinkSync(path);
        }
    }
}
module.exports={
    delPath,
}