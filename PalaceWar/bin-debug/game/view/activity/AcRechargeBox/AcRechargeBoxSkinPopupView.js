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
 * 	储值宝箱皮肤奖励预览
 * author 钱竣
 */
var AcRechargeBoxSkinPopupView = (function (_super) {
    __extends(AcRechargeBoxSkinPopupView, _super);
    function AcRechargeBoxSkinPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcRechargeBoxSkinPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeBoxSkinPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeBoxSkinPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeBoxSkinPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeBoxSkinPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeBoxSkinPopupView.prototype, "newCode", {
        get: function () {
            var code = "";
            switch (Number(this.code)) {
                case 6:
                    code = "3";
                    break;
                case 5:
                    code = "1";
                    break;
                case 7:
                    code = "4";
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                    code = "5";
                    break;
                case 12:
                case 13:
                case 14:
                case 15:
                    code = "12";
                    break;
                case 17:
                    code = "16";
                    break;
                case 21:
                    code = "20";
                    break;
                case 23:
                    code = "22";
                    break;
                default:
                    code = this.code;
                    break;
            }
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeBoxSkinPopupView.prototype.initView = function () {
        var view = this;
        var obj = {
            3: 'wife'
        };
        var isWifeskin = obj[this.newCode] == "wife";
        if (isWifeskin) {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(view.cfg.getSkin(view.newCode));
            var wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
            var bg = BaseLoadBitmap.create("luckdrawshowbg-" + 1);
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
            var needCharge = view.cfg.getBoxListData();
            var num = 0;
            for (var i in needCharge) {
                if (needCharge[i].getReward.indexOf(view.cfg.getSkin(view.newCode)) > -1) {
                    var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(needCharge[i].needGem);
                    if (cfg) {
                        num = cfg.gemCost;
                    }
                    break;
                }
            }
            var topDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSkinTip", [num.toString(), wifecfg.name, Config.WifeskinCfg.getWifeCfgById(view.cfg.getSkin(view.newCode)).name]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
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
            // let addAbility = skinCfg.addAbility;
            // for (let index = 0; index < addAbility.length; index++) {
            // 	let bnode = new ServantSkinBookScrollItem();
            // 	bnode.init(skinCfg.id, index, skinCfg.servantId, 450);
            // 	bnode.setPosition(skinTipTxt.x + 15, skinTipTxt.y + skinTipTxt.height + 15);
            // 	this.addChildToContainer(bnode);
            // }
            var descBg = BaseBitmap.create("public_9_managebg");
            descBg.width = 505;
            descBg.height = 90;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0, skinTipTxt.textHeight + 10]);
            this.addChildToContainer(descBg);
            var addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(view.cfg.getSkin(view.newCode), true);
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
        }
        else {
            var view_1 = this;
            var acCfg = this.cfg;
            var skinid = acCfg.getSkin(view_1.newCode);
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinid);
            var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
            var bg = BaseLoadBitmap.create("luckdrawshowbg-" + view_1.newCode);
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
            var boneName = undefined;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                droWifeIcon.scaleY = 0.9;
                droWifeIcon.scaleX = -0.9;
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
                skinImg.setScale(0.87);
                skinImg.x = maskContan.width / 2;
                skinImg.y = maskContan.y + maskContan.height - 5;
                maskContan.addChild(skinImg);
            }
            var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            topbg.width = 544;
            topbg.height = 36;
            topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
            this.addChildToContainer(topbg);
            // let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawAwardTip1-` + this.code, [view.cfg.getTotalProgress().toString(), view.cfg.getSkinName(view.code)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            // topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
            // this.addChildToContainer(topDesc);
            var skinnamebg = BaseBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 20);
            this.addChildToContainer(skinnamebg);
            var skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
            this.addChildToContainer(skinNameTxt);
            var servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
            servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
            this.addChildToContainer(servantNameTxt);
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 530;
            buttomBg.height = 275 + 20;
            buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
            this.addChildToContainer(buttomBg);
            var buttomBg2 = BaseBitmap.create("public_9_bg14");
            buttomBg2.width = 525;
            buttomBg2.height = 269 + 20;
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
            this.addChildToContainer(buttomBg2);
            var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            skinTipTxt.width = 480;
            skinTipTxt.lineSpacing = 3;
            skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
            this.addChildToContainer(skinTipTxt);
            var addAbility = skinCfg.addAbility;
            for (var index = 0; index < addAbility.length; index++) {
                var bnode = new ServantChangeSkinBookItem();
                bnode.initItem(index, addAbility[index], [skinCfg.id]);
                bnode.setPosition(skinTipTxt.x - 5 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 15 + Math.floor(index / 2) * 92);
                this.addChildToContainer(bnode);
            }
            // let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpServantSkinRewardPopupViewButtomDesc-1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            // buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
            // this.addChildToContainer(buttomTipTxt);
        }
    };
    AcRechargeBoxSkinPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg", "servant_star",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
        ]);
    };
    AcRechargeBoxSkinPopupView.prototype.getTitleStr = function () {
        return "dailyTaskRewardPreviewPopuiViewTitle";
    };
    // protected getShowHeight() {
    // 	return 760;
    // }
    AcRechargeBoxSkinPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AcRechargeBoxSkinPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxSkinPopupView;
}(PopupView));
__reflect(AcRechargeBoxSkinPopupView.prototype, "AcRechargeBoxSkinPopupView");
//# sourceMappingURL=AcRechargeBoxSkinPopupView.js.map