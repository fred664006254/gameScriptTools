var Config;
(function (Config) {
    var MeetbeautyCfg;
    (function (MeetbeautyCfg) {
        /**重置时间 */
        var resetDay = 0;
        /**佳人id数组 */
        var wifeIdList = [];
        /**佳人needpower数组 */
        var wifeNeedPowerList = [];
        /**
         * 初始化数据
         */
        function formatData(data) {
            var tempList = [];
            for (var key in data) {
                if (key == "reset") {
                    resetDay = data[key];
                }
                else {
                    tempList.push(data[key]);
                    // wifeIdList.push(data[key].wifeId);
                    // wifeNeedPowerList.push(data[key].needPower);
                }
            }
            tempList.sort(function (a, b) {
                return a.needPower - b.needPower;
            });
            for (var i = 0; i < tempList.length; i++) {
                wifeIdList.push(tempList[i].wifeId);
                wifeNeedPowerList.push(tempList[i].needPower);
            }
        }
        MeetbeautyCfg.formatData = formatData;
        function getResetDay() {
            return resetDay;
        }
        MeetbeautyCfg.getResetDay = getResetDay;
        function getWifeIdList() {
            return wifeIdList;
        }
        MeetbeautyCfg.getWifeIdList = getWifeIdList;
        function getNeedPowerList() {
            return wifeNeedPowerList;
        }
        MeetbeautyCfg.getNeedPowerList = getNeedPowerList;
        //获取当前权势在结识佳人的第几步
        function getNowPowerStep() {
            var nowPower = Api.playerVoApi.getPlayerPower();
            var powerIdx = 0;
            for (var i = 0; i < wifeNeedPowerList.length; i++) {
                if (nowPower > wifeNeedPowerList[i]) {
                    powerIdx++;
                }
            }
            return powerIdx;
        }
        MeetbeautyCfg.getNowPowerStep = getNowPowerStep;
    })(MeetbeautyCfg = Config.MeetbeautyCfg || (Config.MeetbeautyCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=MeetbeautyCfg.js.map