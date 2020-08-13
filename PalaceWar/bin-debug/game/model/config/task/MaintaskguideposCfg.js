var Config;
(function (Config) {
    var MaintaskguideposCfg;
    (function (MaintaskguideposCfg) {
        MaintaskguideposCfg.poscfg = {};
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        MaintaskguideposCfg.formatData = formatData;
    })(MaintaskguideposCfg = Config.MaintaskguideposCfg || (Config.MaintaskguideposCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=MaintaskguideposCfg.js.map