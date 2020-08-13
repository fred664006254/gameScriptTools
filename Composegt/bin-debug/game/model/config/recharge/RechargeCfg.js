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
     * 充值配置
     */
    var RechargeCfg;
    (function (RechargeCfg) {
        var moneyNameCfg = {
            wanba: { QZ1: "星币", SQ1: "星币", QZ2: "星币", SQ2: "秀币" }
        };
        function getMoneyName() {
            var moneyName;
            if (PlatformManager.checkIsWanbaSp()) {
                try {
                    var data = window["OPEN_DATA"];
                    var platform = data.platform;
                    var app = data.qua.app;
                    moneyName = moneyNameCfg.wanba[app + platform];
                }
                catch (e) {
                }
            }
            return moneyName;
        }
        RechargeCfg.getMoneyName = getMoneyName;
        function getAllProductid() {
            var idArr = [];
            var orderidArr = [];
            try {
                for (var key in rechargeListCfg) {
                    var itemCfg = rechargeListCfg[key];
                    if (itemCfg.orderid) {
                        orderidArr.push(itemCfg.orderid);
                    }
                    else {
                        idArr.push(itemCfg.id);
                    }
                }
            }
            catch (e) {
            }
            if (orderidArr && orderidArr.length > 0) {
                return orderidArr;
            }
            return idArr;
        }
        RechargeCfg.getAllProductid = getAllProductid;
        var normalRechargeListCfg;
        var rechargeListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!rechargeListCfg.hasOwnProperty(String(key))) {
                    rechargeListCfg[String(key)] = new RechargeItemCfg();
                }
                itemCfg = rechargeListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        RechargeCfg.formatData = formatData;
        /**
         * 获取普通充值档
         */
        function getNormalRechargeCfg() {
            if (normalRechargeListCfg == null) {
                normalRechargeListCfg = [];
                for (var key in rechargeListCfg) {
                    var itemCfg = rechargeListCfg[key];
                    var gemCost = Number(itemCfg.gemCost);
                    if (PlatformManager.checkIs37WdShenheSp() && (key == "g7" || key == "g8")) {
                        itemCfg.sortId = key == "g7" ? 9 : 10;
                    }
                    if (itemCfg.sortId) {
                        normalRechargeListCfg.push(itemCfg);
                    }
                    if (Api.switchVoApi.checkOpenAuditFile() && key == "g11" && PlatformManager.checkIsJPSp()) {
                        normalRechargeListCfg.push(itemCfg);
                    }
                }
                normalRechargeListCfg.sort(function (a, b) {
                    return a.sortId < b.sortId ? 1 : -1;
                });
            }
            return normalRechargeListCfg;
        }
        RechargeCfg.getNormalRechargeCfg = getNormalRechargeCfg;
        /**
         * 获取37审核充值档
         */
        function get37wdShenHeRechargeCfg() {
            if (normalRechargeListCfg == null) {
                normalRechargeListCfg = [];
                for (var key in rechargeListCfg) {
                    var itemCfg = rechargeListCfg[key];
                    var gemCost = Number(itemCfg.gemCost);
                    if (PlatformManager.checkIs37WdShenheSp() && (key == "g7" || key == "g8")) {
                        itemCfg.sortId = key == "g7" ? 9 : 10;
                    }
                    if (key == "g9" || key == "g10" || key == "g12" || key == "g13" || key == "g14" || key == "g15"
                        || key == "g17"
                        || key == "g18" || key == "g19" || key == "g20" || key == "g21" || key == "g22" || key == "g23" || key == "g24"
                        || key == "g25" || key == "g26" || key == "g27" || key == "g28") {
                        continue;
                    }
                    normalRechargeListCfg.push(itemCfg);
                }
                normalRechargeListCfg.sort(function (a, b) {
                    return a.sortId < b.sortId ? 1 : -1;
                });
            }
            return normalRechargeListCfg;
        }
        RechargeCfg.get37wdShenHeRechargeCfg = get37wdShenHeRechargeCfg;
        /**
         * 根据key取对应档位的配置
         * @param key
         */
        function getRechargeItemCfgByKey(id) {
            for (var key in rechargeListCfg) {
                var itemCfg = rechargeListCfg[key];
                if (itemCfg.id == id) {
                    return itemCfg;
                }
            }
            return null;
        }
        RechargeCfg.getRechargeItemCfgByKey = getRechargeItemCfgByKey;
        /**
         * 获取第一个充值宝箱
         */
        function rewardList1() {
            // let rewardStr = rechargeListCfg["g9"].getReward;
            var cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
            var rewards = "1_1_" + cfg11.gemCost + "|" + cfg11.getReward;
            return GameData.formatRewardItem(rewards);
        }
        RechargeCfg.rewardList1 = rewardList1;
        /**
         * 获取第二个充值宝箱
         */
        function rewardList2() {
            // let rewardStr = rechargeListCfg["g10"].getReward;
            var cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g10");
            var rewards = "1_1_" + cfg11.gemCost + "|" + cfg11.getReward;
            return GameData.formatRewardItem(rewards);
        }
        RechargeCfg.rewardList2 = rewardList2;
    })(RechargeCfg = Config.RechargeCfg || (Config.RechargeCfg = {}));
    var RechargeItemCfg = (function (_super) {
        __extends(RechargeItemCfg, _super);
        function RechargeItemCfg() {
            return _super.call(this) || this;
        }
        return RechargeItemCfg;
    }(BaseItemCfg));
    Config.RechargeItemCfg = RechargeItemCfg;
    __reflect(RechargeItemCfg.prototype, "Config.RechargeItemCfg");
})(Config || (Config = {}));
