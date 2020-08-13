var Config;
(function (Config) {
    /**
     * --联盟基础信息配置
     */
    var AlliancebaseCfg;
    (function (AlliancebaseCfg) {
        function formatData(data) {
            for (var key in data) {
                AlliancebaseCfg[key] = data[key];
            }
        }
        AlliancebaseCfg.formatData = formatData;
    })(AlliancebaseCfg = Config.AlliancebaseCfg || (Config.AlliancebaseCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AllianceBaseCfg.js.map