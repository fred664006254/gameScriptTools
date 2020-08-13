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
var EmperorWarRewardViewTab2 = (function (_super) {
    __extends(EmperorWarRewardViewTab2, _super);
    function EmperorWarRewardViewTab2() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    Object.defineProperty(EmperorWarRewardViewTab2.prototype, "cfg", {
        get: function () {
            return Config.EmperorwarCfg;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarRewardViewTab2.prototype.getListType = function () {
        return 2;
    };
    EmperorWarRewardViewTab2.prototype.initView = function () {
        var view = this;
        var viewbg = view.getViewBg();
        view.width = GameConfig.stageWidth + 18;
        var cfg = view.cfg;
        var arr = [];
        for (var i in cfg.cheerRewardList) {
            var unit = cfg.cheerRewardList[i];
            unit.type = 2;
            arr.push(unit);
        }
        var scrollList = ComponentManager.getScrollList(EmperorWarRewardScrollItem, arr, new egret.Rectangle(viewbg.x, 0, viewbg.width - 60, viewbg.height - 55));
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, viewbg, [0, 25 - viewbg.y]);
        view.addChild(scrollList);
    };
    EmperorWarRewardViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EmperorWarRewardViewTab2;
}(CommonViewTab));
__reflect(EmperorWarRewardViewTab2.prototype, "EmperorWarRewardViewTab2");
//# sourceMappingURL=EmperorWarRewardViewTab2.js.map