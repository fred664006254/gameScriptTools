var Config;
(function (Config) {
    var ServantBaseCfg;
    (function (ServantBaseCfg) {
        var newObject;
        function getServantLvList() {
            var servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
            if (!Api.switchVoApi.checkOpenServantLevel450() && Object.keys(servantLvList).length > 7) {
                if (!newObject) {
                    newObject = {};
                    for (var i = 0; i <= 6; i++) {
                        newObject[String(i)] = servantLvList[String(i)];
                    }
                }
                return newObject;
            }
            else {
                return servantLvList;
            }
        }
        ServantBaseCfg.getServantLvList = getServantLvList;
        function getDanShuID() {
            return GameConfig.config.servantbaseCfg.danShuID;
        }
        ServantBaseCfg.getDanShuID = getDanShuID;
        function commonMaxClv() {
            return 6;
        }
        ServantBaseCfg.commonMaxClv = commonMaxClv;
        function commonMaxLv() {
            return 400;
        }
        ServantBaseCfg.commonMaxLv = commonMaxLv;
        function getLvUpNeedItemNum(lv) {
            var idx = lv - commonMaxLv();
            return GameConfig.config.servantbaseCfg.danShuCost[idx];
        }
        ServantBaseCfg.getLvUpNeedItemNum = getLvUpNeedItemNum;
    })(ServantBaseCfg = Config.ServantBaseCfg || (Config.ServantBaseCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ServantBaseCfg.js.map