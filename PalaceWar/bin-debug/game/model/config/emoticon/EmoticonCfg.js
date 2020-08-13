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
    var EmoticonCfg;
    (function (EmoticonCfg) {
        EmoticonCfg.emoticonList = {};
        EmoticonCfg.emoticonTypeArr = [];
        function formatData(data) {
            for (var key in data) {
                var emoticonItem = new EmoticonCfgItem();
                emoticonItem.initData(data[key]);
                emoticonItem.id = String(key);
                emoticonItem.sortId = Number(key);
                if (!EmoticonCfg.emoticonList.hasOwnProperty(String(key))) {
                    EmoticonCfg.emoticonList[String(key)] = emoticonItem;
                }
                var groupId = data[key].group;
                var isFind = false;
                for (var k in this.emoticonTypeArr) {
                    if (groupId == this.emoticonTypeArr[k]) {
                        isFind = true;
                        break;
                    }
                }
                if (!isFind) {
                    this.emoticonTypeArr.push(groupId);
                }
            }
            this.emoticonTypeArr.sort(function (a, b) { return a - b; });
        }
        EmoticonCfg.formatData = formatData;
        function getEmoticonCfgById(id) {
            return this.emoticonList[id];
        }
        EmoticonCfg.getEmoticonCfgById = getEmoticonCfgById;
    })(EmoticonCfg = Config.EmoticonCfg || (Config.EmoticonCfg = {}));
    var EmoticonCfgItem = (function (_super) {
        __extends(EmoticonCfgItem, _super);
        function EmoticonCfgItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.group = 0;
            _this.unlock = 0;
            _this.exchange = null;
            _this.id = null;
            _this.need = 0;
            _this.sortId = 0;
            _this.status = 0;
            _this.frame = 0;
            return _this;
        }
        return EmoticonCfgItem;
    }(BaseItemCfg));
    Config.EmoticonCfgItem = EmoticonCfgItem;
    __reflect(EmoticonCfgItem.prototype, "Config.EmoticonCfgItem");
})(Config || (Config = {}));
//# sourceMappingURL=EmoticonCfg.js.map