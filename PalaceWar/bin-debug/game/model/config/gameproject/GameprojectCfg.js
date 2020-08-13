var Config;
(function (Config) {
    var GameprojectCfg;
    (function (GameprojectCfg) {
        GameprojectCfg.rewardArr = [2, 3, 7];
        GameprojectCfg.sign2Day = 2;
        GameprojectCfg.sign3Day = 3;
        GameprojectCfg.sign7Day = 7;
        GameprojectCfg.sign30Day = 30;
        GameprojectCfg.sign100Day = 100;
        GameprojectCfg.sign365Day = 365;
        GameprojectCfg.sign600Day = 600;
        GameprojectCfg.sign700Day = 700;
        GameprojectCfg.sign800Day = 800;
        GameprojectCfg.sign900Day = 900;
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        GameprojectCfg.formatData = formatData;
        /**
         * 检测道具合成不显示红点的道具
         */
        function checkComposeNotShowRedPointById(id) {
            if (GameprojectCfg.itemId && GameprojectCfg.itemId.length) {
                return GameprojectCfg.itemId.indexOf(String(id)) > -1;
            }
            return false;
        }
        GameprojectCfg.checkComposeNotShowRedPointById = checkComposeNotShowRedPointById;
    })(GameprojectCfg = Config.GameprojectCfg || (Config.GameprojectCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=GameprojectCfg.js.map