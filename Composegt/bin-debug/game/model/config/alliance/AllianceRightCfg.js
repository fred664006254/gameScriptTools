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
     * 联盟权限配置
     * author dky
     * date 2017/11/29
     * @class AllianceRightCfg
     */
    var AllianceRightCfg;
    (function (AllianceRightCfg) {
        var itemList = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!itemList.hasOwnProperty(String(key))) {
                    itemList[String(key)] = new AllianceRightItemCfg();
                }
                itemCfg = itemList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        AllianceRightCfg.formatData = formatData;
        /**
         * 通过职位获取单个权限配置
         * @param id 权限id
         */
        function getRightCfgById(id) {
            return itemList[String(id)];
        }
        AllianceRightCfg.getRightCfgById = getRightCfgById;
    })(AllianceRightCfg = Config.AllianceRightCfg || (Config.AllianceRightCfg = {}));
    var AllianceRightItemCfg = (function (_super) {
        __extends(AllianceRightItemCfg, _super);
        function AllianceRightItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AllianceRightItemCfg;
    }(BaseItemCfg));
    Config.AllianceRightItemCfg = AllianceRightItemCfg;
    __reflect(AllianceRightItemCfg.prototype, "Config.AllianceRightItemCfg");
})(Config || (Config = {}));
