var Config;
(function (Config) {
    var MasterCfg;
    (function (MasterCfg) {
        /**
         * 官职限制，官职达到 X 品及以上玩家，才能使用小师爷功能
         */
        MasterCfg.levelLimit = 0;
        /**
        * 使用间隔（单位：秒）
        */
        MasterCfg.turnTime = 0;
        function formatData(data) {
            for (var key in data) {
                MasterCfg[key] = data[key];
            }
        }
        MasterCfg.formatData = formatData;
    })(MasterCfg = Config.MasterCfg || (Config.MasterCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=MasterCfg.js.map