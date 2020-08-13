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
 * 衣装预览 红颜
 * @author shaoliang
 * date 2019/5/7
 * @class ChoshespreviewWifeInfoPopupView
 */
var ChoshespreviewWifeInfoPopupView = (function (_super) {
    __extends(ChoshespreviewWifeInfoPopupView, _super);
    function ChoshespreviewWifeInfoPopupView() {
        return _super.call(this) || this;
    }
    ChoshespreviewWifeInfoPopupView.prototype.initView = function () {
        var wifeId = this.param.data.wid;
        var bg = BaseLoadBitmap.create("sevendayssignupview_infobg_7");
        bg.width = 544;
        bg.height = 462;
        ;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 544, 462);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 544;
        maskContan.height = 462;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y);
        this.addChildToContainer(maskContan);
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var boneName = "";
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
            droWifeIcon.setScale(0.72);
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2;
            droWifeIcon.y = maskContan.y + maskContan.height;
            maskContan.addChild(droWifeIcon);
        }
        else {
            var wifeImg = BaseLoadBitmap.create(wifeCfg.body);
            wifeImg.width = 640;
            wifeImg.height = 840;
            wifeImg.anchorOffsetY = wifeImg.height;
            wifeImg.anchorOffsetX = wifeImg.width / 2;
            wifeImg.setScale(0.52);
            wifeImg.x = maskContan.width / 2;
            wifeImg.y = maskContan.y + maskContan.height;
            maskContan.addChild(wifeImg);
        }
        var nameTips = BaseLoadBitmap.create("clothespreview_wifename" + wifeId);
        nameTips.setPosition(bg.x + 5, bg.y + 15);
        this.addChildToContainer(nameTips);
        var buttomTip = BaseLoadBitmap.create("clothespreview_wifetip" + wifeId);
        buttomTip.width = 534;
        buttomTip.height = 33;
        buttomTip.setPosition(bg.x + bg.width / 2 - buttomTip.width / 2, bg.y + bg.height - buttomTip.height);
        this.addChildToContainer(buttomTip);
    };
    ChoshespreviewWifeInfoPopupView.prototype.getTitleStr = function () {
        return "sevenDaysSignUpWifeInfoPopupViewTitle";
    };
    ChoshespreviewWifeInfoPopupView.prototype.getShowHeight = function () {
        return 525 + 10;
    };
    ChoshespreviewWifeInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ChoshespreviewWifeInfoPopupView;
}(PopupView));
__reflect(ChoshespreviewWifeInfoPopupView.prototype, "ChoshespreviewWifeInfoPopupView");
//# sourceMappingURL=ChoshespreviewWifeInfoPopupView.js.map