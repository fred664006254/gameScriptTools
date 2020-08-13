var Config;
(function (Config) {
    var FirstchargeCfg;
    (function (FirstchargeCfg) {
        /**
         * 门客id
         */
        var servantId;
        var needRecharge = [];
        var extraClient;
        /**
         * 奖励物品信息
         */
        var rewardStr;
        function formatData(data) {
            if (data.rewards) {
                if (data.rewards.getServant) {
                    servantId = Number(data.rewards.getServant);
                }
                if (data.rewards.r) {
                    rewardStr = data.rewards.r;
                }
                if (data.needRecharge) {
                    this.needRecharge = data.needRecharge;
                }
                if (data.extraClient) {
                    this.extraClient = data.extraClient;
                }
            }
        }
        FirstchargeCfg.formatData = formatData;
        /**
         * 获取首冲奖励数组
         */
        function getRewardItemVoList() {
            return GameData.formatRewardItem(rewardStr);
        }
        FirstchargeCfg.getRewardItemVoList = getRewardItemVoList;
        /**
         * 获取4倍的
         */
        function getneedRecharge(str) {
            if (str === void 0) { str = null; }
            if (this.needRecharge.indexOf(str) != -1) {
                return true;
            }
            else {
                return false;
            }
        }
        FirstchargeCfg.getneedRecharge = getneedRecharge;
        function getextraClient(str) {
            if (str === void 0) { str = null; }
            if (this.needRecharge[str]) {
                return true;
            }
            else {
                return false;
            }
        }
        FirstchargeCfg.getextraClient = getextraClient;
        function getextra() {
            return this.extraClient;
        }
        FirstchargeCfg.getextra = getextra;
    })(FirstchargeCfg = Config.FirstchargeCfg || (Config.FirstchargeCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=FirstchargeCfg.js.map