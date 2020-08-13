var Config;
(function (Config) {
    /**
     * --册封基础信息配置
     */
    var WifestatusbaseCfg;
    (function (WifestatusbaseCfg) {
        function formatData(data) {
            for (var key in data) {
                WifestatusbaseCfg[key] = data[key];
            }
        }
        WifestatusbaseCfg.formatData = formatData;
    })(WifestatusbaseCfg = Config.WifestatusbaseCfg || (Config.WifestatusbaseCfg = {}));
})(Config || (Config = {}));
