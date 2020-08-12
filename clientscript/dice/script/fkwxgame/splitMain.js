
var fs = require('fs');

var arguments = process.argv.splice(2);
var filename = arguments[0];
var filename2 = arguments[1];

var Main = {
    main:function() {
        var fileStr = fs.readFileSync(filename, "utf-8");
        var tmpSplitIndex = fileStr.indexOf("window._C", fileStr.length*0.5);
        // var splitIndex = fileStr.indexOf("var", tmpSplitIndex);

        var splitIndex = tmpSplitIndex;
        do {
            splitIndex = fileStr.indexOf("}", splitIndex + 1);
        } while(!isFunEnd(fileStr.substring(tmpSplitIndex, splitIndex)));
        
        splitIndex = fileStr.indexOf(";var", splitIndex);
        splitIndex += 1;
        
        console.log("splitIndex",splitIndex);
        
        fs.writeFileSync(filename, fileStr.substr(0, splitIndex));
        const tmp2 = fileStr.indexOf("=function(t)");
        var headScript = fileStr.substr(0, tmp2);
        console.log("headscript", headScript);
        fs.writeFileSync(filename2, headScript.substr(0, headScript.length-5) + ";" + fileStr.substr(splitIndex));

    }
}

var isFunEnd = function (str) {
    var reg1 = /{/g;
    var reg2 = /}/g;
    var n1 = str.match(reg1) || [];
    var n2 = str.match(reg2) || [];
    return n1.length == n2.length+1;
}

Main.main();