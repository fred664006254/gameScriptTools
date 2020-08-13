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
    var LampinfoCfg;
    (function (LampinfoCfg) {
        var lampList = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!lampList.hasOwnProperty(String(key))) {
                    lampList[String(key)] = new LampinfoItemCfg();
                }
                itemCfg = lampList[String(key)];
                itemCfg.initData(data[key]);
            }
        }
        LampinfoCfg.formatData = formatData;
        function getLampInfoItemCfg(idx) {
            return lampList[idx];
        }
        LampinfoCfg.getLampInfoItemCfg = getLampInfoItemCfg;
    })(LampinfoCfg = Config.LampinfoCfg || (Config.LampinfoCfg = {}));
    var LampinfoItemCfg = (function (_super) {
        __extends(LampinfoItemCfg, _super);
        function LampinfoItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LampinfoItemCfg;
    }(BaseItemCfg));
    __reflect(LampinfoItemCfg.prototype, "LampinfoItemCfg");
})(Config || (Config = {}));
