var Config;
(function (Config) {
    /**
     * --联盟基础信息配置
     */
    var AlliancebaseCfg;
    (function (AlliancebaseCfg) {
        //开启无限副本所需帮会等级
        AlliancebaseCfg.infinityNeedLv = 6;
        //开启无限副本所扣除帮会财富
        AlliancebaseCfg.infinityNeedAsset = 40000;
        //无限副本的伤害转为贡献值的系数：（贡献值 = 伤害值 / factorDamage ）
        AlliancebaseCfg.factorDamage = 4000000;
        //无限副本的伤害转为贡献值的上限值：
        AlliancebaseCfg.maxAttribution = 200;
        //无限副本的持续时间（秒）：
        AlliancebaseCfg.infinityDuration = 84600;
        function formatData(data) {
            for (var key in data) {
                AlliancebaseCfg[key] = data[key];
            }
        }
        AlliancebaseCfg.formatData = formatData;
    })(AlliancebaseCfg = Config.AlliancebaseCfg || (Config.AlliancebaseCfg = {}));
})(Config || (Config = {}));
