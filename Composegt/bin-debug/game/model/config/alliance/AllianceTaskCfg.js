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
    var AlliancetaskCfg;
    (function (AlliancetaskCfg) {
        var needLv = 0;
        var shortcutLv = 0;
        var itemList = {};
        var buffList = {};
        var monthRewardList = {};
        function formatData(data) {
            for (var key in data.itemList) {
                var itemCfg = void 0;
                if (!itemList.hasOwnProperty(String(key))) {
                    itemList[String(key)] = new AllianceTaskItemCfg();
                }
                itemCfg = itemList[String(key)];
                itemCfg.id = String(key);
                itemCfg.initData(data.itemList[key]);
            }
            for (var key in data.monthRewardList) {
                var itemCfg = void 0;
                if (!monthRewardList.hasOwnProperty(String(key))) {
                    monthRewardList[String(key)] = new AllianceTaskItemCfg();
                }
                itemCfg = monthRewardList[String(key)];
                itemCfg.id = String(key);
                itemCfg.initData(data.monthRewardList[key]);
            }
            for (var key in data.buffList) {
                var itemCfg = void 0;
                if (!buffList.hasOwnProperty(String(key))) {
                    buffList[String(key)] = new AllianceTaskBuffItemCfg();
                }
                itemCfg = buffList[String(key)];
                itemCfg.id = String(key);
                itemCfg.initData(data.buffList[key]);
            }
            needLv = data.needLv;
            shortcutLv = data.shortcutLv;
        }
        AlliancetaskCfg.formatData = formatData;
        function getAllianceTaskNeedLv() {
            return needLv;
        }
        AlliancetaskCfg.getAllianceTaskNeedLv = getAllianceTaskNeedLv;
        function getAllianceTaskshortcutLv() {
            return shortcutLv;
        }
        AlliancetaskCfg.getAllianceTaskshortcutLv = getAllianceTaskshortcutLv;
        function getAllianceTaskIdList() {
            return Object.keys(itemList);
        }
        AlliancetaskCfg.getAllianceTaskIdList = getAllianceTaskIdList;
        function getAllianceMonTaskIdList() {
            return Object.keys(monthRewardList);
        }
        AlliancetaskCfg.getAllianceMonTaskIdList = getAllianceMonTaskIdList;
        function getAllianceTaskById(id) {
            return itemList[id];
        }
        AlliancetaskCfg.getAllianceTaskById = getAllianceTaskById;
        function getAllianceMonTTaskById(id) {
            return monthRewardList[id];
        }
        AlliancetaskCfg.getAllianceMonTTaskById = getAllianceMonTTaskById;
        function getAllianceTaskBuffIdList() {
            return Object.keys(buffList);
        }
        AlliancetaskCfg.getAllianceTaskBuffIdList = getAllianceTaskBuffIdList;
        function getAllianceTaskBuffById(id) {
            return buffList[id];
        }
        AlliancetaskCfg.getAllianceTaskBuffById = getAllianceTaskBuffById;
    })(AlliancetaskCfg = Config.AlliancetaskCfg || (Config.AlliancetaskCfg = {}));
    var AllianceTaskBuffItemCfg = (function (_super) {
        __extends(AllianceTaskBuffItemCfg, _super);
        function AllianceTaskBuffItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AllianceTaskBuffItemCfg;
    }(BaseItemCfg));
    Config.AllianceTaskBuffItemCfg = AllianceTaskBuffItemCfg;
    __reflect(AllianceTaskBuffItemCfg.prototype, "Config.AllianceTaskBuffItemCfg");
    var AllianceTaskItemCfg = (function (_super) {
        __extends(AllianceTaskItemCfg, _super);
        function AllianceTaskItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(AllianceTaskItemCfg.prototype, "value", {
            get: function () {
                return this["value_" + (App.DateUtil.getServerMonth() + 1)];
            },
            enumerable: true,
            configurable: true
        });
        return AllianceTaskItemCfg;
    }(BaseItemCfg));
    Config.AllianceTaskItemCfg = AllianceTaskItemCfg;
    __reflect(AllianceTaskItemCfg.prototype, "Config.AllianceTaskItemCfg");
})(Config || (Config = {}));
