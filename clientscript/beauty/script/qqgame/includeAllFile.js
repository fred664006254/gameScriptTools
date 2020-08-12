
var fs = require('fs');
 
var arguments = process.argv.splice(2);
var filename = arguments[0];

var Main = {
    main:function() {
        var fileStr = fs.readFileSync(filename, "utf-8");
        fileStr = fileStr.replace(/__reflect\((\S*)\.prototype,/g,'window.$1=$1;__reflect($1.prototype,');
        fileStr = fileStr.replace(/var (\w*);!function\(e\)/g,'var $1=window.$1||undefined;!function(e)');
        fileStr = fileStr.replace(/}\((\w*)\|\|\((\w*)={}\)\);/g,function(all,p1,p2) {
            if (p1 == p2) {
                // console.log("是要找的", p1);
                return '}('+p1+'||('+p1+'={}));window.'+p1+'='+p1+';';
            } else {
                console.log("不是要找的", p2);
                return all;
            }
        });
        fileStr = fileStr.replace(/}\((\w*)\|\|\((\w*)={}\)\),/g,function(all,p1,p2) {
            if (p1 == p2) {
                // console.log("是要找的", p1);
                return '}('+p1+'||('+p1+'={})),window.'+p1+'='+p1+',';
            } else {
                console.log("不是要找的", p2);
                return all;
            }
        });
        fs.writeFileSync(filename, fileStr);
    }
}
Main.main();