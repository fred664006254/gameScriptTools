/**
 * 衣装预览 皮肤
 * @author shaoliang
 * date 2019/5/7
 * @class CloshespreviewSkinPopupView
 */
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
var CloshespreviewSkinPopupView = (function (_super) {
    __extends(CloshespreviewSkinPopupView, _super);
    function CloshespreviewSkinPopupView() {
        return _super.call(this) || this;
    }
    CloshespreviewSkinPopupView.prototype.initView = function () {
        var view = this;
        var skinId = this.param.data.sid;
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
        var bg;
        if (skinId == "2111" || skinId == "2022") {
            bg = BaseLoadBitmap.create("acthrowarrowview_wifeskinbg");
        }
        else {
            bg = BaseLoadBitmap.create("luckdrawshowbg-1");
        }
        bg.width = 544;
        bg.height = 400;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 544, 364 - 1);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 544;
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(0, bg.y + 30);
        this.addChildToContainer(maskContan);
        var boneName = undefined;
        var wife = null;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wife.width = 354;
            wife.height = 611;
            // wife.mask = new egret.Rectangle(-354,-609,914,510);
            wife.setScale(0.7);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [270, 460 + 3]);
        }
        else {
            wife = BaseLoadBitmap.create(skinCfg.body);
            wife.setScale(0.5);
            // wife.mask = new egret.Rectangle(0,0,640,700);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [125, 40]);
        }
        maskContan.addChild(wife);
        var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 544;
        topbg.height = 36;
        topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
        this.addChildToContainer(topbg);
        var topDesc = ComponentManager.getTextField(this.param.data.title, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        this.addChildToContainer(topDesc);
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 20);
        this.addChildToContainer(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        this.addChildToContainer(skinNameTxt);
        var servantNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        this.addChildToContainer(servantNameTxt);
        var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 530;
        buttomBg.height = 216;
        buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
        this.addChildToContainer(buttomBg);
        var buttomBg2 = BaseBitmap.create("public_9_bg14");
        buttomBg2.width = 525;
        buttomBg2.height = 204;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        this.addChildToContainer(buttomBg2);
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
        this.addChildToContainer(skinTipTxt);
        var descBg = BaseBitmap.create("public_9_managebg");
        descBg.width = 505;
        descBg.height = 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0, skinTipTxt.textHeight + 10]);
        this.addChildToContainer(descBg);
        var addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
        var txt = [
            {
                txtKey: "skinLvuptxt2",
                value: addValues[0],
            },
            {
                txtKey: "skinLvuptxt3",
                value: addValues[1],
            },
            {
                txtKey: "skinLvuptxt4",
                value: addValues[2],
            },
            {
                txtKey: "skinLvuptxt5",
                value: addValues[3],
            },
            {
                txtKey: "skinLvuptxt6",
                value: addValues[4],
            },
            {
                txtKey: "skinLvuptxt7",
                value: addValues[5],
            },
        ];
        for (var i in txt) {
            var tmp = txt[i];
            var str = String(tmp.value);
            if (Number(i) < 4 && tmp.value == 0) {
                str = addValues[Number(i) + 6] * 100 + "%";
            }
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("" + tmp.txtKey) + ("\uFF1A<font color=0x3e9b00>+" + str + "</font>"), 18, TextFieldConst.COLOR_BLACK);
            tipTxt.x = descBg.x + (Number(i) % 2 == 0 ? 15 : 285);
            tipTxt.y = descBg.y + Math.floor(Number(i) / 2) * 18 + (Math.floor(Number(i) / 2) + 1) * 10;
            this.addChildToContainer(tipTxt);
        }
        var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
        this.addChildToContainer(buttomTipTxt);
    };
    CloshespreviewSkinPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg",
        ]);
    };
    CloshespreviewSkinPopupView.prototype.getTitleStr = function () {
        return "acWealthCarpServantSkinRewardPopupViewTitle-1";
    };
    CloshespreviewSkinPopupView.prototype.getShowHeight = function () {
        return 720;
    };
    CloshespreviewSkinPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return CloshespreviewSkinPopupView;
}(PopupView));
__reflect(CloshespreviewSkinPopupView.prototype, "CloshespreviewSkinPopupView");
//# sourceMappingURL=CloshespreviewSkinPopupView.js.map