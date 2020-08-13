var Config;
(function (Config) {
    /**
     * 场景配置类
     * date 2018/4/2
     * @class ShopCfg
     */
    var SceneCfg;
    (function (SceneCfg) {
        var cfg = {};
        function formatData(data) {
            cfg = data;
        }
        SceneCfg.formatData = formatData;
        //如果sceneCfg中配置了npcnameRect 则用配置的，如果没有配置 使用默认的
        function getNpcnameRect() {
            if (cfg["npcnameRect"]) {
                return cfg["npcnameRect"];
            }
            else {
                return null;
            }
        }
        SceneCfg.getNpcnameRect = getNpcnameRect;
        function getSceneCfgBySceneName(sceneName) {
            sceneName = App.StringUtil.firstCharToLower(sceneName);
            if (sceneName == "cityScene" && Api.switchVoApi.checkScrollCityScene()) {
                return cfg["cityScene_scroll"];
            }
            else {
                return cfg[sceneName];
            }
        }
        SceneCfg.getSceneCfgBySceneName = getSceneCfgBySceneName;
    })(SceneCfg = Config.SceneCfg || (Config.SceneCfg = {}));
})(Config || (Config = {}));
