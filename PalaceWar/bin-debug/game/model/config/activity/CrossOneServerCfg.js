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
    var AcCfg;
    (function (AcCfg) {
        var CrossOneServerCfg = (function () {
            function CrossOneServerCfg() {
            }
            CrossOneServerCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.servant = data.servant;
                // this.servant = 2010;
                this.needLv = data.needLv;
                this.task = data.task.slice();
                this.award = data.award.slice();
            };
            Object.defineProperty(CrossOneServerCfg.prototype, "taskList", {
                get: function () {
                    return this.task.slice();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CrossOneServerCfg.prototype, "awardList", {
                get: function () {
                    return this.award.slice();
                },
                enumerable: true,
                configurable: true
            });
            return CrossOneServerCfg;
        }());
        AcCfg.CrossOneServerCfg = CrossOneServerCfg;
        __reflect(CrossOneServerCfg.prototype, "Config.AcCfg.CrossOneServerCfg");
        var CrossOneServerTaskItem = (function (_super) {
            __extends(CrossOneServerTaskItem, _super);
            function CrossOneServerTaskItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CrossOneServerTaskItem;
        }(BaseItemCfg));
        AcCfg.CrossOneServerTaskItem = CrossOneServerTaskItem;
        __reflect(CrossOneServerTaskItem.prototype, "Config.AcCfg.CrossOneServerTaskItem");
        var CrossOneServerAwardItem = (function (_super) {
            __extends(CrossOneServerAwardItem, _super);
            function CrossOneServerAwardItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CrossOneServerAwardItem;
        }(BaseItemCfg));
        AcCfg.CrossOneServerAwardItem = CrossOneServerAwardItem;
        __reflect(CrossOneServerAwardItem.prototype, "Config.AcCfg.CrossOneServerAwardItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=CrossOneServerCfg.js.map