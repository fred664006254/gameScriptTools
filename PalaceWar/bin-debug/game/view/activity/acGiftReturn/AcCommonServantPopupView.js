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
 * 活动通用门客板子
 * @author 张朝阳
 * date 2019/7/3
 * @class AcCommonServantPopupView
 */
var AcCommonServantPopupView = (function (_super) {
    __extends(AcCommonServantPopupView, _super);
    function AcCommonServantPopupView() {
        return _super.call(this) || this;
    }
    AcCommonServantPopupView.prototype.initView = function () {
        // let servantCfg = Config.ServantCfg.getServantItemById("1050")
        var servantId = this.param.data.servantId;
        var servantCfg = Config.ServantCfg.getServantItemById(servantId);
        var bg = BaseLoadBitmap.create("sevendayssignupview_infobg_2");
        bg.width = 544;
        bg.height = 462;
        ;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 544, 457);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 544;
        maskContan.height = 457;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y);
        this.addChildToContainer(maskContan);
        var servantImg = BaseLoadBitmap.create(servantCfg.fullIcon);
        servantImg.width = 405;
        servantImg.height = 467;
        servantImg.anchorOffsetY = servantImg.height;
        servantImg.anchorOffsetX = servantImg.width / 2;
        servantImg.setScale(0.89);
        servantImg.x = maskContan.width / 2;
        servantImg.y = maskContan.y + maskContan.height;
        maskContan.addChild(servantImg);
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 20);
        this.addChildToContainer(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
        this.addChildToContainer(skinNameTxt);
        var buttomBg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        buttomBg.width = 544;
        buttomBg.height = 36;
        buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, bg.y + bg.height - buttomBg.height + 5);
        this.addChildToContainer(buttomBg);
        var aptitudeTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAptitude", [String(Api.servantVoApi.getServantAptitude(servantCfg.id))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        aptitudeTF.setPosition(buttomBg.x + 70, buttomBg.y + buttomBg.height / 2 - aptitudeTF.height / 2);
        this.addChildToContainer(aptitudeTF);
        var speciality = servantCfg.speciality;
        var str = "";
        for (var i = 0; i < speciality.length; i++) {
            str += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，";
        }
        var servantTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAdvantage", [str.substr(0, str.length - 1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        servantTF.setPosition(buttomBg.x + 310, buttomBg.y + buttomBg.height / 2 - servantTF.height / 2);
        this.addChildToContainer(servantTF);
        //  let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(clothesCfg.id);
        if (servantCfg.quality2) {
            var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 455;
            cornerImg.y = 313;
            cornerImg.setScale(1.3);
            this.addChildToContainer(cornerImg);
        }
    };
    AcCommonServantPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg",
        ]);
    };
    AcCommonServantPopupView.prototype.getTitleStr = function () {
        return "acCommonServantPopupViewTitle";
    };
    AcCommonServantPopupView.prototype.getShowHeight = function () {
        return 525 + 10;
    };
    AcCommonServantPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCommonServantPopupView;
}(PopupView));
__reflect(AcCommonServantPopupView.prototype, "AcCommonServantPopupView");
//# sourceMappingURL=AcCommonServantPopupView.js.map