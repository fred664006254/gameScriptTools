var Config;
(function (Config) {
    var WxactiveshowCfg;
    (function (WxactiveshowCfg) {
        var ActiveShow = {};
        function formatData(data) {
            for (var key in data.ActiveShow) {
                ActiveShow[key] = data.ActiveShow[key];
            }
        }
        WxactiveshowCfg.formatData = formatData;
        function isActivityInCfg(aid) {
            return ActiveShow[aid] == 1;
        }
        WxactiveshowCfg.isActivityInCfg = isActivityInCfg;
    })(WxactiveshowCfg = Config.WxactiveshowCfg || (Config.WxactiveshowCfg = {}));
})(Config || (Config = {}));
