var Config;
(function (Config) {
    /**
     * 仕途配置
     */
    var CareerCfg;
    (function (CareerCfg) {
        var story;
        function formatData(data) {
            story = data.story;
        }
        CareerCfg.formatData = formatData;
        function getStoryNeedLv() {
            return story;
        }
        CareerCfg.getStoryNeedLv = getStoryNeedLv;
    })(CareerCfg = Config.CareerCfg || (Config.CareerCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=CareerCfg.js.map