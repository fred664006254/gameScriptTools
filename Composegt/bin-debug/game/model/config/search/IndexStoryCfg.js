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
/**
 * 配置
 */
var Config;
(function (Config) {
    /**
     * 寻访配置
     */
    var IndexstoryCfg;
    (function (IndexstoryCfg) {
        var indexlist = {};
        function formatData(data) {
            for (var key in data) {
                if (typeof (data[key]) == "object") {
                    if (key == "indexlist") {
                        formatIndexList(data[key]);
                    }
                }
                else {
                    IndexstoryCfg[key] = data[key];
                }
            }
        }
        IndexstoryCfg.formatData = formatData;
        function formatIndexList(data) {
            for (var key in data) {
                var itemCfg = new IndexStoryItemCfg();
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
                indexlist[key] = itemCfg;
            }
        }
        function getIndexItemCfgById(id) {
            return indexlist[id];
        }
        IndexstoryCfg.getIndexItemCfgById = getIndexItemCfgById;
    })(IndexstoryCfg = Config.IndexstoryCfg || (Config.IndexstoryCfg = {}));
    var IndexStoryItemCfg = (function (_super) {
        __extends(IndexStoryItemCfg, _super);
        function IndexStoryItemCfg() {
            return _super.call(this) || this;
        }
        return IndexStoryItemCfg;
    }(BaseItemCfg));
    __reflect(IndexStoryItemCfg.prototype, "IndexStoryItemCfg");
})(Config || (Config = {}));
