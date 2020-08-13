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
    var PrestigeCfg;
    (function (PrestigeCfg) {
        var itemList = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!itemList.hasOwnProperty(String(key))) {
                    itemList[String(key)] = new PrestigeItemCfg();
                }
                itemCfg = itemList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        PrestigeCfg.formatData = formatData;
        /**
         * 通过职位获取单个权限配置
         * @param id 权限id
         */
        function getPrestigeCfgById(id) {
            return itemList[String(id)];
        }
        PrestigeCfg.getPrestigeCfgById = getPrestigeCfgById;
    })(PrestigeCfg = Config.PrestigeCfg || (Config.PrestigeCfg = {}));
    var PrestigeItemCfg = (function (_super) {
        __extends(PrestigeItemCfg, _super);
        function PrestigeItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PrestigeItemCfg;
    }(BaseItemCfg));
    Config.PrestigeItemCfg = PrestigeItemCfg;
    __reflect(PrestigeItemCfg.prototype, "Config.PrestigeItemCfg");
})(Config || (Config = {}));
