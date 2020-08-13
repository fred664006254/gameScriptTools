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
        var itemList = {};
        var buffList = {};
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
        }
        AlliancetaskCfg.formatData = formatData;
        function getAllianceTaskNeedLv() {
            return needLv;
        }
        AlliancetaskCfg.getAllianceTaskNeedLv = getAllianceTaskNeedLv;
        function getAllianceTaskIdList() {
            return Object.keys(itemList);
        }
        AlliancetaskCfg.getAllianceTaskIdList = getAllianceTaskIdList;
        function getAllianceTaskById(id) {
            return itemList[id];
        }
        AlliancetaskCfg.getAllianceTaskById = getAllianceTaskById;
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
        return AllianceTaskItemCfg;
    }(BaseItemCfg));
    Config.AllianceTaskItemCfg = AllianceTaskItemCfg;
    __reflect(AllianceTaskItemCfg.prototype, "Config.AllianceTaskItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=AllianceTaskCfg.js.map