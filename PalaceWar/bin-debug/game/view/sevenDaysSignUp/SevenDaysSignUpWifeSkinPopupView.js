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
 * 七日好礼红颜info
 * @author 张朝阳
 * date 2019/3/21
 * @class SevenDaysSignUpWifeInfoPopupView
 */
var SevenDaysSignUpWifeSkinPopupView = (function (_super) {
    __extends(SevenDaysSignUpWifeSkinPopupView, _super);
    function SevenDaysSignUpWifeSkinPopupView() {
        return _super.call(this) || this;
    }
    SevenDaysSignUpWifeSkinPopupView.prototype.initView = function () {
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
        var wid = '3022';
        if (PlatformManager.checkIsRuSp()) {
            wid = "3022";
        }
        var wifeCfg = Config.WifeskinCfg.getWifeCfgById(wid);
        var boneName = "";
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
            droWifeIcon.setScale(0.75);
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2;
            droWifeIcon.y = maskContan.y + maskContan.height + 15;
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
        var res = "sevendayssignupview_namebg_7";
        if (PlatformManager.checkIsRuSp()) {
            res += "sevendayssignupview_namebg_7_ru";
        }
        var nameTips = BaseLoadBitmap.create(res);
        nameTips.setPosition(bg.x + 5, bg.y + 15);
        this.addChildToContainer(nameTips);
        var descres = "sevendayssignupview_descbg_7";
        if (PlatformManager.checkIsRuSp()) {
            descres += "sevendayssignupview_descbg_7_ru";
        }
        var buttomTip = BaseLoadBitmap.create(descres);
        buttomTip.width = 534;
        buttomTip.height = 33;
        buttomTip.setPosition(bg.x + bg.width / 2 - buttomTip.width / 2, bg.y + bg.height - buttomTip.height);
        this.addChildToContainer(buttomTip);
    };
    SevenDaysSignUpWifeSkinPopupView.prototype.getResourceList = function () {
        var arr = [];
        if (PlatformManager.checkIsRuSp()) {
            arr.push("sevendayssignupview_namebg_7_ru", "sevendayssignupview_descbg_7_ru");
        }
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    SevenDaysSignUpWifeSkinPopupView.prototype.getTitleStr = function () {
        return "sevenDaysSignUpWifeInfoPopupViewTitle";
    };
    SevenDaysSignUpWifeSkinPopupView.prototype.getShowHeight = function () {
        return 525 + 10;
    };
    SevenDaysSignUpWifeSkinPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SevenDaysSignUpWifeSkinPopupView;
}(PopupView));
__reflect(SevenDaysSignUpWifeSkinPopupView.prototype, "SevenDaysSignUpWifeSkinPopupView");
//# sourceMappingURL=SevenDaysSignUpWifeSkinPopupView.js.map