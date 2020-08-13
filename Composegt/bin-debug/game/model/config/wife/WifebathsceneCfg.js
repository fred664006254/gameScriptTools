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
    var WifebathsceneCfg;
    (function (WifebathsceneCfg) {
        var wifeBathSceneList = [];
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!wifeBathSceneList.hasOwnProperty(String(key))) {
                    wifeBathSceneList[String(key)] = new WifeBathSceneItemCfg();
                }
                itemCfg = wifeBathSceneList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        WifebathsceneCfg.formatData = formatData;
        function getSceneCfgById(id) {
            return wifeBathSceneList[String(id)];
        }
        WifebathsceneCfg.getSceneCfgById = getSceneCfgById;
    })(WifebathsceneCfg = Config.WifebathsceneCfg || (Config.WifebathsceneCfg = {}));
    var WifeBathSceneItemCfg = (function (_super) {
        __extends(WifeBathSceneItemCfg, _super);
        function WifeBathSceneItemCfg() {
            return _super.call(this) || this;
        }
        return WifeBathSceneItemCfg;
    }(BaseItemCfg));
    Config.WifeBathSceneItemCfg = WifeBathSceneItemCfg;
    __reflect(WifeBathSceneItemCfg.prototype, "Config.WifeBathSceneItemCfg");
})(Config || (Config = {}));
