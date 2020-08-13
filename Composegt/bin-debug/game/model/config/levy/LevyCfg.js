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
    var LevyCfg;
    (function (LevyCfg) {
        var progress = null;
        var personProgress = null;
        //buff列表
        LevyCfg.buff = null;
        //buff详细内容
        LevyCfg.levybuff = null;
        LevyCfg.LevyItemList = [];
        //解析数据
        function formatData(data) {
            LevyCfg.LevyItemList = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
            var _personProgress = this.personProgress;
            LevyCfg.LevyItemList.push(_personProgress);
            var _progress = this.progress;
            var max = Object.keys(_progress).length;
            for (var i = 1; i <= max; i++) {
                LevyCfg.LevyItemList.push(_progress[i]);
            }
        }
        LevyCfg.formatData = formatData;
        function getBuffInfoCfg(buffId) {
            return this.levybuff[buffId] || {};
        }
        LevyCfg.getBuffInfoCfg = getBuffInfoCfg;
    })(LevyCfg = Config.LevyCfg || (Config.LevyCfg = {}));
    /**
     * buff的触发条件和效果
     */
    var LevyBuffItem = (function (_super) {
        __extends(LevyBuffItem, _super);
        function LevyBuffItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LevyBuffItem;
    }(BaseItemCfg));
    __reflect(LevyBuffItem.prototype, "LevyBuffItem");
    /**
     * 征收BUFF信息配置
     */
    var LevyLevybuffItem = (function (_super) {
        __extends(LevyLevybuffItem, _super);
        function LevyLevybuffItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LevyLevybuffItem;
    }(BaseItemCfg));
    __reflect(LevyLevybuffItem.prototype, "LevyLevybuffItem");
})(Config || (Config = {}));
