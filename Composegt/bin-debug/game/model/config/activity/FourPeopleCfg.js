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
        var FourPeopleCfg = (function () {
            function FourPeopleCfg() {
                this.itemListCfg = [];
            }
            FourPeopleCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    itemCfg = new FourPeoPleItemCfg();
                    itemCfg.needNum = data[key].needNum;
                    itemCfg.getServant = data[key].getServant;
                    itemCfg.needItem = data[key].needItem;
                    this.itemListCfg.push(itemCfg);
                }
            };
            FourPeopleCfg.prototype.getPeopleList = function () {
                return this.itemListCfg;
            };
            return FourPeopleCfg;
        }());
        AcCfg.FourPeopleCfg = FourPeopleCfg;
        __reflect(FourPeopleCfg.prototype, "Config.AcCfg.FourPeopleCfg");
        var FourPeoPleItemCfg = (function (_super) {
            __extends(FourPeoPleItemCfg, _super);
            function FourPeoPleItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.getServant = "";
                _this.needItem = "";
                _this.needNum = 0;
                return _this;
            }
            Object.defineProperty(FourPeoPleItemCfg.prototype, "servantIcon", {
                get: function () {
                    return Config.ServantCfg.getServantItemById(this.getServant).fullIcon;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FourPeoPleItemCfg.prototype, "servantName", {
                get: function () {
                    return Config.ServantCfg.getServantItemById(this.getServant).name;
                },
                enumerable: true,
                configurable: true
            });
            return FourPeoPleItemCfg;
        }(BaseItemCfg));
        AcCfg.FourPeoPleItemCfg = FourPeoPleItemCfg;
        __reflect(FourPeoPleItemCfg.prototype, "Config.AcCfg.FourPeoPleItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
