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
//
var EmperorWarRewardViewTab1 = (function (_super) {
    __extends(EmperorWarRewardViewTab1, _super);
    function EmperorWarRewardViewTab1() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    Object.defineProperty(EmperorWarRewardViewTab1.prototype, "cfg", {
        get: function () {
            return Config.EmperorwarCfg;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarRewardViewTab1.prototype.getListType = function () {
        return 1;
    };
    EmperorWarRewardViewTab1.prototype.initView = function () {
        var view = this;
        var viewbg = view.getViewBg();
        view.width = GameConfig.stageWidth + 18;
        // let txt1 : BaseTextField= ComponentManager.getTextField(LanguageManager.getlocal("emperorWarTitle"),24,TextFieldConst.COLOR_BLACK);
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, txt1, viewbg, [0,20 - viewbg.y]);
        // view.addChild(txt1);
        var winBottomBg = BaseBitmap.create("emptquan");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, winBottomBg, view, [-10, 10]);
        view.addChild(winBottomBg);
        var distance = (winBottomBg.width - (4 * 45 + 82 * 3)) / 2 - 20;
        // for(var index = 1; index <= 3; index++){
        // 	let prerogativIcon = ComponentManager.getButton(`prestige_prerogative${index}`,'',view.empriorHandler,view,[index]);//BaseBitmap.create("prestige_prerogative"+index);
        // 	view.setLayoutPosition(LayoutConst.leftverticalCenter, prerogativIcon, winBottomBg, [distance + (45 + 82) * (index - 1),20]);
        // 	view.addChild(prerogativIcon);
        // }
        for (var index = 1; index <= 4; index++) {
            var prerogativIcon = ComponentManager.getButton("prestige_prerogative" + index, '', view.empriorHandler, view, [index]); //BaseBitmap.create("prestige_prerogative"+index);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, prerogativIcon, winBottomBg, [distance + (45 + 82) * (index - 1), 20]);
            view.addChild(prerogativIcon);
        }
        var cfg = view.cfg;
        var arr = [];
        for (var i in cfg.rankRewardList) {
            var unit = cfg.rankRewardList[i];
            unit.type = 1;
            arr.push(unit);
        }
        var scrollList = ComponentManager.getScrollList(EmperorWarRewardScrollItem, arr, new egret.Rectangle(viewbg.x, winBottomBg.y + winBottomBg.height, viewbg.width - 60, viewbg.height - winBottomBg.height - 75));
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, viewbg, [0, winBottomBg.y + winBottomBg.height - viewbg.y]);
        view.addChild(scrollList);
    };
    EmperorWarRewardViewTab1.prototype.empriorHandler = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGEITEMPOPUPVIEW, { itemId: param });
    };
    EmperorWarRewardViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EmperorWarRewardViewTab1;
}(CommonViewTab));
__reflect(EmperorWarRewardViewTab1.prototype, "EmperorWarRewardViewTab1");
//# sourceMappingURL=EmperorWarRewardViewTab1.js.map