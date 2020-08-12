var fs = require("fs");
var shell = require('child_process');
var dirR = require("./dirR");
var DIR = require("path").resolve();
var compressImg = require("./compressImg");

var arguments = process.argv.splice(2);
var jsonNameData={};
var trunkJsonNameData={};
var atlasData={};

function syncRes(tagName)
{
    console.warn(tagName);
    var fpath=DIR+"/../../../public/resources";
    var childpath="/tags/"+tagName;
    var existTagFile=false;
    if (fs.existsSync(fpath+childpath)) 
    {
        fpath=fpath+childpath;
        existTagFile=true;
    }
    var tagPath=DIR+"/../../../client/tags/Palacewar_"+tagName+"/resource/";
    var trunkPath=DIR+"/../../../client/trunk/Palacewar/resource/";
    var jsonData = require(tagPath+"default.res.json");
    var resourceData=jsonData.resources;
    for (let key in resourceData)
    {
        let itemData=resourceData[key];
        jsonNameData[itemData.name]=itemData.url;
    }

    var trunkJsonData=require(trunkPath+"default.res.json");
    var trunkResourceData=trunkJsonData.resources;
    for (let key in trunkResourceData)
    {
        let itemData=trunkResourceData[key];
        trunkJsonNameData[itemData.name]=itemData.url;
        if(itemData.type=="sheet")
        {
            atlasData[itemData.name]=itemData;
        }
    }

    var notmoveFiles=[];
    var errorNameFiles=[];
    var syncFiles=[];
    var addSyncFiles=[];
    var isNewFile=false;
    dirR.dirR(fpath,function(dir,path){
        if(dir=="dir")
        {
            if(path.indexOf("/.svn")>-1)
            {
                return false;
            }
            if((!existTagFile)&&path.lastIndexOf("/")==0&&path.lastIndexOf("/tags")==0)
            {
                console.warn("pass "+path);
                return false;
            }
        }
        else
        {
            var fullname=path.replace("/","");
            while(fullname.indexOf("/")>-1)
            {
                fullname=fullname.substr(fullname.indexOf("/")+1);
            }
            var isNormalName=true;
            if(fullname.search(/\s/)>-1||fullname.search(/[^a-zA-Z0-9\-_.]/)>-1)
            {
                isNormalName=false;
                errorNameFiles.push(path);
                console.warn("文件名不符合："+fullname);
            }
            
            var prename=fullname.split(".")[0];
            var extname=fullname.split(".")[1];
            if(isNormalName)
            {
                let jData={};
                let jDataResName="";
                if((jsonNameData[prename]&&jsonNameData[prename].indexOf(fullname)>-1)||(jsonNameData[prename+"_"+extname]&&jsonNameData[prename+"_"+extname].indexOf(fullname)>-1)||(trunkJsonNameData[prename]&&trunkJsonNameData[prename].indexOf(fullname)>-1)||(trunkJsonNameData[prename+"_"+extname]&&trunkJsonNameData[prename+"_"+extname].indexOf(fullname)>-1))
                {
                    if(jsonNameData[prename]&&jsonNameData[prename].indexOf(fullname)>-1)
                    {
                        jDataResName=prename;
                        jData=jsonNameData;
                    }
                    else if(jsonNameData[prename+"_"+extname]&&jsonNameData[prename+"_"+extname].indexOf(fullname)>-1)
                    {
                        jDataResName=prename+"_"+extname;
                        jData=jsonNameData;
                    }
                    else if(trunkJsonNameData[prename]&&trunkJsonNameData[prename].indexOf(fullname)>-1)
                    {
                        jDataResName=prename;
                        jData=trunkJsonNameData;
                        isNewFile=true;
                    }
                    else if(trunkJsonNameData[prename+"_"+extname]&&trunkJsonNameData[prename+"_"+extname].indexOf(fullname)>-1)
                    {
                        jDataResName=prename+"_"+extname;
                        jData=trunkJsonNameData;
                        isNewFile=true;
                    }
                    if(extname=="png"||extname=="jpg")
                    {
                        compressImg.compressImg(fpath+path);
                    }
                    shell.execSync("cp -r "+fpath+path+" "+tagPath+jData[jDataResName]);
                    shell.execSync("rm -f "+fpath+path);
                    syncFiles.push(jData[jDataResName]);
                }
                else
                {
                    aa:for (const key in atlasData) 
                    {
                        if (atlasData.hasOwnProperty(key)) 
                        {
                            const element = atlasData[key];
                            if(element.subkeys&&element.subkeys.indexOf("")>-1)
                            {
                                var keyArr = element.subkeys.split(",");
                                if(keyArr.indexOf(prename)>-1)
                                {
                                    jDataResName=element.name;
                                    jData[element.name]=element.url;
                                    if(syncFiles.indexOf(element.url)<0)
                                    {

                                        // if(extname=="png"||extname=="jpg")
                                        // {
                                        //     compressImg.compressImg(fpath+path);
                                        // }
                                        
                                        shell.execSync("cp -r "+trunkPath+jData[jDataResName]+" "+tagPath+jData[jDataResName]);
                                        let resName=jData[jDataResName].split(".")[0]+".png";
                                        shell.execSync("cp -r "+trunkPath+resName+" "+tagPath+resName);
                                        syncFiles.push(resName);
                                    }
                                    shell.execSync("rm -f "+fpath+path);
                                    syncFiles.push(jData[jDataResName]);
                                    break aa;
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                console.warn(isNormalName,fullname,prename,extname,jsonNameData[prename],jsonNameData[prename+"_"+extname]);
                notmoveFiles.push(path);
            }
        }
        return true;
    });
    if(notmoveFiles.length>0)
    {
        console.warn("以下是未同步的资源：：");
        console.table(notmoveFiles);
        if(errorNameFiles.length>0)
        {
            console.warn("文件名有问题的资源：：");
            console.table(errorNameFiles);
        }
    }

    if(syncFiles.length>0)
    {
        console.warn("以下是所有同步成功的资源：：");
        console.table(syncFiles);
    }
    if(addSyncFiles.length>0)
    {
        console.warn("以下是(新增)同步成功的资源：：");
        console.table(addSyncFiles);
    }
    if(existTagFile&&syncFiles.length<=0&&addSyncFiles.length<=0)
    {
        shell.execSync("rm -rf "+fpath);
    }
    if(isNewFile)
    {
        console.log("add");
    }
}
if(arguments.length>0)
{
    syncRes(arguments[0]);
}