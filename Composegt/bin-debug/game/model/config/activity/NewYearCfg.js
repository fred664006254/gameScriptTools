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
        var NewYearCfg = (function () {
            function NewYearCfg() {
                this.itemListCfg = {};
            }
            NewYearCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    if (!this.itemListCfg.hasOwnProperty(String(key))) {
                        this.itemListCfg[String(key)] = new AcNewYearItemCfg();
                    }
                    itemCfg = this.itemListCfg[String(key)];
                    itemCfg.initData(data[key]);
                    itemCfg.id = String(key);
                }
            };
            // public getList(sheetType:number):Array<VipShopItemCfg>
            // {
            // 	let arr:Array<VipShopItemCfg> = new Array();
            // 	for(let key in this.itemListCfg)
            // 	{
            // 		if(sheetType == this.itemListCfg[key].sheetType)
            // 		{
            // 			arr.push(this.itemListCfg[key]);
            // 		}
            // 	}
            // 	return arr; 
            // }
            NewYearCfg.prototype.getRechargeItemById = function (id) {
                return this.itemListCfg[id];
            };
            return NewYearCfg;
        }());
        AcCfg.NewYearCfg = NewYearCfg;
        __reflect(NewYearCfg.prototype, "Config.AcCfg.NewYearCfg");
        var AcNewYearItemCfg = (function (_super) {
            __extends(AcNewYearItemCfg, _super);
            function AcNewYearItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AcNewYearItemCfg;
        }(BaseItemCfg));
        AcCfg.AcNewYearItemCfg = AcNewYearItemCfg;
        __reflect(AcNewYearItemCfg.prototype, "Config.AcCfg.AcNewYearItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
