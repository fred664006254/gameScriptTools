var Config;
(function (Config) {
    var FirstchargeCfg;
    (function (FirstchargeCfg) {
        /**
         * 4倍门客id
         */
        var servantId;
        /**6倍门客ID */
        var servantId_2;
        var needRecharge = [];
        var extraClient;
        var extraClient_2;
        /**
         * 奖励物品信息
         */
        var rewardStr;
        var rewardStr_2;
        function formatData(data) {
            if (data.needRecharge) {
                this.needRecharge = data.needRecharge;
            }
            if (data.rewards_2) {
                if (data.rewards_2.getServant) {
                    servantId_2 = Number(data.rewards_2.getServant);
                }
                if (data.rewards_2.r) {
                    rewardStr_2 = data.rewards_2.r;
                }
                if (data.extraClient_2) {
                    this.extraClient_2 = data.extraClient_2;
                }
            }
            if (data.rewards) {
                if (data.rewards.getServant) {
                    servantId = Number(data.rewards.getServant);
                }
                if (data.rewards.r) {
                    rewardStr = data.rewards.r;
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
            if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
                return GameData.formatRewardItem(rewardStr_2);
            }
            else {
                return GameData.formatRewardItem(rewardStr);
            }
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
            if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
                return this.extraClient_2;
            }
            else {
                return this.extraClient;
            }
        }
        FirstchargeCfg.getextra = getextra;
        /**4倍奖励门客ID */
        function getRewServantD4() {
            return servantId;
        }
        FirstchargeCfg.getRewServantD4 = getRewServantD4;
        /**6倍奖励门客ID */
        function getRewServantD6() {
            return servantId_2;
        }
        FirstchargeCfg.getRewServantD6 = getRewServantD6;
    })(FirstchargeCfg = Config.FirstchargeCfg || (Config.FirstchargeCfg = {}));
})(Config || (Config = {}));
