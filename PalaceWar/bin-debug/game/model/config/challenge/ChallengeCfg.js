/**
 * 关卡配置类
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeCfg
 */
var ChallengeCfg;
(function (ChallengeCfg) {
    function getChallengeCfgById(id) {
        if (GameConfig.config.challengeCfg && GameConfig.config.challengeCfg[id.toString()]) {
            return GameConfig.config.challengeCfg[id.toString()];
        }
        return null;
    }
    ChallengeCfg.getChallengeCfgById = getChallengeCfgById;
    /**
     * 关卡总数
     */
    function getChallengeTotalPass() {
        var opened = Api.switchVoApi.getChallengeOpen();
        if (opened > 0) {
            return opened * 41;
        }
        else {
            return Object.keys(GameConfig.config.challengeCfg).length;
        }
    }
    ChallengeCfg.getChallengeTotalPass = getChallengeTotalPass;
    function getMaxStoryBigId() {
        var bigId = 0;
        var hasStory = false;
        do {
            bigId++;
            hasStory = false;
            var startIdx = 1 + (bigId - 1) * 41;
            var endIdx = bigId * 41;
            for (var i = startIdx; i <= endIdx; i++) {
                var cfg = getChallengeCfgById(i);
                if (cfg.dialogue) {
                    hasStory = true;
                    break;
                }
            }
        } while (hasStory);
        var opened = Api.switchVoApi.getChallengeOpen();
        if (opened > 0 && bigId > opened) {
            bigId = opened;
        }
        return bigId;
    }
    ChallengeCfg.getMaxStoryBigId = getMaxStoryBigId;
})(ChallengeCfg || (ChallengeCfg = {}));
//# sourceMappingURL=ChallengeCfg.js.map