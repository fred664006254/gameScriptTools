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
    var DailyluckCfg;
    (function (DailyluckCfg) {
        var dailyLuckList = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!dailyLuckList.hasOwnProperty(String(key))) {
                    dailyLuckList[String(key)] = new DailyluckItemCfg();
                }
                itemCfg = dailyLuckList[String(key)];
                itemCfg.rate = data[key][0];
                itemCfg.times = data[key][1];
                itemCfg.name = String(key);
            }
        }
        DailyluckCfg.formatData = formatData;
        function getManageTimes() {
            return getDailylucyCfgByName("manage").times;
        }
        DailyluckCfg.getManageTimes = getManageTimes;
        function getDailylucyCfgByName(name) {
            return dailyLuckList[name];
        }
        DailyluckCfg.getDailylucyCfgByName = getDailylucyCfgByName;
        function getLuckIdList() {
            var dailyLuckArray = [];
            for (var key in dailyLuckList) {
                dailyLuckArray.push(dailyLuckList[key]);
            }
            return dailyLuckArray;
        }
        DailyluckCfg.getLuckIdList = getLuckIdList;
    })(DailyluckCfg = Config.DailyluckCfg || (Config.DailyluckCfg = {}));
    var DailyluckItemCfg = (function (_super) {
        __extends(DailyluckItemCfg, _super);
        function DailyluckItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DailyluckItemCfg;
    }(BaseItemCfg));
    __reflect(DailyluckItemCfg.prototype, "DailyluckItemCfg");
})(Config || (Config = {}));
