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
    var AmuletCfg;
    (function (AmuletCfg) {
        var amuletList = {};
        function formatData(data) {
            for (var key in data) {
                var tmpcfg = amuletList[key];
                if (!tmpcfg) {
                    tmpcfg = new AmuletItemCfg();
                    amuletList[String(key)] = tmpcfg;
                }
                tmpcfg.initData(data[key]);
                tmpcfg.id = key;
            }
        }
        AmuletCfg.formatData = formatData;
        /**
         * 根据索引获取奖励物品
         * @param index
         */
        function getAmucfgIndex(key) {
            return amuletList[String(key)];
        }
        AmuletCfg.getAmucfgIndex = getAmucfgIndex;
        function getAmucfgBySerId(serId) {
            for (var key in amuletList) {
                if (amuletList.hasOwnProperty(key)) {
                    var element = amuletList[key];
                    if (element.servantId == serId) {
                        return amuletList[String(key)];
                    }
                }
            }
            return null;
        }
        AmuletCfg.getAmucfgBySerId = getAmucfgBySerId;
        var AmuletItemCfg = (function (_super) {
            __extends(AmuletItemCfg, _super);
            function AmuletItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AmuletItemCfg;
        }(BaseItemCfg));
        AmuletCfg.AmuletItemCfg = AmuletItemCfg;
        __reflect(AmuletItemCfg.prototype, "Config.AmuletCfg.AmuletItemCfg");
    })(AmuletCfg = Config.AmuletCfg || (Config.AmuletCfg = {}));
})(Config || (Config = {}));
