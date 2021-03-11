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
 * 	欢乐沙塔 门客
 * author 张朝阳
 * date 2018/3/5
 * @class AcChristmasServantRewardPopupView
 */
var AcChristmasServantRewardPopupView = (function (_super) {
    __extends(AcChristmasServantRewardPopupView, _super);
    function AcChristmasServantRewardPopupView() {
        return _super.call(this) || this;
    }
    AcChristmasServantRewardPopupView.prototype.initView = function () {
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        var acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var servantCfg = Config.ServantCfg.getServantItemById(acCfg.skin);
        var bg = BaseLoadBitmap.create("acchristmasview_rewardmidbg");
        bg.width = 544;
        bg.height = 400;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 544, 364);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 544;
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
        this.addChildToContainer(maskContan);
        var skinImg = BaseLoadBitmap.create(servantCfg.fullIcon);
        skinImg.width = 405;
        skinImg.height = 467;
        skinImg.anchorOffsetY = skinImg.height;
        skinImg.anchorOffsetX = skinImg.width / 2;
        skinImg.setScale(0.87);
        skinImg.x = maskContan.width / 2;
        skinImg.y = maskContan.y + maskContan.height + 25;
        maskContan.addChild(skinImg);
        var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 544;
        topbg.height = 36;
        topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
        this.addChildToContainer(topbg);
        var topDesc = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasBigRewardPopupViewTopDesc_" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        this.addChildToContainer(topDesc);
        var skinnamebg = BaseBitmap.create("acchristmasview_bigreward_" + this.code);
        skinnamebg.setPosition(bg.x, bg.y + 20);
        this.addChildToContainer(skinnamebg);
        var ruleBg = BaseLoadBitmap.create("acchristmasview_bigreward_buttombg_" + this.code);
        ruleBg.width = 534;
        ruleBg.height = 33;
        ruleBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - ruleBg.width / 2, bg.y + bg.height - ruleBg.height - 5);
        this.addChildToContainer(ruleBg);
    };
    AcChristmasServantRewardPopupView.prototype.getShowHeight = function () {
        return 460 + 12;
    };
    AcChristmasServantRewardPopupView.prototype.getTitleStr = function () {
        return "acChristmasBigRewardPopupViewTitle";
    };
    AcChristmasServantRewardPopupView.prototype.dispose = function () {
        this.aid = null;
        this.code = null;
        _super.prototype.dispose.call(this);
    };
    return AcChristmasServantRewardPopupView;
}(PopupView));
__reflect(AcChristmasServantRewardPopupView.prototype, "AcChristmasServantRewardPopupView");
//# sourceMappingURL=AcChristmasServantRewardPopupView.js.map