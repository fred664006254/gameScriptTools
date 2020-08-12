var Config;
(function (Config) {
    var GamebaseCfg;
    (function (GamebaseCfg) {
        function formatData(data) {
            for (var key in data) {
                GamebaseCfg[key] = data[key];
            }
        }
        GamebaseCfg.formatData = formatData;
    })(GamebaseCfg = Config.GamebaseCfg || (Config.GamebaseCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=GamebaseCfg.js.map