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
     * 道具配置类
     * author dmj
     * date 2017/9/25
     * @class ItemCfg
     */
    var ItemdropCfg;
    (function (ItemdropCfg) {
        var itemdrapList = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!itemdrapList.hasOwnProperty(String(key))) {
                    itemdrapList[String(key)] = new ItemDropItemCfg();
                }
                itemCfg = itemdrapList[String(key)];
                itemCfg.initData(data[key]);
            }
        }
        ItemdropCfg.formatData = formatData;
        /**
         * 通过道具id获取单个道具配置
         * @param id 道具id
         */
        function getItemCfgById(id) {
            return itemdrapList[String(id)];
        }
        ItemdropCfg.getItemCfgById = getItemCfgById;
    })(ItemdropCfg = Config.ItemdropCfg || (Config.ItemdropCfg = {}));
    var ItemDropItemCfg = (function (_super) {
        __extends(ItemDropItemCfg, _super);
        function ItemDropItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ItemDropItemCfg;
    }(BaseItemCfg));
    Config.ItemDropItemCfg = ItemDropItemCfg;
    __reflect(ItemDropItemCfg.prototype, "Config.ItemDropItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=ItemdropCfg.js.map