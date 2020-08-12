var shell = require("./shell");
var fileTypeCheck = require("./fileTypeCheck");
var DIR = require("path").resolve();
var dirR = require("./dirR");
// let arguments = process.argv.splice(2);

/**
 * 
 * @param {*} fpath 
 * @param {*} tpath 
 */
function compressImg(fpath,tpath)
{
    if (fileTypeCheck.ispng(fpath))
    {
        var force="";
        if(!tpath)
        {
            force="--force";
            tpath=fpath;
        }
        else
        {
            dirR.hasDirNoFile(tpath);
        }
        // 是png并且需要压缩
        var cmd = DIR + "/../../tools/pngquant/pngquant " + force + " --speed=1 -o " + tpath + " " + fpath;
        shell.shell(cmd);
    }
    else if (fileTypeCheck.isjpg(fpath))
    {
        // 是jpg并且需要压缩
        if(tpath)
        {
            dirR.hasDirNoFile(tpath);
            shell.shell("cp -r " + fpath + " " + tpath);
        }
        else
        {
            tpath=fpath;
        }
        var cmd = "/usr/local/bin/jpegoptim --strip-all --preserve --totals --all-progressive --max=80 " + tpath;
        shell.shell(cmd);
    }
}
module.exports={
    compressImg:compressImg
}

// if(arguments.length>0)
// {
//     compressImg(arguments[0],arguments[1]);
// }