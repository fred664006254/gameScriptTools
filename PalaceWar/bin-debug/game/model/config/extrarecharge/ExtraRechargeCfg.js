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
     * 第三方充值配置
     */
    var ExtraRechargeCfg;
    (function (ExtraRechargeCfg) {
        var normalRechargeListCfg;
        var rechargeListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!rechargeListCfg.hasOwnProperty(String(key))) {
                    rechargeListCfg[String(key)] = new ExtraRechargeItemCfg();
                }
                itemCfg = rechargeListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        ExtraRechargeCfg.formatData = formatData;
        /**
         * 获取普通充值档
         */
        function getNormalRechargeCfg() {
            if (normalRechargeListCfg == null) {
                normalRechargeListCfg = [];
                for (var key in rechargeListCfg) {
                    var itemCfg = rechargeListCfg[key];
                    var gemCost = Number(itemCfg.gemCost);
                    if (itemCfg.isAndroidOnly) {
                        normalRechargeListCfg.push(itemCfg);
                    }
                }
                normalRechargeListCfg.sort(function (a, b) {
                    return a.sortId < b.sortId ? -1 : 1;
                });
            }
            return normalRechargeListCfg;
        }
        ExtraRechargeCfg.getNormalRechargeCfg = getNormalRechargeCfg;
    })(ExtraRechargeCfg = Config.ExtraRechargeCfg || (Config.ExtraRechargeCfg = {}));
    var ExtraRechargeItemCfg = (function (_super) {
        __extends(ExtraRechargeItemCfg, _super);
        function ExtraRechargeItemCfg() {
            return _super.call(this) || this;
        }
        return ExtraRechargeItemCfg;
    }(BaseItemCfg));
    Config.ExtraRechargeItemCfg = ExtraRechargeItemCfg;
    __reflect(ExtraRechargeItemCfg.prototype, "Config.ExtraRechargeItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=ExtraRechargeCfg.js.map