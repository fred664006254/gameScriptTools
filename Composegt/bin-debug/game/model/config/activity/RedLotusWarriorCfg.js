var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var RedLotusWarriorCfg = (function () {
            function RedLotusWarriorCfg() {
                this.cost = null;
                this.helmetItem = null;
                this.helmetItemId = null;
                this.helmetRwardNum = null;
                this.attackloop = null;
                this.criticaltime = null;
                this.criticaldamageAdd = null;
                this.helmetItemNum = null;
                this.zhentianSkinId = null;
                this.sevantID = null;
                this.helmetReward = null;
                this.trophyPool = null;
                this.helmetNum = null;
            }
            //解析数据
            RedLotusWarriorCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
            };
            return RedLotusWarriorCfg;
        }());
        AcCfg.RedLotusWarriorCfg = RedLotusWarriorCfg;
        __reflect(RedLotusWarriorCfg.prototype, "Config.AcCfg.RedLotusWarriorCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
