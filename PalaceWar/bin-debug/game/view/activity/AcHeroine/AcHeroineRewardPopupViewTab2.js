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
 * 巾帼英雄衣装奖励
 * date 2019.11.11
 */
var AcHeroineRewardPopupViewTab2 = (function (_super) {
    __extends(AcHeroineRewardPopupViewTab2, _super);
    function AcHeroineRewardPopupViewTab2() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    AcHeroineRewardPopupViewTab2.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 532;
        bg.height = 700;
        bg.setPosition(34, 50);
        this.addChild(bg);
        var topMsg = LanguageManager.getlocal("acHeroineClothesTopMsg-" + this.code);
        var container = this.getSkinView("" + this.cfg.show2, null, topMsg, null, -5);
        container.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(container);
    };
    AcHeroineRewardPopupViewTab2.prototype.getSkinView = function (skinId, bgName, topMsg, scale, offY) {
        var view = this;
        var container = new BaseDisplayObjectContainer();
        container.width = 544;
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var isWifeskin = false;
        var bgStr = "acthrowarrowview_wifeskinbg";
        if (skinCfg) {
            isWifeskin = true;
            bgStr = "acthrowarrowview_wifeskinbg";
        }
        else {
            // bgStr = "luckdrawshowbg-1";
            bgStr = "acthrowarrowview_wifeskinbg";
            skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        }
        if (bgName) {
            bgStr = bgName;
        }
        var bg = BaseLoadBitmap.create(bgStr);
        bg.width = 532;
        bg.height = 400;
        container.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height - 5);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = bg.width;
        maskContan.height = bg.height;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x, bg.y - 2);
        container.addChild(maskContan);
        if (isWifeskin) {
            var boneName = undefined;
            var wife = null;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale) {
                    wife.setScale(scale);
                }
                else {
                    wife.setScale(0.53); //0.53
                }
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = maskContan.width / 2;
                wife.y = maskContan.y + maskContan.height - 12;
                if (offY) {
                    wife.y += offY;
                }
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
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 30);
            container.addChild(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
            container.addChild(skinNameTxt);
            var wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
            var wifeNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
            wifeNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - wifeNameTxt.width / 2, skinNameTxt.y + 28);
            container.addChild(wifeNameTxt);
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 530;
            buttomBg.height = 276;
            buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height - 3);
            container.addChild(buttomBg);
            var buttomBg2 = BaseBitmap.create("public_9_bg14");
            buttomBg2.width = 525;
            buttomBg2.height = 274;
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
            container.addChild(buttomBg2);
            //佳人皮肤描述
            var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            skinTipTxt.width = 480;
            skinTipTxt.lineSpacing = 3;
            skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
            container.addChild(skinTipTxt);
            var descBg = BaseBitmap.create("public_9_managebg");
            descBg.width = 505;
            descBg.height = 120;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0, skinTipTxt.textHeight + 10]);
            container.addChild(descBg);
            //皮肤属性
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
                }
            ];
            var txt1 = [
                {
                    txtKey: "wifeSkinAddServantAttr1",
                    value: addValues[0],
                },
                {
                    txtKey: "wifeSkinAddServantAttr2",
                    value: addValues[1],
                },
                {
                    txtKey: "wifeSkinAddServantAttr3",
                    value: addValues[2],
                },
                {
                    txtKey: "wifeSkinAddServantAttr4",
                    value: addValues[3],
                },
                {
                    txtKey: "skinLvuptxt6",
                    value: addValues[4],
                },
                {
                    txtKey: "skinLvuptxt7",
                    value: addValues[5],
                }
            ];
            var txtArr = txt;
            var servantName = "";
            if (wifecfg.servantId) {
                servantName = LanguageManager.getlocal("servant_name" + wifecfg.servantId);
                txtArr = txt1;
            }
            for (var i in txtArr) {
                var tmp = txtArr[i];
                var str = String(tmp.value);
                if (Number(i) < 4 && tmp.value == 0) {
                    str = addValues[Number(i) + 6] * 100 + "%";
                }
                var tipStr = "";
                if (servantName && Number(i) < 4) {
                    tipStr = LanguageManager.getlocal(tmp.txtKey, [servantName, str]);
                }
                else {
                    tipStr = LanguageManager.getlocal("" + tmp.txtKey) + ("\uFF1A<font color=0x3e9b00>+" + str + "</font>");
                }
                var tipTxt = ComponentManager.getTextField(tipStr, 20, TextFieldConst.COLOR_BLACK);
                tipTxt.x = descBg.x + (Number(i) % 2 == 0 ? 15 : 285);
                tipTxt.y = descBg.y + Math.floor(Number(i) / 2) * 20 + (Math.floor(Number(i) / 2) + 1) * 15;
                container.addChild(tipTxt);
            }
            var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 28);
            container.addChild(buttomTipTxt);
        }
        else {
            var boneName = undefined;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale) {
                    servantIcon.setScale(scale);
                }
                else {
                    servantIcon.setScale(0.7); //0.8
                }
                servantIcon.anchorOffsetY = servantIcon.height;
                servantIcon.anchorOffsetX = servantIcon.width / 2;
                servantIcon.x = maskContan.width / 2;
                servantIcon.y = maskContan.y + maskContan.height - 5; //-5
                if (offY) {
                    servantIcon.y += offY;
                }
                maskContan.addChild(servantIcon);
            }
            else {
                var skinImg = BaseLoadBitmap.create(skinCfg.body);
                skinImg.width = 405;
                skinImg.height = 467;
                skinImg.anchorOffsetY = skinImg.height;
                skinImg.anchorOffsetX = skinImg.width / 2;
                skinImg.setScale(0.75);
                skinImg.x = maskContan.width / 2;
                skinImg.y = maskContan.y + maskContan.height - 2;
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
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 536;
            buttomBg.height = 295;
            buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height - 3);
            container.addChild(buttomBg);
            buttomBg.visible = false;
            var buttomBg2 = BaseBitmap.create("public_9_bg14");
            buttomBg2.width = 540; // 525
            buttomBg2.height = 289;
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2 - 5, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2 - 4);
            container.addChild(buttomBg2);
            var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            skinTipTxt.width = 480;
            skinTipTxt.lineSpacing = 3;
            skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2 - 5, buttomBg2.y + 20);
            container.addChild(skinTipTxt);
            var addAbility = skinCfg.addAbility;
            for (var index = 0; index < addAbility.length; index++) {
                var bnode = new ServantChangeSkinBookItem();
                bnode.initItem(index, addAbility[index], [skinCfg.id]);
                bnode.setPosition(skinTipTxt.x - 10 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 15 + Math.floor(index / 2) * 92);
                container.addChild(bnode);
            }
            var titleEff = App.CommonUtil.getServantSkinFlagById(skinCfg.id);
            if (titleEff) {
                titleEff.setPosition(bg.x + bg.width / 2 - titleEff.width / 2 - 5, bg.y + bg.height - titleEff.height - 10);
                container.addChild(titleEff);
            }
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
    Object.defineProperty(AcHeroineRewardPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHeroineRewardPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcHeroineRewardPopupViewTab2.prototype.getTypeCode = function () {
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
    AcHeroineRewardPopupViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcHeroineRewardPopupViewTab2;
}(AcCommonViewTab));
__reflect(AcHeroineRewardPopupViewTab2.prototype, "AcHeroineRewardPopupViewTab2");
//# sourceMappingURL=AcHeroineRewardPopupViewTab2.js.map