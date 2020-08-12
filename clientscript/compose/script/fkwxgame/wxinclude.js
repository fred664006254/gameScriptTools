/**
 * Created by Administrator on 2016/8/9.
 */
var fs = require('fs');
var path = require('path');
function procDir(dir) {
    var dirInfo = fs.readdirSync(dir);
    console.log(dirInfo);
    
}
procDir(process.cwd() + "/../../../client/trunk/Composegt/src/game");
// var includeFile = ""
// function writeFile(saveName,content) {// saveName 写入文件名字 content 保存的内容
//     fs.writeFile(saveName,content,null,function(err){
//         if( err != void 0 ){
//             console.log("save JSVERSION error");
//         }else{
//             console.log("save JSVERSION success");
//         }
//     })
// }

// writeFile(filename, JSON.stringify(data));