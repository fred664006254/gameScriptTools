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
    var LevelCfg;
    (function (LevelCfg) {
        var levelListCfg = {};
        function formatData(data) {
            levelListCfg = {};
            for (var key in data) {
                var itemCfg = void 0;
                if (!levelListCfg.hasOwnProperty(String(key))) {
                    levelListCfg[String(key)] = new LevelItemCfg();
                }
                itemCfg = levelListCfg[String(key)];
                itemCfg.initData(data[key]);
            }
        }
        LevelCfg.formatData = formatData;
        function getCfgByLevel(level) {
            return levelListCfg[String(level)];
        }
        LevelCfg.getCfgByLevel = getCfgByLevel;
        /**
         * 获取最大长度
         */
        function getMaxLevel() {
            return Object.keys(levelListCfg).length - 3;
        }
        LevelCfg.getMaxLevel = getMaxLevel;
    })(LevelCfg = Config.LevelCfg || (Config.LevelCfg = {}));
    var LevelItemCfg = (function (_super) {
        __extends(LevelItemCfg, _super);
        function LevelItemCfg() {
            return _super.call(this) || this;
        }
        return LevelItemCfg;
    }(BaseItemCfg));
    __reflect(LevelItemCfg.prototype, "LevelItemCfg");
})(Config || (Config = {}));
