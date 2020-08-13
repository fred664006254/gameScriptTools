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
     * 省亲配置
     */
    var BanishCfg;
    (function (BanishCfg) {
        /**
         * 解锁功能所需红颜数量
         */
        var numNeed;
        /**
         * 省亲后红颜需大于limitation。否则省亲失败
         */
        var limitation;
        /**
         * 省亲时间。单位：天
         */
        var exileTime;
        /**
         * 提前召回费用。天数*单位元宝
         */
        var unitGem;
        var seatList = {};
        function formatData(data) {
            numNeed = data.numNeed;
            limitation = data.limitation;
            exileTime = data.exileTime;
            unitGem = data.unitGem;
            for (var key in data.seat) {
                var itemCfg = void 0;
                if (!seatList.hasOwnProperty(String(key))) {
                    seatList[String(key)] = new BanishSeatCfg();
                }
                itemCfg = seatList[String(key)];
                itemCfg.initData(data.seat[key]);
                itemCfg.id = String(key);
            }
        }
        BanishCfg.formatData = formatData;
        function getNumNeed() {
            return numNeed;
        }
        BanishCfg.getNumNeed = getNumNeed;
        function getLimitation() {
            return limitation;
        }
        BanishCfg.getLimitation = getLimitation;
        function getExileTime() {
            return exileTime * 86400;
        }
        BanishCfg.getExileTime = getExileTime;
        function getExileTime2() {
            return exileTime;
        }
        BanishCfg.getExileTime2 = getExileTime2;
        function getUnitGem() {
            return unitGem;
        }
        BanishCfg.getUnitGem = getUnitGem;
        function getMaxUnit() {
            return Object.keys(seatList).length;
        }
        BanishCfg.getMaxUnit = getMaxUnit;
        function getSeatCost(key) {
            return seatList[key].unlockGem;
        }
        BanishCfg.getSeatCost = getSeatCost;
        function getDefaultSeatNum() {
            var num = 0;
            for (var k in seatList) {
                if (seatList[k] && seatList[k].initial == 1) {
                    num++;
                }
            }
            return num;
        }
        BanishCfg.getDefaultSeatNum = getDefaultSeatNum;
    })(BanishCfg = Config.BanishCfg || (Config.BanishCfg = {}));
    var BanishSeatCfg = (function (_super) {
        __extends(BanishSeatCfg, _super);
        function BanishSeatCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BanishSeatCfg;
    }(BaseItemCfg));
    Config.BanishSeatCfg = BanishSeatCfg;
    __reflect(BanishSeatCfg.prototype, "Config.BanishSeatCfg");
})(Config || (Config = {}));
//# sourceMappingURL=BanishCfg.js.map