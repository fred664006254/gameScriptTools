
var fs = require('fs');

var arguments = process.argv.splice(2);
var filename = arguments[0];
var filename2 = arguments[1];

var Main = {
    main:function() {
        var fileStr = fs.readFileSync(filename, "utf-8");
        var tmpSplitIndex = fileStr.indexOf("window._C", fileStr.length*0.5);
        var splitIndex = fileStr.indexOf("var", tmpSplitIndex);
        console.log("splitIndex",splitIndex);

        fs.writeFileSync(filename, fileStr.substr(0, splitIndex));
        const tmp2 = fileStr.indexOf("=function(t)");
        var headScript = fileStr.substr(0, tmp2);
        console.log("headscript", headScript);
        fs.writeFileSync(filename2, headScript.substr(0, headScript.length-4) + fileStr.substr(splitIndex + 4));

    }
}
Main.main();