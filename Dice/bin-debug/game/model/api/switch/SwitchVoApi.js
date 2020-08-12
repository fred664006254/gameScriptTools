var Api;
(function (Api) {
    var SwitchVoApi;
    (function (SwitchVoApi) {
        var allSwitch = null;
        function formatData(data) {
            if (data) {
                allSwitch = data;
            }
        }
        SwitchVoApi.formatData = formatData;
        function getSwitchStatus(id) {
            var status = allSwitch[id];
            return status && status == 1;
        }
        SwitchVoApi.getSwitchStatus = getSwitchStatus;
        function getADSwitchStatus() {
            var status = allSwitch["openAdvertise"];
            return status && status == 1;
        }
        SwitchVoApi.getADSwitchStatus = getADSwitchStatus;
        function getFairarenStatus() {
            var status = allSwitch["openFairArena"];
            return status && status == 1;
        }
        SwitchVoApi.getFairarenStatus = getFairarenStatus;
        /**
         * 检查是否开启每日签到
         */
        function checkOpenSign() {
            var status = allSwitch["openSign"];
            return status && status == 1;
        }
        SwitchVoApi.checkOpenSign = checkOpenSign;
        /**
         * 检查是否开启首冲
         */
        function checkOpenFirstRecharge() {
            var status = allSwitch["openFirstRecharge"];
            return GameData.isWxShenhe ? false : status && status == 1;
        }
        SwitchVoApi.checkOpenFirstRecharge = checkOpenFirstRecharge;
        /**
         * 检查是否开启邀请好友
         */
        function checkOpenInviteFriend() {
            var status = allSwitch["openInviteFriend"];
            return status && status == 1;
        }
        SwitchVoApi.checkOpenInviteFriend = checkOpenInviteFriend;
        /**
         * 是否开成就
         */
        function checkAchievement() {
            var status = allSwitch["openAchievement"];
            return status && status == 1;
        }
        SwitchVoApi.checkAchievement = checkAchievement;
        function checkWxShenhe() {
            return GameData.isWxShenhe;
        }
        SwitchVoApi.checkWxShenhe = checkWxShenhe;
        function dispose() {
            allSwitch = null;
        }
        SwitchVoApi.dispose = dispose;
    })(SwitchVoApi = Api.SwitchVoApi || (Api.SwitchVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=SwitchVoApi.js.map