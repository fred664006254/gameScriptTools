/**
 * 关卡配置类
 * author shaoliang
 * date 2017/10/23
 * @class ChallengestoryCfg
 */
var Config;
(function (Config) {
    var ChallengestoryCfg;
    (function (ChallengestoryCfg) {
        function getChallengestoryCfgById(id) {
            if (GameConfig.config.challengestoryCfg && GameConfig.config.challengestoryCfg[id]) {
                return GameConfig.config.challengestoryCfg[id];
            }
            return null;
        }
        ChallengestoryCfg.getChallengestoryCfgById = getChallengestoryCfgById;
    })(ChallengestoryCfg = Config.ChallengestoryCfg || (Config.ChallengestoryCfg = {}));
})(Config || (Config = {}));
