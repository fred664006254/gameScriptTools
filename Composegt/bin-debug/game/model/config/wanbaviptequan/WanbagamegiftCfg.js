var Config;
(function (Config) {
    /**
     * 玩吧Vip特权礼包配置
     */
    var WanbagamegiftCfg;
    (function (WanbagamegiftCfg) {
        var cfg = {};
        function formatData(data) {
            for (var key in data) {
                cfg[key] = data[key];
            }
        }
        WanbagamegiftCfg.formatData = formatData;
        /** 获取vip特权礼包奖励 */
        function getVipReward(vipLevel) {
            return cfg[vipLevel];
        }
        WanbagamegiftCfg.getVipReward = getVipReward;
    })(WanbagamegiftCfg = Config.WanbagamegiftCfg || (Config.WanbagamegiftCfg = {}));
})(Config || (Config = {}));
