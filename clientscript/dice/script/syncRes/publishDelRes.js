var fs = require('fs');
var path = require('path');
var fileMgr=require("../core/node/fileMgr");
var shell = require('child_process');


var arguments = process.argv.splice(2)
if(arguments.length<1)
{
    arguments=["/Users/publish/h5/dice/publishclient","3k"];
}
var resourcePath=arguments[0];
var plat=arguments[1];

var defaultPath="/default.res.json";
if(plat)
{
    resourcePath=resourcePath+"/"+plat+"/gt_"+plat+"/resource";
    if(plat=="lm")
    {
        resourcePath=resourcePath+"allin";
        defaultPath="/default_961a1a3c.res.json"
    }
}

//default_e8d290e6.res.json
// var jsonData=JSON.parse(fs.readFileSync(arguments[0]+'/default.res.json'));
var jsonData=JSON.parse(fs.readFileSync(resourcePath+defaultPath));
var jsonStr=JSON.stringify(jsonData);

//需要忽略的文件列表
var ignoreList=[defaultPath,"一個官人七個妻.url","/wifeVideo"];


//解析需要遍历的文件夹
var rootPath = path.resolve(resourcePath);
var needDelArr=[];
//调用文件遍历方法
fileDisplay(rootPath);
findSheet();
for(var idx in needDelArr)
{
    console.warn("start delete:"+needDelArr[idx]);
    fileMgr.delPath(needDelArr[idx]);
}
console.log("delete success");

function checkNotIgnore(filedir)
{
    let ignore=false;
    for(var idx in ignoreList)
    {
        if(filedir.indexOf(ignoreList[idx])>-1)
        {
            ignore=true;
            break;
        }
    }
    if(ignore==false)
    {
        var relativePath=filedir.replace(resourcePath+"/","");
        if(jsonStr.indexOf(relativePath)==-1)
        {
            if(needDelArr.indexOf(filedir)<0)
            {
                needDelArr.push(filedir);
            }
        }
    }
    return !ignore;
}

function findSheet()
{
    if(jsonData)
    {
        var resources=jsonData.resources;
        for(var key in resources)
        {
            var item=resources[key];
            if(item.type&&(item.type=="sheet"||item.type=="font"))
            {
                var url=resourcePath+"/"+item.url+"";
                var sheetJson=JSON.parse(fs.readFileSync(url));
                var findUrl=url.substr(0,url.lastIndexOf("/")+1)+sheetJson.file;
                if(needDelArr.indexOf(findUrl)>-1)
                {
                    needDelArr.splice(needDelArr.indexOf(findUrl),1);
                }
            }
        }
    }
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    var files=fs.readdirSync(filePath);
    //遍历读取到的文件列表
    files.forEach(function(filename){
        //获取当前文件的绝对路径
        var filedir = path.join(filePath,filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        var stats = fs.statSync(filedir);
        var isFile = stats.isFile();//是文件
        var isDir = stats.isDirectory();//是文件夹
        if(isFile){
            // console.log(filedir);
            checkNotIgnore(filedir);
        }
        if(isDir){
            if(checkNotIgnore(filedir))
            {
                fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
        }
    });
}
