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
     * 征伐配置
     */
    var ConquestCfg;
    (function (ConquestCfg) {
        var conquestListCfg = [];
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!conquestListCfg.hasOwnProperty(String(key))) {
                    conquestListCfg[String(key)] = new ConquestItemCfg();
                }
                itemCfg = conquestListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        ConquestCfg.formatData = formatData;
        function getConquestCfgById(id) {
            return conquestListCfg[String(id)];
        }
        ConquestCfg.getConquestCfgById = getConquestCfgById;
        function getConquestCfgList() {
            return conquestListCfg;
        }
        ConquestCfg.getConquestCfgList = getConquestCfgList;
        /**
         * 获取最大长度
         */
        function getMaxLength() {
            return Object.keys(conquestListCfg).length;
        }
        ConquestCfg.getMaxLength = getMaxLength;
    })(ConquestCfg = Config.ConquestCfg || (Config.ConquestCfg = {}));
    var ConquestItemCfg = (function (_super) {
        __extends(ConquestItemCfg, _super);
        function ConquestItemCfg() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ConquestItemCfg.prototype, "name", {
            /**讨伐名称 */
            get: function () {
                return LanguageManager.getlocal("wifeName_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConquestItemCfg.prototype, "icon", {
            /**讨伐敌人icon */
            get: function () {
                return "wife_half_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        return ConquestItemCfg;
    }(BaseItemCfg));
    Config.ConquestItemCfg = ConquestItemCfg;
    __reflect(ConquestItemCfg.prototype, "Config.ConquestItemCfg");
})(Config || (Config = {}));
