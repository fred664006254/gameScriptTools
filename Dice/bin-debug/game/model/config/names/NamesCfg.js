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
        function getRandomNameBySeed(seed) {
            var namesCfg = getCfg();
            var nameStr = "";
            for (var k in namesCfg) {
                var namesArray = namesCfg[k];
                var name_1 = namesArray[seed];
                while (name_1 == null || name_1 == undefined) {
                    name_1 = namesArray[seed % namesArray.length];
                }
                nameStr += name_1;
            }
            return nameStr;
        }
        NamesCfg.getRandomNameBySeed = getRandomNameBySeed;
        function getEnemyName(info) {
            return info.uid < 1000 ? Config.NamesCfg.getRandomNameBySeed(Number(info.name)) : info.name;
        }
        NamesCfg.getEnemyName = getEnemyName;
        function getRandomSecondName() {
            var namesCfg = getCfg();
            var nameStr = "";
            if (PlatMgr.checkIsRuLang()) {
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