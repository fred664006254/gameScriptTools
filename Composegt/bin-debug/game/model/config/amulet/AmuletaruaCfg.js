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
    var AmuletaruaCfg;
    (function (AmuletaruaCfg) {
        var amuletaruList = {};
        function formatData(data) {
            for (var key in data) {
                var tmpcfg = amuletaruList[key];
                if (!tmpcfg) {
                    tmpcfg = new AmuletAuraItemCfg();
                    amuletaruList[String(key)] = tmpcfg;
                }
                tmpcfg.initData(data[key]);
                tmpcfg.id = key;
            }
        }
        AmuletaruaCfg.formatData = formatData;
        /**
         * 根据索引获取奖励物品
         * @param index
         */
        function getAmuletAuraItemById(key) {
            return amuletaruList[String(key)];
        }
        AmuletaruaCfg.getAmuletAuraItemById = getAmuletAuraItemById;
        var AmuletAuraItemCfg = (function (_super) {
            __extends(AmuletAuraItemCfg, _super);
            function AmuletAuraItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.attrLvList = [];
                return _this;
            }
            AmuletAuraItemCfg.prototype.initData = function (data) {
                if (data) {
                    for (var key in data) {
                        this.attrLvList[key] = data[key];
                    }
                }
            };
            return AmuletAuraItemCfg;
        }(BaseItemCfg));
        AmuletaruaCfg.AmuletAuraItemCfg = AmuletAuraItemCfg;
        __reflect(AmuletAuraItemCfg.prototype, "Config.AmuletaruaCfg.AmuletAuraItemCfg");
    })(AmuletaruaCfg = Config.AmuletaruaCfg || (Config.AmuletaruaCfg = {}));
})(Config || (Config = {}));
