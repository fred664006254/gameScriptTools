var Api;
(function (Api) {
    var AchievementVoApi;
    (function (AchievementVoApi) {
        var achievements = null;
        /**领取奖励的类型 */
        AchievementVoApi.rewardType = 0;
        function formatData(data) {
            if (!achievements) {
                achievements = new AchievementVo();
            }
            achievements.initData(data);
        }
        AchievementVoApi.formatData = formatData;
        /**获取成就列表数组，经过排序 */
        function getAchList() {
            var canrew = [];
            var cannot = [];
            var finish = [];
            var keys = Object.keys(achievements.info);
            for (var index = 0; index < keys.length; index++) {
                var item = keys[index];
                var achitem = achievements.info[item];
                if (achitem.f == 1) {
                    canrew.push(item);
                }
                else if (achitem.f == 2) {
                    finish.push(item);
                }
                else {
                    cannot.push(item);
                }
            }
            return [].concat(canrew, cannot, finish);
        }
        AchievementVoApi.getAchList = getAchList;
        /**获取可以领取的数量 */
        function getAchCanRewardNum() {
            var num = 0;
            if (!Api.SwitchVoApi.checkAchievement()) {
                return 0;
            }
            for (var key in achievements.info) {
                if (achievements.info.hasOwnProperty(key)) {
                    var element = achievements.info[key];
                    if (element.f === 1) {
                        num++;
                    }
                }
            }
            return num;
        }
        AchievementVoApi.getAchCanRewardNum = getAchCanRewardNum;
        function getAchinfoByID(id) {
            var achinfo = achievements.info[id];
            return achinfo;
        }
        AchievementVoApi.getAchinfoByID = getAchinfoByID;
        /**获取某个成就阶段 */
        function getStageByID(id) {
            var achinfo = achievements.info[id];
            var stage = 0;
            if (achinfo && achinfo.stage) {
                stage = achinfo.stage;
            }
            return stage;
        }
        AchievementVoApi.getStageByID = getStageByID;
        function dispose() {
            achievements = null;
            AchievementVoApi.rewardType = 0;
        }
        AchievementVoApi.dispose = dispose;
    })(AchievementVoApi = Api.AchievementVoApi || (Api.AchievementVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=AchievementVoApi.js.map