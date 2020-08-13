var Config;
(function (Config) {
    var SecondchargeCfg;
    (function (SecondchargeCfg) {
        /**
         * 门客id
         */
        // let servantId:number;
        var wifeId;
        var needRecharge = [];
        var extraClient;
        /**
         * 奖励物品信息
         */
        var rewardStr;
        function formatData(data) {
            if (data.rewards) {
                if (data.rewards.getWife) {
                    this.wifeId = Number(data.rewards.getWife);
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
        SecondchargeCfg.formatData = formatData;
        /**
         * 获取首冲奖励数组
         */
        function getRewardItemVoList() {
            return GameData.formatRewardItem(rewardStr);
        }
        SecondchargeCfg.getRewardItemVoList = getRewardItemVoList;
        /**
         * 获取4倍的
         */
        function getneedRecharge(str) {
            if (str === void 0) { str = null; }
            if (!this.needRecharge) {
                return false;
            }
            if (this.needRecharge.indexOf(str) != -1) {
                return true;
            }
            else {
                return false;
            }
        }
        SecondchargeCfg.getneedRecharge = getneedRecharge;
        function getextraClient(str) {
            if (str === void 0) { str = null; }
            if (!this.needRecharge) {
                return false;
            }
            if (this.needRecharge[str]) {
                return true;
            }
            else {
                return false;
            }
        }
        SecondchargeCfg.getextraClient = getextraClient;
        function getWifeId() {
            return this.wifeId;
        }
        SecondchargeCfg.getWifeId = getWifeId;
        function getextra() {
            return this.extraClient;
        }
        SecondchargeCfg.getextra = getextra;
    })(SecondchargeCfg = Config.SecondchargeCfg || (Config.SecondchargeCfg = {}));
})(Config || (Config = {}));
