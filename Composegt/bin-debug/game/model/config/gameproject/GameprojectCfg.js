var Config;
(function (Config) {
    var GameprojectCfg;
    (function (GameprojectCfg) {
        GameprojectCfg.rewardArr = [2, 3, 7];
        GameprojectCfg.challengeRatio1 = 0.2;
        GameprojectCfg.challengeRatio2 = 0.4;
        GameprojectCfg.challengeRatio3 = 0.6;
        GameprojectCfg.challengeRatio4 = 1;
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        GameprojectCfg.formatData = formatData;
    })(GameprojectCfg = Config.GameprojectCfg || (Config.GameprojectCfg = {}));
})(Config || (Config = {}));
