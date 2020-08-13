var Config;
(function (Config) {
    // 邀请有礼配置
    var InvitefriendCfg;
    (function (InvitefriendCfg) {
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        InvitefriendCfg.formatData = formatData;
    })(InvitefriendCfg = Config.InvitefriendCfg || (Config.InvitefriendCfg = {}));
})(Config || (Config = {}));
