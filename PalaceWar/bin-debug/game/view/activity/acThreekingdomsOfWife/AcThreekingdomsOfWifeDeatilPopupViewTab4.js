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
 * 佳人预览
 * author ycg
 * date 2020.2.11
 * @class AcThreekingdomsOfWifeDetailPopupViewTab4
 */
var AcThreekingdomsOfWifeDetailPopupViewTab4 = (function (_super) {
    __extends(AcThreekingdomsOfWifeDetailPopupViewTab4, _super);
    function AcThreekingdomsOfWifeDetailPopupViewTab4(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcThreekingdomsOfWifeDetailPopupViewTab4.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 680;
        bg.setPosition(20, 60);
        this.addChild(bg);
        var msgBg = BaseBitmap.create("acthrowstone_preview_msg_bg");
        msgBg.setPosition(bg.x + bg.width / 2 - msgBg.width / 2, bg.y);
        this.addChild(msgBg);
        var msgLine = BaseBitmap.create("acthrowstone_preview_line");
        msgLine.setPosition(msgBg.x + msgBg.width / 2 - msgLine.width / 2, msgBg.y + msgBg.height - msgLine.height + 2);
        this.addChild(msgLine);
        var needData = this.vo.getWifeData();
        var topMsg = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsOfWifeSkinTopMsg-" + this.getTypeCode(), [String(needData.needNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topMsg.setPosition(msgBg.x + msgBg.width / 2 - topMsg.width / 2, msgBg.y + msgBg.height / 2 - topMsg.height / 2);
        this.addChild(topMsg);
        var wifeBg = BaseBitmap.create("acthrowarrowview_wifeskinbg");
        wifeBg.setPosition(msgBg.x + msgBg.width / 2 - wifeBg.width / 2, msgBg.y + msgBg.height);
        this.addChild(wifeBg);
        var wifeBgRect = new egret.Rectangle(wifeBg.width / 2 - bg.width / 2 + 3, 0, bg.width - 6, wifeBg.height);
        wifeBg.mask = wifeBgRect;
        var wifeId = this.cfg.show;
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var servantCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
        var rect = new egret.Rectangle(0, 0, wifeBg.width, wifeBg.height - 7);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = wifeBg.width;
        maskContan.height = wifeBg.height - 7;
        maskContan.mask = rect;
        maskContan.setPosition(wifeBg.x, wifeBg.y);
        this.addChild(maskContan);
        var boneName = undefined;
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
            droWifeIcon.setScale(0.75);
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
        // let wifeLine = BaseBitmap.create("acthrowstone_preview_line");
        // wifeLine.setPosition(wifeBg.x + wifeBg.width/2 - wifeLine.width/2, wifeBg.y + wifeBg.height - wifeLine.height + 4);
        // this.addChild(wifeLine);
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(wifeBg.x, wifeBg.y + 20);
        this.addChild(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
        this.addChild(skinNameTxt);
        var buttomBg = BaseBitmap.create("public_9_bg14");
        buttomBg.width = 516;
        buttomBg.height = 244;
        buttomBg.setPosition(wifeBg.x + wifeBg.width / 2 - buttomBg.width / 2, wifeBg.y + wifeBg.height + 4);
        this.addChild(buttomBg);
        var descBg = BaseBitmap.create("public_9_managebg");
        descBg.width = 500;
        descBg.height = 134;
        descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
        this.addChild(descBg);
        //初始魅力
        var initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [wifeCfg.glamour + '']);
        var initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        initialCharmTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
        this.addChild(initialCharmTxt);
        //加成门客
        var servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [servantCfg.name]);
        var servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        servantAddTxt.setPosition(buttomBg.x + 30, initialCharmTxt.y + 30);
        this.addChild(servantAddTxt);
        // let wifeDescStr = LanguageManager.getlocal('wifeDesc_' + wifeId);
        var wifeDescTxt = ComponentManager.getTextField(wifeCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        wifeDescTxt.lineSpacing = 3;
        wifeDescTxt.width = descBg.width - 50;
        wifeDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
        this.addChild(wifeDescTxt);
    };
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.getAid(), this.getCode());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.getAid(), this.getCode());
        },
        enumerable: true,
        configurable: true
    });
    AcThreekingdomsOfWifeDetailPopupViewTab4.prototype.getAid = function () {
        return this.param.data.aid;
    };
    AcThreekingdomsOfWifeDetailPopupViewTab4.prototype.getCode = function () {
        return this.param.data.code;
    };
    AcThreekingdomsOfWifeDetailPopupViewTab4.prototype.getTypeCode = function () {
        var code = this.getCode();
        if (code == "2") {
            return "1";
        }
        if (code == "4") {
            return "3";
        }
        return code;
    };
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreekingdomsOfWifeDetailPopupViewTab4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThreekingdomsOfWifeDetailPopupViewTab4;
}(CommonViewTab));
__reflect(AcThreekingdomsOfWifeDetailPopupViewTab4.prototype, "AcThreekingdomsOfWifeDetailPopupViewTab4");
//# sourceMappingURL=AcThreekingdomsOfWifeDeatilPopupViewTab4.js.map