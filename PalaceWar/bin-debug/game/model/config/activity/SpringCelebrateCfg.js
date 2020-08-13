var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var celeBrateList = [];
        var SpringCelebrateCfg = (function () {
            function SpringCelebrateCfg() {
                this.itemListCfg = {};
                this.itemListCfg2 = [];
            }
            SpringCelebrateCfg.prototype.formatData = function (data) {
                celeBrateList = [];
                for (var key in data) {
                    data[key].key = String(key);
                    celeBrateList.push(data[key]);
                    this.itemListCfg2.push(data[key]);
                    this[key] = data[key];
                }
            };
            SpringCelebrateCfg.prototype.getItemListCfg2 = function () {
                return this.itemListCfg2;
            };
            return SpringCelebrateCfg;
        }());
        AcCfg.SpringCelebrateCfg = SpringCelebrateCfg;
        __reflect(SpringCelebrateCfg.prototype, "Config.AcCfg.SpringCelebrateCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SpringCelebrateCfg.js.map