var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        /**
         * 更新有礼
         * author wxz
         * date 2020.6.1
         * @namespace NewPackCfg
         */
        var NewPackCfg = (function () {
            function NewPackCfg() {
                this.getReward = null;
                this.version = null;
            }
            NewPackCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            return NewPackCfg;
        }());
        AcCfg.NewPackCfg = NewPackCfg;
        __reflect(NewPackCfg.prototype, "Config.AcCfg.NewPackCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NewPackCfg.js.map