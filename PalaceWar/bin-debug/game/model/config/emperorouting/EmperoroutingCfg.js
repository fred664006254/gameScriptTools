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
    var EmperoroutingCfg;
    (function (EmperoroutingCfg) {
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
                if (key == "achievement1") {
                    EmperoroutingCfg.achievement1List = [];
                    for (var k in data[key]) {
                        var item = new EmperorOutingItemCfg();
                        item.initData(data[key][k]);
                        item.id = "" + (Number(k) + 1);
                        item.sortId = Number(k) + 1;
                        EmperoroutingCfg.achievement1List.push(item);
                    }
                }
                else if (key == "achievement2") {
                    EmperoroutingCfg.achievement2List = [];
                    for (var k in data[key]) {
                        var item = new EmperorOutingItemCfg();
                        item.initData(data[key][k]);
                        item.id = "" + (Number(k) + 1);
                        item.sortId = Number(k) + 1;
                        EmperoroutingCfg.achievement2List.push(item);
                    }
                }
            }
        }
        EmperoroutingCfg.formatData = formatData;
        function getAchievement1CfgList() {
            return EmperoroutingCfg.achievement1List;
        }
        EmperoroutingCfg.getAchievement1CfgList = getAchievement1CfgList;
        function getAchievement2CfgList() {
            return EmperoroutingCfg.achievement2List;
        }
        EmperoroutingCfg.getAchievement2CfgList = getAchievement2CfgList;
    })(EmperoroutingCfg = Config.EmperoroutingCfg || (Config.EmperoroutingCfg = {}));
    var EmperorOutingItemCfg = (function (_super) {
        __extends(EmperorOutingItemCfg, _super);
        function EmperorOutingItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EmperorOutingItemCfg;
    }(BaseItemCfg));
    Config.EmperorOutingItemCfg = EmperorOutingItemCfg;
    __reflect(EmperorOutingItemCfg.prototype, "Config.EmperorOutingItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=EmperoroutingCfg.js.map