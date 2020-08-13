var Config;
(function (Config) {
    /**
     * 红颜配置
     */
    var WifebaseCfg;
    (function (WifebaseCfg) {
        function formatData(data) {
            for (var key in data) {
                WifebaseCfg[key] = data[key];
            }
            // wifeSkillMax = 10;
        }
        WifebaseCfg.formatData = formatData;
        function getWifeSkillMax() {
            if (Api.switchVoApi.checkOpenWifeSkillLv()) {
                return WifebaseCfg.wifeSkillMax;
            }
            return 200;
        }
        WifebaseCfg.getWifeSkillMax = getWifeSkillMax;
        function getWifeSkill2Max() {
            return WifebaseCfg.wifeSkill2Max;
        }
        WifebaseCfg.getWifeSkill2Max = getWifeSkill2Max;
    })(WifebaseCfg = Config.WifebaseCfg || (Config.WifebaseCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WifebaseCfg.js.map