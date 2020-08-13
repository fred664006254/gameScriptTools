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
    var ExileCfg;
    (function (ExileCfg) {
        /**
         * --解锁门客数量
         */
        ExileCfg.numNeed = 0;
        /**
         * --出海后门客需大于。否则出海失败
         */
        ExileCfg.servantNeed = 0;
        /**
         * --出海时间。单位：天
         */
        ExileCfg.exileTime = 0;
        /**
         * --提前召回费用。天数*单位元宝
         */
        ExileCfg.unitGem = 0;
        /**
         * --出海席位info
         */
        ExileCfg.exileSeatItemCfgList = [];
        ExileCfg.buff1 = [];
        ExileCfg.buff2 = [];
        ExileCfg.changeBuffCost = 0;
        /**
         * --流放卡最多同时使用个数
         */
        ExileCfg.maxPos = 0;
        /**
         * 解析数据
         */
        function formatData(data) {
            ExileCfg.exileSeatItemCfgList.length = 0;
            ExileCfg.numNeed = data.numNeed;
            ExileCfg.servantNeed = data.servantNeed;
            ExileCfg.exileTime = data.exileTime;
            ExileCfg.unitGem = data.unitGem;
            ExileCfg.changeBuffCost = data.changeCost;
            ExileCfg.maxPos = data.maxPos;
            for (var key in data.seat) {
                var itemcfg = new ExileSeatItemCfg();
                itemcfg.initData(data.seat[key]);
                itemcfg.id = String(key);
                ExileCfg.exileSeatItemCfgList.push(itemcfg);
            }
            for (var key in data.buff1) {
                var itemcfg = new ExileBuffsItemCfg();
                itemcfg.initData(data.buff1[key]);
                itemcfg.id = String(key);
                ExileCfg.buff1.push(itemcfg);
            }
            for (var key in data.buff2) {
                var itemcfg = new ExileBuffsItemCfg();
                itemcfg.initData(data.buff2[key]);
                itemcfg.id = String(key);
                ExileCfg.buff2.push(itemcfg);
            }
        }
        ExileCfg.formatData = formatData;
        /**
         * 下一个解锁席位的信息
         */
        function getNextSeat(id) {
            for (var key in ExileCfg.exileSeatItemCfgList) {
                if (ExileCfg.exileSeatItemCfgList[key].id == id) {
                    return ExileCfg.exileSeatItemCfgList[key];
                }
            }
        }
        ExileCfg.getNextSeat = getNextSeat;
    })(ExileCfg = Config.ExileCfg || (Config.ExileCfg = {}));
    /**席位item */
    var ExileSeatItemCfg = (function (_super) {
        __extends(ExileSeatItemCfg, _super);
        function ExileSeatItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ExileSeatItemCfg;
    }(BaseItemCfg));
    Config.ExileSeatItemCfg = ExileSeatItemCfg;
    __reflect(ExileSeatItemCfg.prototype, "Config.ExileSeatItemCfg");
    /**buff item */
    var ExileBuffsItemCfg = (function (_super) {
        __extends(ExileBuffsItemCfg, _super);
        function ExileBuffsItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ExileBuffsItemCfg;
    }(BaseItemCfg));
    Config.ExileBuffsItemCfg = ExileBuffsItemCfg;
    __reflect(ExileBuffsItemCfg.prototype, "Config.ExileBuffsItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=ExileCfg.js.map