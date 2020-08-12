var fs = require("fs")
var path = require('path')
var readline = require('readline'); 

function getWordAndOutput(url,paraStr)
{

    var list = url;
    for(var j in list){
        var arr = list[j];
        for(var i in arr)
        {
            //console.log(arr[i]);
            fs.appendFile('node/output.txt',arr[i],'utf8',function(err)
            {  
                if(err)  
                {  
                    console.log(err);
                }
            });
        }
    }
}

function getFiles(url, ext) 
{
    fs.unlink('node/output.txt',function(err) {
        if(err){
            console.log(err);
            return false;
        }
        console.log('删除文件成功');
    });
    fs.readdir(url,function(err, files)
    {   
        if (err) 
        {
            return console.error(err);
        }
        files.forEach( function (file)
        {
            fs.stat(url+file, (err, stats) => 
            {
                if(stats.isFile()) 
                {
                    if(path.extname(url+file) === ext) 
                    {
                        // fs.stat(url+file,(err,info)=>{
                        //     getWordAndOutput(info,null)
                        // })
                        var result = JSON.parse(fs.readFileSync(url+file));
                        getWordAndOutput(result,null);
                    }
                }else if(stats.isDirectory()) 
                {
                    getFiles(url+file+'/', ext);
                }
            })
        })
    })
}

getFiles('../../../client/trunk/Dice/resource/config/language/', '.json');