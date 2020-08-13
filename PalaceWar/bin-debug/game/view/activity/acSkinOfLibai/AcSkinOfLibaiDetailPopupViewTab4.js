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
 * 门客衣装
 * author ycg
 * date 2020.2.19
 * @class AcSkinOfLibaiDetailPopupViewTab4
 */
var AcSkinOfLibaiDetailPopupViewTab4 = (function (_super) {
    __extends(AcSkinOfLibaiDetailPopupViewTab4, _super);
    function AcSkinOfLibaiDetailPopupViewTab4(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcSkinOfLibaiDetailPopupViewTab4.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 680;
        bg.setPosition(25, 50);
        this.addChild(bg);
        var wifeBg = BaseBitmap.create("acthreekingdomrecharge_skinbg");
        wifeBg.setPosition(bg.x + bg.width / 2 - wifeBg.width / 2, bg.y);
        this.addChild(wifeBg);
        var wifeBgRect = new egret.Rectangle(wifeBg.width / 2 - bg.width / 2 + 3, 0, bg.width - 6, wifeBg.height);
        wifeBg.mask = wifeBgRect;
        var skinId = this.cfg.show;
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var rect = new egret.Rectangle(0, 0, wifeBg.width, wifeBg.height - 7);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = wifeBg.width;
        maskContan.height = wifeBg.height - 7;
        maskContan.mask = rect;
        maskContan.setPosition(wifeBg.x, wifeBg.y);
        this.addChild(maskContan);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            droWifeIcon.setScale(0.9);
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2;
            if (skinId == 10361) {
                droWifeIcon.x = maskContan.width / 2 - 25;
            }
            droWifeIcon.y = maskContan.y + maskContan.height;
            maskContan.addChild(droWifeIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 406;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.9);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height;
            maskContan.addChild(skinImg);
        }
        var wifeLine = BaseBitmap.create("acthrowstone_preview_line");
        wifeLine.setPosition(wifeBg.x + wifeBg.width / 2 - wifeLine.width / 2, wifeBg.y + wifeBg.height - wifeLine.height + 4);
        this.addChild(wifeLine);
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(wifeBg.x, wifeBg.y + 20);
        this.addChild(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        this.addChild(skinNameTxt);
        var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        var servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        this.addChild(servantNameTxt);
        var msgBg = BaseBitmap.create("acthrowstone_preview_msg_bg");
        msgBg.setPosition(bg.x + bg.width / 2 - msgBg.width / 2, bg.y);
        this.addChild(msgBg);
        var msgLine = BaseBitmap.create("acthrowstone_preview_line");
        msgLine.setPosition(msgBg.x + msgBg.width / 2 - msgLine.width / 2, msgBg.y + msgBg.height - msgLine.height + 2);
        this.addChild(msgLine);
        var needData = this.vo.getShowSkinData();
        var topMsg = ComponentManager.getTextField(LanguageManager.getlocal("acSkinoflibaiSkinTopMsg-" + this.getTypeCode(), [String(needData.needNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topMsg.setPosition(msgBg.x + msgBg.width / 2 - topMsg.width / 2, msgBg.y + msgBg.height / 2 - topMsg.height / 2);
        this.addChild(topMsg);
        var buttomBg = BaseBitmap.create("public_9_bg14");
        buttomBg.width = 516;
        buttomBg.height = 274;
        buttomBg.setPosition(wifeBg.x + wifeBg.width / 2 - buttomBg.width / 2, wifeBg.y + wifeBg.height + 4);
        this.addChild(buttomBg);
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg.x + buttomBg.width / 2 - skinTipTxt.width / 2, buttomBg.y + 20);
        this.addChild(skinTipTxt);
        var addAbility = skinCfg.addAbility;
        for (var index = 0; index < addAbility.length; index++) {
            var bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index, addAbility[index], [skinCfg.id]);
            bnode.setPosition(skinTipTxt.x - 5 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 5 + Math.floor(index / 2) * 92);
            this.addChild(bnode);
        }
    };
    Object.defineProperty(AcSkinOfLibaiDetailPopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkinOfLibaiDetailPopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSkinOfLibaiDetailPopupViewTab4.prototype.getTypeCode = function () {
        var code = this.code;
        if (code == "2") {
            return "1";
        }
        return code;
    };
    Object.defineProperty(AcSkinOfLibaiDetailPopupViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkinOfLibaiDetailPopupViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSkinOfLibaiDetailPopupViewTab4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSkinOfLibaiDetailPopupViewTab4;
}(CommonViewTab));
__reflect(AcSkinOfLibaiDetailPopupViewTab4.prototype, "AcSkinOfLibaiDetailPopupViewTab4");
//# sourceMappingURL=AcSkinOfLibaiDetailPopupViewTab4.js.map