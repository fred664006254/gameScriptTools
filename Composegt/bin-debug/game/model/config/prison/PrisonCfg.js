var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Config;
(function (Config) {
    /**
     * 牢房配置类
     */
    var PrisonCfg;
    (function (PrisonCfg) {
        var prisonItemList = {};
        function formatData(data) {
            for (var key in data) {
                var prisonItemCfg = void 0;
                if (!prisonItemList.hasOwnProperty(String(key))) {
                    prisonItemList[String(key)] = new PrisonItemCfg();
                }
                prisonItemCfg = prisonItemList[String(key)];
                prisonItemCfg.initData(data[key]);
                this.prisonItemCfg = prisonItemCfg;
            }
        }
        PrisonCfg.formatData = formatData;
        function getPrisonItemCfgList() {
            var arr = new Array();
            for (var key in prisonItemList) {
                arr.push(prisonItemList[key]);
            }
            return arr;
        }
        PrisonCfg.getPrisonItemCfgList = getPrisonItemCfgList;
        //根据ID 返回当前配置
        function getIndexPrisonItemCfg(index) {
            if (index === void 0) { index = 0; }
            for (var key in prisonItemList) {
                if (key == "" + index) {
                    return prisonItemList[key];
                }
            }
            return null;
        }
        PrisonCfg.getIndexPrisonItemCfg = getIndexPrisonItemCfg;
        var PrisonItemCfg = (function (_super) {
            __extends(PrisonItemCfg, _super);
            function PrisonItemCfg() {
                // 	-unlock  解锁条件  通关某一关卡
                //   --cost  每次惩罚所需声望
                //   --num  该囚犯的可惩罚次数  num为空时，囚犯可无限惩罚
                //   --base  资源基础值  在获得银两、粮草、士兵时，用 base + 属性 * 倍率
                //   --drop  每次惩罚可能获得的奖励  其中有资源_倍率的情况
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.unlock = 0;
                _this.cost = 0;
                _this.num = 0;
                _this.drop = [];
                return _this;
            }
            return PrisonItemCfg;
        }(BaseItemCfg));
        PrisonCfg.PrisonItemCfg = PrisonItemCfg;
        __reflect(PrisonItemCfg.prototype, "Config.PrisonCfg.PrisonItemCfg");
    })(PrisonCfg = Config.PrisonCfg || (Config.PrisonCfg = {}));
})(Config || (Config = {}));
