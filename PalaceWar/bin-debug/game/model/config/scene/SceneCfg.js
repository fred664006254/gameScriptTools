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
            if (data.main) {
                cfg = getFullData(data.main);
                var languageResKey = GameData.getLanguageKey("sceneCfg"); //App.CommonUtil.getLanguageResKey();
                // if (languageResKey == "pt")
                // {
                // 	languageResKey = "en";
                // }
                if (data[languageResKey]) {
                    var spData = data[languageResKey];
                    for (var k1 in spData) //homeScene
                     {
                        if (cfg[k1] == null) {
                            cfg[k1] = spData[k1];
                        }
                        else {
                            for (var k2 in spData[k1]) // "101"
                             {
                                if (cfg[k1][k2] == null) {
                                    cfg[k1][k2] = spData[k1][k2];
                                }
                                else {
                                    for (var k3 in spData[k1][k2]) {
                                        cfg[k1][k2][k3] = spData[k1][k2][k3];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                cfg = data;
            }
        }
        SceneCfg.formatData = formatData;
        function getFullData(data) {
            for (var k1 in data) //homeScene
             {
                var fulldata = null;
                for (var k2 in data[k1]) // "101"
                 {
                    if (fulldata == null) {
                        fulldata = data[k1][k2];
                    }
                    else {
                        for (var k3 in fulldata) {
                            if (data[k1][k2][k3] == null) {
                                data[k1][k2][k3] = fulldata[k3];
                            }
                        }
                    }
                }
            }
            return data;
        }
        SceneCfg.getFullData = getFullData;
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
        function getSceneCfgBySceneName(sceneName, sceneId) {
            sceneName = App.StringUtil.firstCharToLower(sceneName);
            if (cfg[sceneName]["posCfg"]) {
                return cfg[sceneName];
            }
            else {
                if (sceneId && cfg[sceneName][sceneId]) {
                    return cfg[sceneName][sceneId];
                }
                else {
                    var allKey = Object.keys(cfg[sceneName]);
                    return cfg[sceneName][allKey[0]];
                }
            }
        }
        SceneCfg.getSceneCfgBySceneName = getSceneCfgBySceneName;
        function getAllScene() {
            var list = ["homeScene", "cityScene", "searchScene"];
            return list;
        }
        SceneCfg.getAllScene = getAllScene;
        function getSceneAllId(sceneName) {
            if (sceneName === void 0) { sceneName = "homeScene"; }
            var list = [];
            var scfg = cfg[sceneName];
            for (var key in scfg) {
                if (key == "101" || (key == "201" && !PlatformManager.checkIsRuSp()) || key == "301" || Api.switchVoApi.checkIsSceneState(key)) {
                    if (key == "203") {
                        list.splice(0, 0, key);
                    }
                    else {
                        list.push(key);
                    }
                }
            }
            return list;
        }
        SceneCfg.getSceneAllId = getSceneAllId;
        function isSceneMulti() {
            if (cfg["homeScene"]["posCfg"]) {
                return false;
            }
            else {
                var allKey = Object.keys(cfg["homeScene"]);
                return allKey.length > 1;
            }
        }
        SceneCfg.isSceneMulti = isSceneMulti;
        function getChangeKey() {
            //暂时写成wife 后续可以走配置
            return "wife";
        }
        SceneCfg.getChangeKey = getChangeKey;
        function getIsSceneScroll(sid) {
            return sid == "205" || sid == "106";
        }
        SceneCfg.getIsSceneScroll = getIsSceneScroll;
    })(SceneCfg = Config.SceneCfg || (Config.SceneCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SceneCfg.js.map