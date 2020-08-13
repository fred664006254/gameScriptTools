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
        var RechargeBoxCfg = (function () {
            function RechargeBoxCfg() {
                this.rechargeBoxItemListCfg = [];
            }
            /**
             * 初始化数据
             */
            RechargeBoxCfg.prototype.formatData = function (data) {
                for (var key in data.boxList) {
                    var itemCfg = void 0;
                    if (!this.rechargeBoxItemListCfg.hasOwnProperty(String(key))) {
                        this.rechargeBoxItemListCfg[String(key)] = new RechargeBoxItemCfg();
                    }
                    itemCfg = this.rechargeBoxItemListCfg[String(key)];
                    itemCfg.initData(data.boxList[key]);
                    itemCfg.id = Number(key) + 1;
                }
            };
            /**
             * 获取当前的boxList cfg
             */
            RechargeBoxCfg.prototype.getBoxListData = function () {
                var arr = [];
                for (var i = 0; i < this.rechargeBoxItemListCfg.length; i++) {
                    if (i == 0) {
                        arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - 1]);
                    }
                    else if (i == 1) {
                        arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1]);
                    }
                    else {
                        arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - i]);
                    }
                }
                return arr;
            };
            /**
             * 通过id取当前的cfg
             */
            RechargeBoxCfg.prototype.getBoxData = function (gears) {
                for (var i = 0; i < this.rechargeBoxItemListCfg.length; i++) {
                    var boxData = this.rechargeBoxItemListCfg[i];
                    if (boxData.needGem == gears) {
                        return boxData;
                    }
                }
            };
            return RechargeBoxCfg;
        }());
        AcCfg.RechargeBoxCfg = RechargeBoxCfg;
        __reflect(RechargeBoxCfg.prototype, "Config.AcCfg.RechargeBoxCfg");
        var RechargeBoxItemCfg = (function (_super) {
            __extends(RechargeBoxItemCfg, _super);
            function RechargeBoxItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.gemDrop = [];
                return _this;
            }
            return RechargeBoxItemCfg;
        }(BaseItemCfg));
        AcCfg.RechargeBoxItemCfg = RechargeBoxItemCfg;
        __reflect(RechargeBoxItemCfg.prototype, "Config.AcCfg.RechargeBoxItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
