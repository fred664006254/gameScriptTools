var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * author wxz
 * 预览
 * date 2020.6.29
 * @class AcMouseGoldRewardPopViewTab4
 */
var AcMouseGoldRewardPopViewTab4 = /** @class */ (function (_super) {
    __extends(AcMouseGoldRewardPopViewTab4, _super);
    function AcMouseGoldRewardPopViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._progress = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcMouseGoldRewardPopViewTab4.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshProcess, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_EXCHANGE, this.changeHandle, this);
        var container = new BaseDisplayObjectContainer();
        container.width = GameConfig.stageWidth - 60;
        var skinId = this.cfg.show;
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var bbg = BaseBitmap.create("public_9_bg4");
        bbg.width = 530;
        bbg.height = 705;
        bbg.setPosition(container.width / 2 - bbg.width / 2, 55);
        container.addChild(bbg);
        var bgstr = "acthrowarrowview_wifeskinbg";
        var bg = BaseLoadBitmap.create(bgstr);
        bg.width = 525;
        bg.height = 400;
        bg.setPosition(container.width / 2 - bg.width / 2, 57);
        container.addChild(bg);
        var rect = new egret.Rectangle(0, 0, 525, 362);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 530;
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2 + 5, bg.y + 30);
        container.addChild(maskContan);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            droWifeIcon.scaleY = 0.75;
            droWifeIcon.scaleX = 0.75;
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2;
            droWifeIcon.y = maskContan.y + maskContan.height - 35;
            maskContan.addChild(droWifeIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.9);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 20;
            maskContan.addChild(skinImg);
        }
        var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 525;
        topbg.height = 36;
        topbg.setPosition(container.width / 2 - topbg.width / 2, 57);
        container.addChild(topbg);
        var skinTitle = App.CommonUtil.getWifeSkinFlagById(skinId);
        if (skinTitle) {
            skinTitle.setPosition(bg.x + bg.width / 2 - skinTitle.width / 2, bg.y + bg.height - skinTitle.height - 65);
            container.addChild(skinTitle);
        }
        var str = this.cfg.exchange.needItem;
        var itemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        var showstr = LanguageManager.getlocal("acMouseGoldExchangeTopMsg", [str.split("_")[2], itemCfg.name]);
        var topDesc = ComponentManager.getTextField(showstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        container.addChild(topDesc);
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 25);
        container.addChild(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        container.addChild(skinNameTxt);
        var wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
        var servantNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        container.addChild(servantNameTxt);
        var buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 520;
        buttomBg.height = 275 + 20;
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
        container.addChild(buttomBg);
        var buttomBg2 = BaseBitmap.create("public_9_managebg");
        buttomBg2.width = 515;
        buttomBg2.height = 269 + 20;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        container.addChild(buttomBg2);
        buttomBg2.visible = false;
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
        container.addChild(skinTipTxt);
        var descBg = BaseBitmap.create("public_scrolllistbg");
        descBg.width = 505;
        descBg.height = 170;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0, skinTipTxt.textHeight + 10]);
        container.addChild(descBg);
        var group = new BaseDisplayObjectContainer();
        group.width = descBg.width;
        container.addChild(group);
        var attrSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
        var attrInfo = this.dealAttrChangeInfo("" + skinId);
        for (var i = 0; i < attrInfo.length; i++) {
            var tipTxt = ComponentManager.getTextField(attrInfo[i], attrSize, TextFieldConst.COLOR_BROWN);
            if (PlatformManager.checkIsThSp() && String(skinId) == "2241") {
                tipTxt.x = (Number(i) % 2 == 0 ? 10 : 280);
            }
            else {
                tipTxt.x = (Number(i) % 2 == 0 ? 15 : 285);
            }
            tipTxt.y = Math.floor(Number(i) / 2) * 20 + (Math.floor(Number(i) / 2) + 1) * 11;
            group.addChild(tipTxt);
        }
        var mask = BaseBitmap.create("public_alphabg");
        mask.alpha = 0;
        mask.width = group.width;
        mask.height = group.height;
        group.addChild(mask);
        var scrollView = ComponentManager.getScrollView(group, new egret.Rectangle(0, 0, descBg.width, descBg.height - 2));
        scrollView.setPosition(descBg.x, descBg.y);
        container.addChild(scrollView);
        var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, descBg.y + descBg.height + 5);
        container.addChild(buttomTipTxt);
        this.addChild(container);
        var exchangeBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_skinprocessbg", this.getTypeCode()));
        exchangeBg.width += 4;
        container.addChild(exchangeBg);
        exchangeBg.setPosition(container.width / 2 - exchangeBg.width / 2, bg.y + bg.height - exchangeBg.height);
        var itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
        itemicon.width = 70;
        itemicon.height = 70;
        itemicon.setPosition(buttomBg.x + 7, buttomBg.y - itemicon.height - 10);
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 315);
        this._progress.setPosition(itemicon.x + itemicon.width - 15, itemicon.y + 20);
        container.addChild(this._progress);
        container.addChild(itemicon);
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acMouseGoldExchangeBtnTxt", function () {
            if (!_this.vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (_this._progress.getPercent() < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acMouseGoldExchangeNoTxt"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACMOUSEGOLD_EXCHANGE, { activeId: _this.vo.aidAndCode });
        }, this);
        btn.setPosition(this._progress.x + this._progress.width + 5, this._progress.y - 10);
        container.addChild(btn);
        this.freshProcess();
    };
    AcMouseGoldRewardPopViewTab4.prototype.freshProcess = function () {
        var change = this.cfg.exchange.needItem;
        var changearr = change.split("_");
        var itemCfg = Config.ItemCfg.getItemCfgById(changearr[1]);
        var have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
        var need = parseInt(changearr[2]);
        this._progress.setPercentage(have / need, String(have) + "/" + String(need));
    };
    AcMouseGoldRewardPopViewTab4.prototype.changeHandle = function (event) {
        if (!event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rdata = event.data.data.data;
        var replacerewards = rdata.replacerewards;
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
        if (rdata.rewards) {
            var rewardVoList = GameData.formatRewardItem(rdata.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
        this.freshProcess();
    };
    AcMouseGoldRewardPopViewTab4.prototype.dealAttrChangeInfo = function (skinId) {
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        // let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
        var resultStr = [];
        var atkAdd = skinCfg.atkAdd;
        var inteAdd = skinCfg.inteAdd;
        var politicsAdd = skinCfg.politicsAdd;
        var charmAdd = skinCfg.charmAdd;
        var wifeIntimacy = skinCfg.wifeIntimacy;
        var wifeGlamour = skinCfg.wifeGlamour;
        var childReduce = skinCfg.childReduce;
        var searchReduce = skinCfg.searchReduce;
        var wifeReduce = skinCfg.wifeReduce;
        var atkAdd2 = skinCfg.atkAdd2;
        var inteAdd2 = skinCfg.inteAdd2;
        var politicsAdd2 = skinCfg.politicsAdd2;
        var charmAdd2 = skinCfg.charmAdd2;
        if (atkAdd) {
            if (atkAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1]]));
            }
            else if (atkAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1] * 100 + "%"]));
            }
            else if (atkAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd14", [atkAdd[1]]));
            }
            else if (atkAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd14", [atkAdd[1] * 100 + "%"]));
            }
        }
        if (inteAdd) {
            if (inteAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1]]));
            }
            else if (inteAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1] * 100 + "%"]));
            }
            else if (inteAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd15", [inteAdd[1]]));
            }
            else if (inteAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd15", [inteAdd[1] * 100 + "%"]));
            }
        }
        if (politicsAdd) {
            if (politicsAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1]]));
            }
            else if (politicsAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1] * 100 + "%"]));
            }
            else if (politicsAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd16", [politicsAdd[1]]));
            }
            else if (politicsAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd16", [politicsAdd[1] * 100 + "%"]));
            }
        }
        if (charmAdd) {
            if (charmAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1]]));
            }
            else if (charmAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1] * 100 + "%"]));
            }
            else if (charmAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd17", [charmAdd[1]]));
            }
            else if (charmAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd17", [charmAdd[1] * 100 + "%"]));
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
    Object.defineProperty(AcMouseGoldRewardPopViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMouseGoldRewardPopViewTab4.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcMouseGoldRewardPopViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseGoldRewardPopViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseGoldRewardPopViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMouseGoldRewardPopViewTab4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._progress = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshProcess, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_EXCHANGE, this.changeHandle, this);
    };
    return AcMouseGoldRewardPopViewTab4;
}(CommonViewTab));
//# sourceMappingURL=AcMouseGoldRewardPopViewTab4.js.map