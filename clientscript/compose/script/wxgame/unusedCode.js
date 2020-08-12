
var fs = require('fs');
 
var arguments = process.argv.splice(2);
var dirname = arguments[0];

var Main = {
    main:function() {
        // 随机时要用到的字符
        var allChar = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
        // 生成类的个数
        var classCount = 1000;
        // 随机库
        var toNames = [];
        // 随机库个数
        var toNameCount = allChar.length*allChar.length*allChar.length;
        for (var i = 0; i < toNameCount; i++) {
            var tmp1 = i % allChar.length;
            var tmp2 = Math.floor(i/allChar.length) % allChar.length;
            var tmp3 = Math.floor(i/allChar.length/allChar.length) % allChar.length;
            toNames.push(allChar[tmp1] + allChar[tmp2] + allChar[tmp3]);
        }
        // console.log(toNames);
        for (var i = 0; i < toNames.length; i++) {
            var rndIndex = Math.floor(Math.random() * toNames.length);
            var tmpChangeVar = toNames[rndIndex];
            toNames[rndIndex] = toNames[i];
            toNames[i] = tmpChangeVar;
        }
        for(var i = 0; i < classCount; i++) {
            var classCode = "class _R"+toNames[i*2]+" {\n    public _"+ toNames[i*2+1] +" (name:string):number {\n        let obj:any = {name:name};\n        obj.value = "+ Math.floor(Math.random() * 100) +";\n        return obj.value;\n    }\n}\nwindow['_R"+toNames[i*2]+"'] = _R"+toNames[i*2]+";";
            fs.writeFileSync(dirname + "/_R" + toNames[i*2] + ".ts", classCode);
        }
    }
};
Main.main();