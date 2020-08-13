var Config;
(function (Config) {
    var ManageCfg;
    (function (ManageCfg) {
        /**
         * 最大的恢复时间 单位：秒
         */
        var maxTime;
        ManageCfg.supplyManNum = 0;
        //物资商人每天购买基础值
        ManageCfg.supplyManBase = 0;
        ManageCfg.supplyMan = [];
        function formatData(data) {
            for (var key in data) {
                ManageCfg[key] = data[key];
            }
        }
        ManageCfg.formatData = formatData;
        /**
         * 获取经营恢复速率
         * @param value 为所有智力+所有政治+所有魅力之和
         */
        function getManageNeedTime(value) {
            var calculateTime = Math.floor(value / 3 / 10000 * 60 + 60);
            var minNeedTime = Math.min(calculateTime, maxTime);
            return minNeedTime;
        }
        ManageCfg.getManageNeedTime = getManageNeedTime;
    })(ManageCfg = Config.ManageCfg || (Config.ManageCfg = {}));
})(Config || (Config = {}));
