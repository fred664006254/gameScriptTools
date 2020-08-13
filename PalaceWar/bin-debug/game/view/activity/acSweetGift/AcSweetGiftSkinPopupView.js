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
 * 	活动衣装预览 tab
 * author yangchengguo
 * @class AcSweetGiftSkinPopupView
 */
var AcSweetGiftSkinPopupView = (function (_super) {
    __extends(AcSweetGiftSkinPopupView, _super);
    function AcSweetGiftSkinPopupView() {
        var _this = _super.call(this) || this;
        _this._skinContainer = null;
        _this._servantContainer = null;
        return _this;
    }
    AcSweetGiftSkinPopupView.prototype.initView = function () {
        var tabName = ["sweetgiftShowServentTitle-1", "sweetgiftShowWifeTitle-1"];
        if (this.param.data.tabName) {
            tabName = this.param.data.tabName;
        }
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.setPosition(35 + GameData.popupviewOffsetX, 10);
        this.addChildToContainer(tabbarGroup);
        this._skinContainer = this.getSkinView(this.param.data.wifeId);
        this._skinContainer.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._skinContainer.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(this._skinContainer);
        this._servantContainer = this.getSkinView(this.param.data.servantId);
        this._servantContainer.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._servantContainer.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(this._servantContainer);
        this._servantContainer.visible = false;
        if (this.param.data.isShowWife) {
            tabbarGroup.selectedIndex = 1;
            this.tabBtnClickHandler({ index: 1 });
        }
        else {
            tabbarGroup.selectedIndex = 0;
            this.tabBtnClickHandler({ index: 0 });
        }
    };
    AcSweetGiftSkinPopupView.prototype.tabBtnClickHandler = function (params) {
        if (params.index == 0) {
            this._skinContainer.visible = false;
            this._servantContainer.visible = true;
        }
        else {
            this._skinContainer.visible = true;
            this._servantContainer.visible = false;
        }
    };
    AcSweetGiftSkinPopupView.prototype.getSkinView = function (skinId) {
        var container = new BaseDisplayObjectContainer();
        container.width = 544;
        var view = this;
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var isWifeskin = false;
        if (skinCfg) {
            isWifeskin = true;
        }
        else {
            skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        }
        if (isWifeskin) {
            var wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
            var bg = BaseLoadBitmap.create("acthrowarrowview_wifeskinbg");
            bg.width = 544;
            bg.height = 400;
            // bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
            container.addChild(bg);
            var rect = new egret.Rectangle(0, 0, 544, 364);
            var maskContan = new BaseDisplayObjectContainer();
            maskContan.width = 544;
            maskContan.height = 364;
            maskContan.mask = rect;
            maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
            container.addChild(maskContan);
            var boneName = undefined;
            var wife = null;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                wife.setScale(0.53);
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = maskContan.width / 2;
                wife.y = maskContan.y + maskContan.height - 12;
                wife.mask = new egret.Rectangle(-354, -665, 914, 685);
                maskContan.addChild(wife);
            }
            else {
                wife = BaseLoadBitmap.create(skinCfg.body);
                wife.width = 640;
                wife.height = 840;
                wife.setScale(0.45);
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = maskContan.width / 2;
                wife.y = maskContan.y + maskContan.height;
                maskContan.addChild(wife);
            }
            // container.addChild(wife);
            var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            topbg.width = 544;
            topbg.height = 36;
            topbg.setPosition(container.width / 2 - topbg.width / 2, 0);
            container.addChild(topbg);
            var str = LanguageManager.getlocal(view.param.data.wifeNeedText, [view.param.data.wifeNeed]);
            var topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
            container.addChild(topDesc);
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 20);
            container.addChild(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
            container.addChild(skinNameTxt);
            var servantNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
            servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
            container.addChild(servantNameTxt);
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 530;
            // buttomBg.height = 216;
            buttomBg.height = 246;
            buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 15);
            container.addChild(buttomBg);
            var buttomBg2 = BaseBitmap.create("public_9_bg14");
            buttomBg2.width = 525;
            buttomBg2.height = 234;
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
            container.addChild(buttomBg2);
            var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            skinTipTxt.width = 480;
            skinTipTxt.lineSpacing = 3;
            skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
            container.addChild(skinTipTxt);
            var descBg = BaseBitmap.create("public_9_managebg");
            descBg.width = 505;
            descBg.height = 90;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0, skinTipTxt.textHeight + 10]);
            container.addChild(descBg);
            var addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
            //getWifeSkinProAdd
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
                var str_1 = String(tmp.value);
                if (Number(i) < 4 && tmp.value == 0) {
                    str_1 = addValues[Number(i) + 6] * 100 + "%";
                }
                var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("" + tmp.txtKey) + ("\uFF1A<font color=0x3e9b00>+" + str_1 + "</font>"), 18, TextFieldConst.COLOR_BLACK);
                tipTxt.x = descBg.x + (Number(i) % 2 == 0 ? 15 : 285);
                tipTxt.y = descBg.y + Math.floor(Number(i) / 2) * 18 + (Math.floor(Number(i) / 2) + 1) * 10;
                container.addChild(tipTxt);
            }
            var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 25);
            container.addChild(buttomTipTxt);
        }
        else {
            var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
            var bg = BaseLoadBitmap.create("luckdrawshowbg-1");
            bg.width = 544;
            bg.height = 400;
            bg.setPosition(container.width / 2 - bg.width / 2, 0);
            container.addChild(bg);
            var rect = new egret.Rectangle(0, 0, 544, 364);
            var maskContan = new BaseDisplayObjectContainer();
            maskContan.width = 544;
            maskContan.height = 364;
            maskContan.mask = rect;
            maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
            container.addChild(maskContan);
            var boneName = undefined;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                droWifeIcon.scaleY = 0.9;
                droWifeIcon.scaleX = 0.9;
                droWifeIcon.anchorOffsetY = droWifeIcon.height;
                droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
                droWifeIcon.x = maskContan.width / 2;
                droWifeIcon.y = maskContan.y + maskContan.height - 5;
                maskContan.addChild(droWifeIcon);
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
            var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            topbg.width = 544;
            topbg.height = 36;
            topbg.setPosition(container.width / 2 - topbg.width / 2, 0);
            container.addChild(topbg);
            var topDesc = ComponentManager.getTextField(LanguageManager.getlocal(view.param.data.servantNeedText, [view.param.data.servantNeed]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
            container.addChild(topDesc);
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 20);
            container.addChild(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
            container.addChild(skinNameTxt);
            var servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
            servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
            container.addChild(servantNameTxt);
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 530;
            buttomBg.height = 275 + 20;
            buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
            container.addChild(buttomBg);
            var buttomBg2 = BaseBitmap.create("public_9_bg14");
            buttomBg2.width = 525;
            buttomBg2.height = 269 + 20;
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
            container.addChild(buttomBg2);
            var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            skinTipTxt.width = 480;
            skinTipTxt.lineSpacing = 3;
            skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
            container.addChild(skinTipTxt);
            var addAbility = skinCfg.addAbility;
            for (var index = 0; index < addAbility.length; index++) {
                var bnode = new ServantChangeSkinBookItem();
                bnode.initItem(index, addAbility[index], [skinCfg.id]);
                bnode.setPosition(skinTipTxt.x - 5 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 15 + Math.floor(index / 2) * 92);
                container.addChild(bnode);
            }
        }
        return container;
    };
    AcSweetGiftSkinPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg", "servant_star",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
        ]);
    };
    AcSweetGiftSkinPopupView.prototype.getTitleStr = function () {
        return "dailyTaskRewardPreviewPopuiViewTitle";
    };
    // protected getShowHeight() {
    // 	return 760;
    // }
    AcSweetGiftSkinPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AcSweetGiftSkinPopupView.prototype.dispose = function () {
        this._skinContainer = null;
        this._servantContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcSweetGiftSkinPopupView;
}(PopupView));
__reflect(AcSweetGiftSkinPopupView.prototype, "AcSweetGiftSkinPopupView");
//# sourceMappingURL=AcSweetGiftSkinPopupView.js.map