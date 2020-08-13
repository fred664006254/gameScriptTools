var Config;
(function (Config) {
    /**
     * 红颜配置
     */
    var WifebaseCfg;
    (function (WifebaseCfg) {
        function formatData(data) {
            for (var key in data) {
                WifebaseCfg[key] = data[key];
            }
            // wifeSkillMax = 10;
        }
        WifebaseCfg.formatData = formatData;
    })(WifebaseCfg = Config.WifebaseCfg || (Config.WifebaseCfg = {}));
})(Config || (Config = {}));
