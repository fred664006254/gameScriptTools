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
     * 官阶配置
     */
    var MinlevelCfg;
    (function (MinlevelCfg) {
        var minlevelListCfg = {};
        var maxMinLv = 0;
        /**一键购买小人需要官品 */
        MinlevelCfg.oneClickBuy = 0;
        function formatData(data) {
            minlevelListCfg = {};
            for (var key in data) {
                var itemCfg = void 0;
                if (!minlevelListCfg.hasOwnProperty(String(key))) {
                    minlevelListCfg[String(key)] = new MinLevelItemCfg();
                }
                itemCfg = minlevelListCfg[String(key)];
                itemCfg.initData(data[key]);
                if (data[key].oneClickBuy) {
                    MinlevelCfg.oneClickBuy = data[key].lv;
                }
                maxMinLv = Math.max(Number(key), maxMinLv);
            }
        }
        MinlevelCfg.formatData = formatData;
        function getCfgByMinLevelId(minLevelId) {
            return minlevelListCfg[String(minLevelId)];
        }
        MinlevelCfg.getCfgByMinLevelId = getCfgByMinLevelId;
        /**
         * 根据官品获取招募存储上限
         * @param minLvId 官品
         */
        function getbuyLimitByMinLvId(minLvId) {
            return getCfgByMinLevelId(minLvId).buyLimit;
        }
        MinlevelCfg.getbuyLimitByMinLvId = getbuyLimitByMinLvId;
        /**
         * 获取最大长度
         */
        function getMaxLevel() {
            return Object.keys(minlevelListCfg).length - 3;
        }
        MinlevelCfg.getMaxLevel = getMaxLevel;
        /**
         * 获取最大小官职长度
         */
        function getMaxMinLevel() {
            return maxMinLv;
        }
        MinlevelCfg.getMaxMinLevel = getMaxMinLevel;
    })(MinlevelCfg = Config.MinlevelCfg || (Config.MinlevelCfg = {}));
    var MinLevelItemCfg = (function (_super) {
        __extends(MinLevelItemCfg, _super);
        function MinLevelItemCfg() {
            return _super.call(this) || this;
        }
        return MinLevelItemCfg;
    }(BaseItemCfg));
    __reflect(MinLevelItemCfg.prototype, "MinLevelItemCfg");
})(Config || (Config = {}));
