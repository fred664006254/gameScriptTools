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
    var AcCfg;
    (function (AcCfg) {
        var TotalDayRechargeCfg = (function () {
            function TotalDayRechargeCfg() {
                this.itemListCfg = {};
                this.lastKey = null;
            }
            TotalDayRechargeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    if (!this.itemListCfg.hasOwnProperty(String(key))) {
                        this.itemListCfg[String(key)] = new TotalDayRechargeItemCfg();
                    }
                    itemCfg = this.itemListCfg[String(key)];
                    itemCfg.initData(data[key]);
                    itemCfg.id = String(key);
                    this.lastKey = key;
                }
            };
            TotalDayRechargeCfg.prototype.getList = function () {
                return this.itemListCfg;
            };
            // public getRechargeItemById(id:string)
            // {
            // 	return this.itemListCfg[id];
            // }
            /**
         * 对最后一个奖励的处理
         * @param id 当前的ID
         * @param level 充值最后一天的ID
         */
            TotalDayRechargeCfg.prototype.getRechargeItemById = function (id, level) {
                if (level) {
                    if (id == level) {
                        this.itemListCfg[id].showGem = this.itemListCfg[this.lastKey].showGem;
                        this.itemListCfg[id].reward = this.itemListCfg[this.lastKey].reward;
                        return this.itemListCfg[id];
                    }
                    else if (Number(id) > Number(level)) {
                        return null;
                    }
                    else {
                        return this.itemListCfg[id];
                    }
                }
                else {
                    return this.itemListCfg[id];
                }
            };
            return TotalDayRechargeCfg;
        }());
        AcCfg.TotalDayRechargeCfg = TotalDayRechargeCfg;
        __reflect(TotalDayRechargeCfg.prototype, "Config.AcCfg.TotalDayRechargeCfg");
        var TotalDayRechargeItemCfg = (function (_super) {
            __extends(TotalDayRechargeItemCfg, _super);
            function TotalDayRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TotalDayRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.TotalDayRechargeItemCfg = TotalDayRechargeItemCfg;
        __reflect(TotalDayRechargeItemCfg.prototype, "Config.AcCfg.TotalDayRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
