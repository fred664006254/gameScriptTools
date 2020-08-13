/**
 * 关卡配置类
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeCfg
 */
var ChallengeCfg;
(function (ChallengeCfg) {
    var unlockCfg = {};
    function getChallengeCfgById(id) {
        if (GameConfig.config.challengeCfg && GameConfig.config.challengeCfg[id.toString()]) {
            return GameConfig.config.challengeCfg[id.toString()];
        }
        return null;
    }
    ChallengeCfg.getChallengeCfgById = getChallengeCfgById;
    function formatData(data) {
        var keys = Object.keys(data);
        keys.sort(function (a, b) { return Number(a) - Number(b); });
        var l = keys.length;
        var personLimit = 0;
        for (var i = 0; i < l; i++) {
            var cid = Number(keys[i]);
            var itemCfg = getChallengeCfgById(cid);
            if (itemCfg.personLimit) {
                unlockCfg[itemCfg.personLimit] = cid;
                personLimit = itemCfg.personLimit;
            }
            else {
                itemCfg.personLimit = personLimit;
            }
        }
    }
    ChallengeCfg.formatData = formatData;
    /**
     * 关卡总数
     */
    function getChallengeTotalPass() {
        return Object.keys(GameConfig.config.challengeCfg).length;
    }
    ChallengeCfg.getChallengeTotalPass = getChallengeTotalPass;
    function getCurMiddleLeftCfgList() {
        var leftCfgList = [];
        var curId = Api.challengeVoApi.getCurChannelId();
        var middleId = Api.challengeVoApi.getCurMiddleChannelId();
        for (var i = 0; i < 10; i++) {
            var tmpCfg = GameConfig.config.challengeCfg[(curId + i).toString()];
            if (tmpCfg.type == 1 && Api.challengeVoApi.getMiddleChannelById((curId - 1 + i)) == middleId) {
                leftCfgList.push(tmpCfg);
            }
        }
        console.log(leftCfgList);
        return leftCfgList;
    }
    ChallengeCfg.getCurMiddleLeftCfgList = getCurMiddleLeftCfgList;
    /**
     * 根据关卡章节获取名字
     * @param bid
     */
    function getLocalStrByBigId(bid) {
        return LanguageManager.getlocal("challengeTitle" + bid);
    }
    ChallengeCfg.getLocalStrByBigId = getLocalStrByBigId;
})(ChallengeCfg || (ChallengeCfg = {}));
