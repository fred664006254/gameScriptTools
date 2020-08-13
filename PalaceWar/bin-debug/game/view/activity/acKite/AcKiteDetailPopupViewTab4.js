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
 * 衣装预览
 * date 2020.4.2
 * @class AcKiteDetailPopupViewTab4
 */
var AcKiteDetailPopupViewTab4 = (function (_super) {
    __extends(AcKiteDetailPopupViewTab4, _super);
    function AcKiteDetailPopupViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcKiteDetailPopupViewTab4.prototype.initView = function () {
        var view = this;
        var rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(46, 50);
        this.addChild(rewardBg);
        var container = new BaseDisplayObjectContainer();
        container.width = 530;
        this.addChild(container);
        container.x = 46;
        container.y = 55;
        var skinId = this.cfg.corePrize;
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var bg = BaseBitmap.create("ackite_skinbg");
        container.addChild(bg);
        bg.x = container.width / 2 - bg.width / 2;
        var rect = new egret.Rectangle(0, 0, 522, 364);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 522; // 544
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
        container.addChild(maskContan);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantIcon.setScale(0.8);
            servantIcon.anchorOffsetY = servantIcon.height;
            servantIcon.anchorOffsetX = servantIcon.width / 2;
            servantIcon.x = maskContan.width / 2;
            servantIcon.y = maskContan.y + maskContan.height - 6; //-5
            maskContan.addChild(servantIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.85);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 5;
            maskContan.addChild(skinImg);
        }
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 30);
        container.addChild(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        container.addChild(skinNameTxt);
        var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        var servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        container.addChild(servantNameTxt);
        var titleEff = App.CommonUtil.getServantSkinFlagById(skinId);
        if (titleEff) {
            titleEff.setPosition(bg.x + bg.width / 2 - titleEff.width / 2, bg.y + bg.height - titleEff.height - 10);
            container.addChild(titleEff);
        }
        var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 530;
        buttomBg.height = 290;
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height - 3);
        container.addChild(buttomBg);
        buttomBg.visible = false;
        var buttomBg2 = BaseBitmap.create("public_popupscrollitembg");
        buttomBg2.width = 520; //525
        buttomBg2.height = 285; //289
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2 + 10); // +5
        container.addChild(buttomBg2);
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 15);
        container.addChild(skinTipTxt);
        var addAbility = skinCfg.addAbility;
        for (var index = 0; index < addAbility.length; index++) {
            var bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index, addAbility[index], [skinCfg.id, null, "public_scrolllistbg"]);
            bnode.setPosition(skinTipTxt.x - 5 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 15 + Math.floor(index / 2) * 92);
            container.addChild(bnode);
        }
        var topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(container.width / 2 - topbg.width / 2, 0);
        container.addChild(topbg);
        var skinNeed = this.vo.getSkinNeedData();
        var topStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteSkinTopMsg", this.getTypeCode()), ["" + skinNeed]);
        var topDesc = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 + 2);
        container.addChild(topDesc);
        var topbgLine = BaseBitmap.create("ackite_skintopline");
        topbgLine.setPosition(container.width / 2 - topbgLine.width / 2, topbg.y + topbg.height);
        container.addChild(topbgLine);
        var bgLine = BaseBitmap.create("ackite_skintopline");
        bgLine.setPosition(container.width / 2 - bgLine.width / 2, bg.y + bg.height);
        container.addChild(bgLine);
    };
    Object.defineProperty(AcKiteDetailPopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcKiteDetailPopupViewTab4.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
    };
    AcKiteDetailPopupViewTab4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcKiteDetailPopupViewTab4;
}(CommonViewTab));
__reflect(AcKiteDetailPopupViewTab4.prototype, "AcKiteDetailPopupViewTab4");
//# sourceMappingURL=AcKiteDetailPopupViewTab4.js.map