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
 * 门客预览
 * author yangchengguo
 * date 2019.8.20
 * @class AcThrowStoneRewardPopViewTab3
 */
var AcThrowStoneRewardPopViewTab3 = (function (_super) {
    __extends(AcThrowStoneRewardPopViewTab3, _super);
    function AcThrowStoneRewardPopViewTab3() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    AcThrowStoneRewardPopViewTab3.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 680;
        bg.setPosition(25, 60);
        this.addChild(bg);
        var msgBg = BaseBitmap.create("acthrowstone_preview_msg_bg");
        msgBg.setPosition(bg.x + bg.width / 2 - msgBg.width / 2, bg.y);
        this.addChild(msgBg);
        var msgLine = BaseBitmap.create("acthrowstone_preview_line");
        msgLine.setPosition(msgBg.x + msgBg.width / 2 - msgLine.width / 2, msgBg.y + msgBg.height - msgLine.height + 2);
        this.addChild(msgLine);
        var needData = this.vo.getServantData();
        var topMsg = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneServantTopMsg-" + this.getTypeCode(), [String(needData.needNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topMsg.setPosition(msgBg.x + msgBg.width / 2 - topMsg.width / 2, msgBg.y + msgBg.height / 2 - topMsg.height / 2);
        this.addChild(topMsg);
        var servantBg = BaseBitmap.create("acthrowstone_servant_preview_bg");
        servantBg.setPosition(msgBg.x + msgBg.width / 2 - servantBg.width / 2, msgBg.y + msgBg.height);
        this.addChild(servantBg);
        var servantId = this.cfg.show2;
        var servantCfg = Config.ServantCfg.getServantItemById(servantId);
        var rect = new egret.Rectangle(0, 0, servantBg.width, servantBg.height);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = servantBg.width;
        maskContan.height = servantBg.height;
        maskContan.mask = rect;
        maskContan.setPosition(servantBg.x, servantBg.y);
        this.addChild(maskContan);
        // let dagonBonesName = Api.servantVoApi.getServantBoneId(servantId);
        // let boneName = undefined;
        // if (servantCfg && dagonBonesName) {
        //     boneName = dagonBonesName + "_ske";
        // }
        var dagonBonesName = "servant_full2_" + servantId;
        var boneName = undefined;
        if (servantCfg && dagonBonesName) {
            boneName = dagonBonesName + "_ske";
        }
        App.LogUtil.log("boneNAME:" + dagonBonesName);
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            droWifeIcon.setScale(0.8);
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2;
            droWifeIcon.y = maskContan.y + maskContan.height - 30;
            maskContan.addChild(droWifeIcon);
        }
        else {
            var servantImg = BaseLoadBitmap.create(servantCfg.fullIcon);
            servantImg.width = 405;
            servantImg.height = 467;
            servantImg.anchorOffsetY = servantImg.height;
            servantImg.anchorOffsetX = servantImg.width / 2;
            servantImg.setScale(0.89);
            servantImg.x = maskContan.width / 2;
            servantImg.y = maskContan.y + maskContan.height;
            maskContan.addChild(servantImg);
        }
        var servantLine = BaseBitmap.create("acthrowstone_preview_line");
        servantLine.setPosition(servantBg.x + servantBg.width / 2 - servantLine.width / 2, servantBg.y + servantBg.height - servantLine.height + 4);
        this.addChild(servantLine);
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(servantBg.x, servantBg.y + 20);
        this.addChild(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
        this.addChild(skinNameTxt);
        var buttomBg = BaseBitmap.create("public_9_bg14");
        buttomBg.width = 516;
        buttomBg.height = 244;
        buttomBg.setPosition(servantBg.x + servantBg.width / 2 - buttomBg.width / 2, servantBg.y + servantBg.height + 7);
        this.addChild(buttomBg);
        var descBg = BaseBitmap.create("public_9_managebg");
        descBg.width = 500;
        descBg.height = 134;
        descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
        this.addChild(descBg);
        var aptitudeTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAptitude", [String(Api.servantVoApi.getServantAptitude(servantCfg.id))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        aptitudeTF.setPosition(buttomBg.x + 30, buttomBg.y + 30);
        this.addChild(aptitudeTF);
        var speciality = servantCfg.speciality;
        var str = "";
        for (var i = 0; i < speciality.length; i++) {
            str += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，";
        }
        var servantTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAdvantage", [str.substr(0, str.length - 1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        servantTF.setPosition(buttomBg.x + 30, aptitudeTF.y + 30);
        this.addChild(servantTF);
        var servantDescTxt = ComponentManager.getTextField(servantCfg.story, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        servantDescTxt.lineSpacing = 3;
        servantDescTxt.width = descBg.width - 50;
        servantDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
        this.addChild(servantDescTxt);
        if (servantCfg.quality2) {
            var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 475;
            cornerImg.y = 403;
            cornerImg.setScale(1.3);
            this.addChild(cornerImg);
        }
    };
    Object.defineProperty(AcThrowStoneRewardPopViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.getAid(), this.getCode());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowStoneRewardPopViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.getAid(), this.getCode());
        },
        enumerable: true,
        configurable: true
    });
    AcThrowStoneRewardPopViewTab3.prototype.getAid = function () {
        return this.aid ? this.aid : this.param.data.aid;
    };
    AcThrowStoneRewardPopViewTab3.prototype.getCode = function () {
        return this.code ? this.code : this.param.data.code;
    };
    AcThrowStoneRewardPopViewTab3.prototype.getTypeCode = function () {
        var code = this.getCode();
        if (code == "2") {
            return "1";
        }
        return code;
    };
    AcThrowStoneRewardPopViewTab3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThrowStoneRewardPopViewTab3;
}(AcCommonViewTab));
__reflect(AcThrowStoneRewardPopViewTab3.prototype, "AcThrowStoneRewardPopViewTab3");
//# sourceMappingURL=AcThrowStoneRewardPopViewTab3.js.map