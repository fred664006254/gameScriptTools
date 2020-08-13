var Config;
(function (Config) {
    /** 分享奖励配置 */
    var SharerewardCfg;
    (function (SharerewardCfg) {
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        SharerewardCfg.formatData = formatData;
    })(SharerewardCfg = Config.SharerewardCfg || (Config.SharerewardCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SharerewardCfg.js.map