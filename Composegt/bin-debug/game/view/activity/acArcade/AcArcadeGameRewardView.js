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
/**
 * 拉霸机 -奖池
 * author 张朝阳
 * date 2019/6/13
 * @class AcArcadeGameRewardView
 */
var AcArcadeGameRewardView = (function (_super) {
    __extends(AcArcadeGameRewardView, _super);
    function AcArcadeGameRewardView() {
        return _super.call(this) || this;
    }
    AcArcadeGameRewardView.prototype.getCnCode = function () {
        var code = this.param.data.code;
        if (code == "2" || code == "3") {
            code = "1";
        }
        return code;
    };
    AcArcadeGameRewardView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        bg.height = 700;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 520, 680);
        var scrollList = ComponentManager.getScrollList(AcArcadeGameRewardScrollItem, cfg.poolListItemCfg, rect, { aid: aid, code: code });
        scrollList.setPosition(bg.x + 10, bg.y + 10);
        this.addChildToContainer(scrollList);
    };
    AcArcadeGameRewardView.prototype.getTitleStr = function () {
        return "acArcadeGameRewardViewTitle-" + this.getCnCode();
    };
    AcArcadeGameRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_db_01", "acarcadeview_machine-1", "acarcadeview_logdown-1", "acarcadeview_arrow",
        ]);
    };
    AcArcadeGameRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcArcadeGameRewardView;
}(PopupView));
__reflect(AcArcadeGameRewardView.prototype, "AcArcadeGameRewardView");
