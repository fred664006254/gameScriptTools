var Config;
(function (Config) {
    /**
     * 皮肤配置
     */
    var WifechatCfg;
    (function (WifechatCfg) {
        /**每次重置每个剧情消耗*/
        WifechatCfg.resetCost = "";
        /**红颜剧情，所有红颜用一套*/
        WifechatCfg.conversation = null;
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        WifechatCfg.formatData = formatData;
    })(WifechatCfg = Config.WifechatCfg || (Config.WifechatCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WifeChatCfg.js.map