var Config;
(function (Config) {
    /**
     * 寻访基础配置
     */
    var SearchbaseCfg;
    (function (SearchbaseCfg) {
        function formatData(data) {
            for (var key in data) {
                SearchbaseCfg[key] = data[key];
            }
        }
        SearchbaseCfg.formatData = formatData;
        function getGemCostByLuck(curLuck) {
            var gemCost = 0;
            if (SearchbaseCfg.gemCostList) {
                for (var key in SearchbaseCfg.gemCostList) {
                    if (SearchbaseCfg.gemCostList[key].low <= curLuck && SearchbaseCfg.gemCostList[key].up >= curLuck) {
                        gemCost = SearchbaseCfg.gemCostList[key].gemCost;
                        break;
                    }
                }
            }
            return gemCost;
        }
        SearchbaseCfg.getGemCostByLuck = getGemCostByLuck;
    })(SearchbaseCfg = Config.SearchbaseCfg || (Config.SearchbaseCfg = {}));
})(Config || (Config = {}));
