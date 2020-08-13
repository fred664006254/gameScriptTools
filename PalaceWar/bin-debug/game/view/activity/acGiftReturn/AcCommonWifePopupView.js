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
 * 活动通用红颜板子
 * @author 张朝阳
 * date 2019/7/3
 * @class AcCommonWifePopupView
 */
var AcCommonWifePopupView = (function (_super) {
    __extends(AcCommonWifePopupView, _super);
    function AcCommonWifePopupView() {
        return _super.call(this) || this;
    }
    AcCommonWifePopupView.prototype.initView = function () {
        // let servantCfg = Config.ServantCfg.getServantItemById("1050")
        var wifeId = this.param.data.wifeId;
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var servantCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
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
        var boneName = "";
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(boneName)) {
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
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 20);
        this.addChildToContainer(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
        this.addChildToContainer(skinNameTxt);
        var buttomBg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        buttomBg.width = 544;
        buttomBg.height = 36;
        buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, bg.y + bg.height - buttomBg.height + 5);
        this.addChildToContainer(buttomBg);
        var charmTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifePopupViewcCharm", [String(wifeCfg.glamour)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        charmTF.setPosition(buttomBg.x + 70, buttomBg.y + buttomBg.height / 2 - charmTF.height / 2);
        this.addChildToContainer(charmTF);
        var servantTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifePopupViewcServant", [String(servantCfg.name)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        servantTF.setPosition(buttomBg.x + 310, buttomBg.y + buttomBg.height / 2 - servantTF.height / 2);
        this.addChildToContainer(servantTF);
    };
    AcCommonWifePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg",
        ]);
    };
    AcCommonWifePopupView.prototype.getTitleStr = function () {
        return "acCommonWifePopupViewTitle";
    };
    AcCommonWifePopupView.prototype.getShowHeight = function () {
        return 525 + 10;
    };
    AcCommonWifePopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCommonWifePopupView;
}(PopupView));
__reflect(AcCommonWifePopupView.prototype, "AcCommonWifePopupView");
//# sourceMappingURL=AcCommonWifePopupView.js.map