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
     * 成年子嗣配置类
     * author dky
     * date 2017/10/30
     * @class AdultCfg
     */
    var AdultCfg;
    (function (AdultCfg) {
        var itemList = {};
        function formatData(data) {
            for (var key in data.adultQuality) {
                var itemCfg = void 0;
                if (!itemList.hasOwnProperty(String(key))) {
                    itemList[String(key)] = new AdultItemCfg();
                }
                itemCfg = itemList[String(key)];
                itemCfg.initData(data.adultQuality[key]);
            }
            this.lastTime = data.lastTime;
            this.freshGem = data.freshGem;
        }
        AdultCfg.formatData = formatData;
        /**
         * 通过子嗣品质获取单个子嗣配置
         * @param id 道具id
         */
        function getItemCfgById(id) {
            return itemList[String(id)];
        }
        AdultCfg.getItemCfgById = getItemCfgById;
    })(AdultCfg = Config.AdultCfg || (Config.AdultCfg = {}));
    var AdultItemCfg = (function (_super) {
        __extends(AdultItemCfg, _super);
        function AdultItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AdultItemCfg;
    }(BaseItemCfg));
    Config.AdultItemCfg = AdultItemCfg;
    __reflect(AdultItemCfg.prototype, "Config.AdultItemCfg");
})(Config || (Config = {}));
