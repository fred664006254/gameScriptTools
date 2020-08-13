var Config;
(function (Config) {
    var ChildbaseCfg;
    (function (ChildbaseCfg) {
        function formatData(data) {
            for (var key in data) {
                ChildbaseCfg[key] = data[key];
            }
        }
        ChildbaseCfg.formatData = formatData;
    })(ChildbaseCfg = Config.ChildbaseCfg || (Config.ChildbaseCfg = {}));
})(Config || (Config = {}));
