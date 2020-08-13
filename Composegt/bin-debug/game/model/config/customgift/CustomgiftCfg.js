var Config;
(function (Config) {
    var CustomgiftCfg;
    (function (CustomgiftCfg) {
        function formatData(data) {
            for (var key in data) {
                CustomgiftCfg[key] = data[key];
            }
        }
        CustomgiftCfg.formatData = formatData;
    })(CustomgiftCfg = Config.CustomgiftCfg || (Config.CustomgiftCfg = {}));
})(Config || (Config = {}));
