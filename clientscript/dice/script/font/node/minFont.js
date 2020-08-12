var fs = require("fs")
var Fontmin = require('fontmin');

var t = fs.readFileSync("node/output.txt", "utf8");

var srcPath = 'bigfonts/*.ttf'; 
var destPath = '../../../client/trunk/Dice/resource/assets/fonts/';

fs.readdir('bigfonts', function(err, files){
    //err 为错误 , files 文件名列表包含文件夹与文件
    if(err){
        console.log('error:\n' + err);
        return;
    }
    files.forEach(function(file){
        fs.stat('bigfonts' + '/' + file, function(err, stat){
            if(err){console.log(err); return;}
            if(stat.isDirectory()){                 
                // 如果是文件夹遍历
                explorer('bigfonts' + '/' + file);
            }else{
                // 读出所有的文件
                if(file.slice(-4) != "tore"){
                    var fontmin = new Fontmin()   
                    .src('bigfonts' + '/' + file)      
                    .use(Fontmin.glyph({
                        text:t
                    }))  
                    //.use(Fontmin.ttf2eot())
                    .use(Fontmin.ttf2woff())      
                    //.use(Fontmin.ttf2svg()) 
                    .use(Fontmin.css(
                        {
                            fontFamily: function (font, ttf) {
                                console.log('文件名:' + 'bigfonts' + '/' + file.slice(0,file.length-4));
                                return ttf.name.fontFamily =file.slice(0,file.length-4);
                            }
                        })) 
                    .dest(destPath);

                fontmin.run(function (err, files, stream) {

                    if (err) {
                        console.error(err);
                    }

                    console.log('done');
                });
                }
                

            }               
        });
    });
});

