
var fs = require('fs');
 
var arguments = process.argv.splice(2);
var filename = arguments[0];

var Main = {
    main:function() {
        var fileStr = fs.readFileSync(filename, "utf-8");
        fileStr = fileStr.replace(/__reflect\((\S*)\.prototype/g,'window.$1=$1;__reflect($1.prototype');
        fs.writeFileSync(filename, fileStr + "window.Config=Config;");
    }
}
Main.main();