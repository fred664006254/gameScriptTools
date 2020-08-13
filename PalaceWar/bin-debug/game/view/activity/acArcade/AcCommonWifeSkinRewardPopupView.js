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
 * 	通用红颜衣装预览
 * @author 张朝阳
 * date 2019/6/10
 * @class AcCommonWifeSkinRewardPopupView
 */
var AcCommonWifeSkinRewardPopupView = (function (_super) {
    __extends(AcCommonWifeSkinRewardPopupView, _super);
    function AcCommonWifeSkinRewardPopupView() {
        return _super.call(this) || this;
    }
    AcCommonWifeSkinRewardPopupView.prototype.initView = function () {
        var skinId = this.param.data.skinId;
        var topMsg = this.param.data.topMsg;
        var wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeSkinCfg.wifeId);
        var bg = BaseLoadBitmap.create("acchristmasview_rewardmidbg_4");
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
        var boneName = "";
        if (wifeSkinCfg && wifeSkinCfg.bone) {
            boneName = wifeSkinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(boneName)) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
            droWifeIcon.setScale(0.85);
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2;
            droWifeIcon.y = maskContan.y + maskContan.height - 5 + 121;
            maskContan.addChild(droWifeIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(wifeSkinCfg.body);
            skinImg.width = 640;
            skinImg.height = 840;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.55);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 5 + 70;
            maskContan.addChild(skinImg);
        }
        var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 544;
        topbg.height = 36;
        topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
        this.addChildToContainer(topbg);
        var topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        this.addChildToContainer(topDesc);
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 20);
        this.addChildToContainer(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(wifeSkinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        this.addChildToContainer(skinNameTxt);
        var skinTitle = App.CommonUtil.getWifeSkinFlagById(skinId);
        if (skinTitle) {
            skinTitle.setPosition(bg.x + bg.width / 2 - skinTitle.width / 2, bg.y + bg.height - skinTitle.height - 10);
            this.addChildToContainer(skinTitle);
        }
        var servantNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        this.addChildToContainer(servantNameTxt);
        var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 530;
        buttomBg.height = 246;
        buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
        this.addChildToContainer(buttomBg);
        var buttomBg2 = BaseBitmap.create("public_9_bg14");
        buttomBg2.width = 525;
        buttomBg2.height = 234;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        this.addChildToContainer(buttomBg2);
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + wifeSkinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
        this.addChildToContainer(skinTipTxt);
        var resultStrList = this.dealAttrChangeInfo(wifeSkinCfg.id);
        var infoBg = BaseBitmap.create("public_9_managebg");
        infoBg.width = 510;
        infoBg.height = 104;
        infoBg.setPosition(buttomBg2.x + buttomBg2.width / 2 - infoBg.width / 2, skinTipTxt.y + skinTipTxt.height + 13);
        this.addChildToContainer(infoBg);
        var startY = 13;
        for (var index = 0; index < resultStrList.length; index++) {
            var desc = ComponentManager.getTextField(resultStrList[index], TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            var posX = index % 2 == 0 ? infoBg.x + 15 : infoBg.x + 280;
            var posY = infoBg.y + startY;
            desc.setPosition(posX, posY);
            this.addChildToContainer(desc);
            if (index % 2 > 0) {
                startY = startY + 28;
            }
        }
        var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifeSkinRewardPopupViewButtomDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
        this.addChildToContainer(buttomTipTxt);
    };
    AcCommonWifeSkinRewardPopupView.prototype.dealAttrChangeInfo = function (skinId) {
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        // let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
        var resultStr = [];
        var atkAdd = skinCfg.atkAdd;
        var inteAdd = skinCfg.inteAdd;
        var politicsAdd = skinCfg.politicsAdd;
        var charmAdd = skinCfg.charmAdd;
        var atkAdd2 = skinCfg.atkAdd2;
        var inteAdd2 = skinCfg.inteAdd2;
        var politicsAdd2 = skinCfg.politicsAdd2;
        var charmAdd2 = skinCfg.charmAdd2;
        var wifeIntimacy = skinCfg.wifeIntimacy;
        var wifeGlamour = skinCfg.wifeGlamour;
        var childReduce = skinCfg.childReduce;
        var searchReduce = skinCfg.searchReduce;
        var wifeReduce = skinCfg.wifeReduce;
        if (atkAdd) {
            if (atkAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1] * 100 + "%"]));
            }
        }
        if (inteAdd) {
            if (inteAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1] * 100 + "%"]));
            }
        }
        if (politicsAdd) {
            if (politicsAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1] * 100 + "%"]));
            }
        }
        if (charmAdd) {
            if (charmAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1] * 100 + "%"]));
            }
        }
        var wifeCfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
        var servantName = LanguageManager.getlocal("servant_name" + wifeCfg.servantId);
        if (atkAdd2) {
            if (atkAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd10", [servantName, atkAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd10", [servantName, atkAdd2[1] * 100 + "%"]));
            }
        }
        if (inteAdd2) {
            if (inteAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd11", [servantName, inteAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd11", [servantName, inteAdd2[1] * 100 + "%"]));
            }
        }
        if (politicsAdd2) {
            if (politicsAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd12", [servantName, politicsAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd12", [servantName, politicsAdd2[1] * 100 + "%"]));
            }
        }
        if (charmAdd2) {
            if (charmAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd13", [servantName, charmAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd13", [servantName, charmAdd2[1] * 100 + "%"]));
            }
        }
        if (wifeIntimacy && wifeIntimacy > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd5", [wifeIntimacy.toString()]));
        }
        if (wifeGlamour && wifeGlamour > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd6", [wifeGlamour.toString()]));
        }
        if (childReduce && childReduce > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd7", [childReduce.toString()]));
        }
        if (searchReduce && searchReduce > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd8", [searchReduce.toString()]));
        }
        if (wifeReduce && wifeReduce > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd9", [wifeReduce.toString()]));
        }
        return resultStr;
    };
    AcCommonWifeSkinRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg",
        ]);
    };
    AcCommonWifeSkinRewardPopupView.prototype.getTitleStr = function () {
        return "acCommonWifeSkinRewardPopupViewTitle";
    };
    // protected getShowHeight() {
    // 	return 720;
    // }
    AcCommonWifeSkinRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCommonWifeSkinRewardPopupView;
}(PopupView));
__reflect(AcCommonWifeSkinRewardPopupView.prototype, "AcCommonWifeSkinRewardPopupView");
//# sourceMappingURL=AcCommonWifeSkinRewardPopupView.js.map