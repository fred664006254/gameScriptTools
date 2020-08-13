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
        var SkinPackageCfg = (function () {
            function SkinPackageCfg() {
                this.gift = {};
            }
            SkinPackageCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.skinNeed = data.skinNeed;
                if (data.gift) {
                    for (var key in data.gift) {
                        var itemCfg = void 0;
                        if (!this.gift.hasOwnProperty(String(key))) {
                            this.gift[String(key)] = new SkinPackageGiftItemCfg();
                        }
                        itemCfg = this.gift[String(key)];
                        itemCfg.initData(data.gift[key]);
                        itemCfg.id = Number(key);
                    }
                }
            };
            SkinPackageCfg.prototype.getGemNeed = function (key) {
                return this.gift[String(key)].gemNeed;
            };
            SkinPackageCfg.prototype.getItemCfg = function (key) {
                return this.gift[String(key)];
            };
            SkinPackageCfg.prototype.getRewardMax = function () {
                return Object.keys(this.gift).length;
            };
            return SkinPackageCfg;
        }());
        AcCfg.SkinPackageCfg = SkinPackageCfg;
        __reflect(SkinPackageCfg.prototype, "Config.AcCfg.SkinPackageCfg");
        var SkinPackageGiftItemCfg = (function (_super) {
            __extends(SkinPackageGiftItemCfg, _super);
            function SkinPackageGiftItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(SkinPackageGiftItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return SkinPackageGiftItemCfg;
        }(BaseItemCfg));
        AcCfg.SkinPackageGiftItemCfg = SkinPackageGiftItemCfg;
        __reflect(SkinPackageGiftItemCfg.prototype, "Config.AcCfg.SkinPackageGiftItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SkinPackageCfg.js.map