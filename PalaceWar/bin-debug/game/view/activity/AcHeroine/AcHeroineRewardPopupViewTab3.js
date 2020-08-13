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
 * 巾帼英雄红颜奖励
 * date 2019.11.11
 */
var AcHeroineRewardPopupViewTab3 = (function (_super) {
    __extends(AcHeroineRewardPopupViewTab3, _super);
    function AcHeroineRewardPopupViewTab3() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    AcHeroineRewardPopupViewTab3.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 532;
        bg.height = 670;
        bg.setPosition(34, 50);
        this.addChild(bg);
        var topMsg = LanguageManager.getlocal("acHeroineWifeTopMsg-" + this.code);
        var container = this.getClothesView("" + this.cfg.show1, null, topMsg);
        container.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(container);
    };
    //门客或者佳人
    AcHeroineRewardPopupViewTab3.prototype.getClothesView = function (clothesId, bgName, topMsg, scale, offY) {
        var container = new BaseDisplayObjectContainer();
        container.width = 544;
        var view = this;
        var isWife = false;
        var clothesCfg = Config.WifeCfg.getWifeCfgById(clothesId);
        // let bgStr = "sevendayssignupview_infobg_2";
        var bgStr = "acthrowarrowview_wifeskinbg";
        if (clothesCfg) {
            isWife = true;
            bgStr = "acthrowarrowview_wifeskinbg";
        }
        else {
            clothesCfg = Config.ServantCfg.getServantItemById(clothesId);
            bgStr = "acthrowarrowview_wifeskinbg";
        }
        if (bgName) {
            bgStr = bgName;
        }
        var bg = BaseLoadBitmap.create(bgStr);
        bg.width = 532;
        bg.height = 400;
        ;
        container.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height - 3);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = bg.width;
        maskContan.height = bg.height;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x, bg.y - 2);
        container.addChild(maskContan);
        var buttomBg_ = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg_.width = 536;
        buttomBg_.height = 254;
        buttomBg_.setPosition(container.width / 2 - buttomBg_.width / 2, bg.y + bg.height - 3);
        container.addChild(buttomBg_);
        buttomBg_.visible = false;
        var buttomBg = BaseBitmap.create("public_9_bg14");
        buttomBg.width = 540;
        buttomBg.height = 244;
        buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, buttomBg_.y);
        container.addChild(buttomBg);
        var descBg = BaseBitmap.create("public_9_managebg");
        descBg.width = 520;
        descBg.height = 134;
        descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
        container.addChild(descBg);
        if (isWife) {
            var boneName = undefined;
            if (clothesCfg && clothesCfg.bone) {
                boneName = clothesCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(clothesCfg.bone);
                if (scale) {
                    droWifeIcon.setScale(scale);
                }
                else {
                    droWifeIcon.setScale(0.57);
                }
                droWifeIcon.anchorOffsetY = droWifeIcon.height;
                droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
                droWifeIcon.x = maskContan.width / 2;
                droWifeIcon.y = maskContan.y + maskContan.height - 2 - 3; //+5
                if (offY) {
                    droWifeIcon.y += offY;
                }
                maskContan.addChild(droWifeIcon);
            }
            else {
                var wifeImg = BaseLoadBitmap.create(clothesCfg.body);
                wifeImg.width = 640;
                wifeImg.height = 840;
                wifeImg.anchorOffsetY = wifeImg.height;
                wifeImg.anchorOffsetX = wifeImg.width / 2;
                wifeImg.setScale(0.43);
                wifeImg.x = maskContan.width / 2;
                wifeImg.y = maskContan.y + maskContan.height + 5;
                maskContan.addChild(wifeImg);
            }
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 30);
            container.addChild(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(clothesCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
            container.addChild(skinNameTxt);
            //初始魅力
            var initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [clothesCfg.glamour + '']);
            var initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            initialCharmTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
            container.addChild(initialCharmTxt);
            //加成门客
            var servantCfg = Config.ServantCfg.getServantItemById(clothesCfg.servantId);
            var servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [servantCfg.name]);
            var servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            servantAddTxt.setPosition(buttomBg.x + 30, initialCharmTxt.y + 30);
            container.addChild(servantAddTxt);
            // let wifeDescStr = LanguageManager.getlocal('wifeDesc_' + wifeId);
            var wifeDescTxt = ComponentManager.getTextField(clothesCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            wifeDescTxt.lineSpacing = 3;
            wifeDescTxt.width = descBg.width - 40;
            wifeDescTxt.setPosition(descBg.x + 20, descBg.y + descBg.height / 2 - wifeDescTxt.height / 2);
            container.addChild(wifeDescTxt);
        }
        else {
            var dagonBonesName = "servant_full2_" + clothesId;
            var boneName = undefined;
            if (clothesCfg && dagonBonesName) {
                boneName = dagonBonesName + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var servantIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                if (scale) {
                    servantIcon.setScale(scale);
                }
                else {
                    servantIcon.setScale(0.7);
                }
                servantIcon.anchorOffsetY = servantIcon.height;
                servantIcon.anchorOffsetX = servantIcon.width / 2;
                servantIcon.x = maskContan.width / 2;
                servantIcon.y = maskContan.y + maskContan.height - 5;
                if (offY) {
                    servantIcon.y += offY;
                }
                maskContan.addChild(servantIcon);
            }
            else {
                var servantImg = BaseLoadBitmap.create(clothesCfg.fullIcon);
                servantImg.width = 405;
                servantImg.height = 467;
                servantImg.anchorOffsetY = servantImg.height;
                servantImg.anchorOffsetX = servantImg.width / 2;
                servantImg.setScale(0.8);
                servantImg.x = maskContan.width / 2;
                servantImg.y = maskContan.y + maskContan.height + 5;
                maskContan.addChild(servantImg);
            }
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 30);
            container.addChild(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(clothesCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
            container.addChild(skinNameTxt);
            var aptitudeTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAptitude", [String(Api.servantVoApi.getServantAptitude(clothesCfg.id))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            aptitudeTF.setPosition(buttomBg.x + 30, buttomBg.y + 30);
            container.addChild(aptitudeTF);
            var speciality = clothesCfg.speciality;
            var str = "";
            for (var i = 0; i < speciality.length; i++) {
                str += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，";
            }
            var servantTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAdvantage", [str.substr(0, str.length - 1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            servantTF.setPosition(buttomBg.x + 30, aptitudeTF.y + 30);
            container.addChild(servantTF);
            var servantDescTxt = ComponentManager.getTextField(clothesCfg.story, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            servantDescTxt.lineSpacing = 3;
            servantDescTxt.width = descBg.width - 40;
            servantDescTxt.setPosition(descBg.x + 20, descBg.y + descBg.height / 2 - servantDescTxt.height / 2);
            container.addChild(servantDescTxt);
        }
        if (topMsg) {
            var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            topbg.width = 530;
            topbg.height = 36;
            topbg.setPosition(container.width / 2 - topbg.width / 2 - 5, 0);
            container.addChild(topbg);
            var topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
            container.addChild(topDesc);
        }
        return container;
    };
    Object.defineProperty(AcHeroineRewardPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHeroineRewardPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcHeroineRewardPopupViewTab3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        else if (this.code == "4") {
            return "3";
        }
        else if (this.code == "6") {
            return "5";
        }
        else if (this.code == "8") {
            return "7";
        }
        else if (this.code == "10") {
            return "9";
        }
        return this.code;
    };
    AcHeroineRewardPopupViewTab3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcHeroineRewardPopupViewTab3;
}(AcCommonViewTab));
__reflect(AcHeroineRewardPopupViewTab3.prototype, "AcHeroineRewardPopupViewTab3");
//# sourceMappingURL=AcHeroineRewardPopupViewTab3.js.map