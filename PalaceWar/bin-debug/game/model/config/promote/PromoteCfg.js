var Config;
(function (Config) {
    var PromoteCfg;
    (function (PromoteCfg) {
        function formatData(data) {
            for (var key in data) {
                PromoteCfg[key] = data[key];
            }
        }
        PromoteCfg.formatData = formatData;
    })(PromoteCfg = Config.PromoteCfg || (Config.PromoteCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=PromoteCfg.js.map