var defaultGen = require("./defaultGen");
var arguments = process.argv.splice(2);
var resourcePath = arguments[0];
var Main = {
    main:function () {
        defaultGen.defaultGen(resourcePath);
    },
};
Main.main();