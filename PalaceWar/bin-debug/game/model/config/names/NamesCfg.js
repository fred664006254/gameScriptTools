var Config;
(function (Config) {
    var NamesCfg;
    (function (NamesCfg) {
        function getCfg() {
            return GameData.getLanguageRes("names_");
        }
        NamesCfg.getCfg = getCfg;
        function getRandomName() {
            var namesCfg = getCfg();
            var nameStr = "";
            for (var k in namesCfg) {
                var namesArray = namesCfg[k];
                nameStr += namesArray[App.MathUtil.getRandom(0, namesArray.length)];
            }
            return nameStr;
        }
        NamesCfg.getRandomName = getRandomName;
        function getRandomSecondName() {
            var namesCfg = getCfg();
            var nameStr = "";
            if (PlatformManager.checkIsRuLang()) {
                var namesArray = namesCfg[0];
                nameStr += namesArray[App.MathUtil.getRandom(0, namesArray.length)];
            }
            else {
                for (var k = 1; k < namesCfg.length; k++) {
                    var namesArray = namesCfg[k];
                    nameStr += namesArray[App.MathUtil.getRandom(0, namesArray.length)];
                }
            }
            return nameStr;
        }
        NamesCfg.getRandomSecondName = getRandomSecondName;
    })(NamesCfg = Config.NamesCfg || (Config.NamesCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NamesCfg.js.map