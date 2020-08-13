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
        var itemList = [];
        function formatData(data) {
            // for (var key in data) {
            for (var index = 0; index < data.length; index++) {
                var itemCfg = void 0;
                if (!itemList[index]) {
                    itemCfg = new PrestigeItemCfg();
                    itemList.push(itemCfg);
                }
                itemCfg = itemList[index];
                itemCfg.initData(data[index]);
                itemCfg.id = String(index + 1);
            }
        }
        PrestigeCfg.formatData = formatData;
        /**
         * 通过职位获取单个权限配置
         * @param id 权限id
         */
        function getPrestigeCfgById(id) {
            return itemList[Number(id)];
        }
        PrestigeCfg.getPrestigeCfgById = getPrestigeCfgById;
        function getPrestigeCfg() {
            return itemList;
        }
        PrestigeCfg.getPrestigeCfg = getPrestigeCfg;
        function getMax() {
            return itemList.length;
        }
        PrestigeCfg.getMax = getMax;
    })(PrestigeCfg = Config.PrestigeCfg || (Config.PrestigeCfg = {}));
    var PrestigeItemCfg = (function (_super) {
        __extends(PrestigeItemCfg, _super);
        function PrestigeItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 是否具备称帝资格竞拍的资格  1：可参与竞拍  0：不可参与
             */
            _this.canEmperor = 0;
            _this.effect = 0;
            _this.isSpecial = 0;
            return _this;
        }
        return PrestigeItemCfg;
    }(BaseItemCfg));
    Config.PrestigeItemCfg = PrestigeItemCfg;
    __reflect(PrestigeItemCfg.prototype, "Config.PrestigeItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=PrestigeCfg.js.map