var Config;
(function (Config) {
    var FirstrechargeCfg;
    (function (FirstrechargeCfg) {
        // 首冲奖励
        var firstRechargeReward = "";
        function formatData(data) {
            // console.log('first rec init', data)
            firstRechargeReward = data.firstReward || "";
        }
        FirstrechargeCfg.formatData = formatData;
        /**
         * 获取首冲奖励信息
         */
        function getFirstRecReward() {
            return firstRechargeReward;
        }
        FirstrechargeCfg.getFirstRecReward = getFirstRecReward;
    })(FirstrechargeCfg = Config.FirstrechargeCfg || (Config.FirstrechargeCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=FirstrechargeCfg.js.map