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
  * 比武招亲额外奖励
  * @author 张朝阳
  * date 2018/12/18
  * @class AcMarryRewardPopupView
  */
var AcMarryRewardPopupView = (function (_super) {
    __extends(AcMarryRewardPopupView, _super);
    function AcMarryRewardPopupView() {
        return _super.call(this) || this;
    }
    AcMarryRewardPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 646;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcMarryRewardScrollItem, cfg.getBattleUseItemCfgList(), rect, { aid: aid, code: code });
        scrollList.setPosition(bg.x + bg.width / 2 - scrollList.width / 2, bg.y + bg.height / 2 - scrollList.height / 2);
        this.addChildToContainer(scrollList);
    };
    AcMarryRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_namebg",
        ]);
    };
    AcMarryRewardPopupView.prototype.getTitleStr = function () {
        if (this.param.data.code == "1") {
            return "acMarryRewardInfoViewTitle";
        }
        return "acMarryRewardInfoViewTitle-" + this.param.data.code;
    };
    AcMarryRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMarryRewardPopupView;
}(PopupView));
__reflect(AcMarryRewardPopupView.prototype, "AcMarryRewardPopupView");
//# sourceMappingURL=AcMarryRewardPopupView.js.map