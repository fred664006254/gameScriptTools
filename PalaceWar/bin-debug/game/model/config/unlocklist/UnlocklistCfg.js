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
    var UnlocklistCfg;
    (function (UnlocklistCfg) {
        var unlockList = {};
        function formatData(data) {
            for (var key in data) {
                var prisonItemCfg = void 0;
                if (!unlockList.hasOwnProperty(String(key))) {
                    unlockList[String(key)] = new UnlocklistItemCfg();
                }
                prisonItemCfg = unlockList[String(key)];
                prisonItemCfg.initData(data[key]);
                prisonItemCfg.key = key;
                this.prisonItemCfg = prisonItemCfg;
            }
        }
        UnlocklistCfg.formatData = formatData;
        function getUnlockItemCfgList() {
            var arr = new Array();
            for (var key in unlockList) {
                if (unlockList[key].gameName) {
                    var functionName = "checkOpen" + App.StringUtil.firstCharToUper(unlockList[key].gameName);
                    if (Api.switchVoApi[functionName]) {
                        if (Api.switchVoApi[functionName]()) {
                            arr.push(unlockList[key]);
                        }
                    }
                    else {
                        arr.push(unlockList[key]);
                    }
                }
            }
            arr.sort(function (a, b) {
                if (a.sortId > b.sortId)
                    return 1;
                else if (a.sortId == b.sortId)
                    return 0;
                return -1;
            });
            return arr;
        }
        UnlocklistCfg.getUnlockItemCfgList = getUnlockItemCfgList;
        var UnlocklistItemCfg = (function (_super) {
            __extends(UnlocklistItemCfg, _super);
            function UnlocklistItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortId = 0;
                _this.gameName = null;
                _this.reward = null;
                _this.key = null;
                _this.butType = true;
                return _this;
            }
            return UnlocklistItemCfg;
        }(BaseItemCfg));
        UnlocklistCfg.UnlocklistItemCfg = UnlocklistItemCfg;
        __reflect(UnlocklistItemCfg.prototype, "Config.UnlocklistCfg.UnlocklistItemCfg");
    })(UnlocklistCfg = Config.UnlocklistCfg || (Config.UnlocklistCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=UnlocklistCfg.js.map