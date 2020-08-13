var Config;
(function (Config) {
    /**
     * 签到配置类
     * author dmj
     * date 2017/11/04
     * @class ArrivalCfg
     */
    var ArrivalCfg;
    (function (ArrivalCfg) {
        var arrivaceList = {};
        function formatData(data) {
            for (var key in data.rewards) {
                if (!arrivaceList.hasOwnProperty(String(key))) {
                    arrivaceList[String(key)] = data.rewards[key];
                }
            }
        }
        ArrivalCfg.formatData = formatData;
        /**
         * 根据索引获取奖励物品
         * @param index
         */
        function getContentByIndex(index) {
            if (arrivaceList.hasOwnProperty(String(index))) {
                return arrivaceList[String(index)];
            }
            return "";
        }
        ArrivalCfg.getContentByIndex = getContentByIndex;
    })(ArrivalCfg = Config.ArrivalCfg || (Config.ArrivalCfg = {}));
})(Config || (Config = {}));
