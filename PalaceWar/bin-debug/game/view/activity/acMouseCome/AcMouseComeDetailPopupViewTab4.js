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
 * date 2020.6.2
 * @class AcMouseComeDetailPopupViewTab4
 */
var AcMouseComeDetailPopupViewTab4 = (function (_super) {
    __extends(AcMouseComeDetailPopupViewTab4, _super);
    function AcMouseComeDetailPopupViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._exchangeContainer = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcMouseComeDetailPopupViewTab4.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSECOME_EXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSECOME_ACHIEVERWD, this.getRewardCallback, this);
        var view = this;
        var rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(26, 53);
        this.addChild(rewardBg);
        var container = new BaseDisplayObjectContainer();
        container.width = 530;
        this.addChild(container);
        container.x = rewardBg.x;
        container.y = 57;
        var skinId = this.cfg.show;
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var bg = BaseBitmap.create("acthrowarrowview_wifeskinbg"); //544 400  522 393
        container.addChild(bg);
        var bgMask = new egret.Rectangle(18, 4, 522, 393);
        bg.mask = bgMask;
        bg.x = container.width / 2 - bg.width / 2 - 7;
        bg.y = -4;
        var rect = new egret.Rectangle(0, 0, 522, 364);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 522; // 544
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 29);
        container.addChild(maskContan);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantIcon.setScale(0.6);
            servantIcon.anchorOffsetY = servantIcon.height;
            servantIcon.anchorOffsetX = servantIcon.width / 2;
            servantIcon.x = maskContan.width / 2;
            servantIcon.y = maskContan.y + maskContan.height - 6; //-5
            maskContan.addChild(servantIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 640;
            skinImg.height = 840;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.45);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 5;
            maskContan.addChild(skinImg);
        }
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x + 14, bg.y + 35);
        container.addChild(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        container.addChild(skinNameTxt);
        var skinTitle = App.CommonUtil.getWifeSkinFlagById(skinId);
        if (skinTitle) {
            skinTitle.setPosition(bg.x + bg.width / 2 - skinTitle.width / 2, bg.y + bg.height - skinTitle.height - 60);
            container.addChild(skinTitle);
        }
        var wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
        var wifeNameTxt = ComponentManager.getTextField(wifecfg.getName(false), TextFieldConst.FONTSIZE_BUTTON_COMMON);
        wifeNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - wifeNameTxt.width / 2, skinNameTxt.y + 28);
        container.addChild(wifeNameTxt);
        var buttomBg2 = BaseBitmap.create("public_popupscrollitembg");
        buttomBg2.width = 522; //525
        buttomBg2.height = 286; //274
        buttomBg2.setPosition(container.width / 2 - buttomBg2.width / 2, bg.y + bg.height + 3);
        container.addChild(buttomBg2);
        //佳人皮肤描述
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
        container.addChild(skinTipTxt);
        // let descBg = BaseBitmap.create(`public_9_managebg`);
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
        buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 10);
        container.addChild(buttomTipTxt);
        var topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(container.width / 2 - topbg.width / 2, 1);
        container.addChild(topbg);
        var toolItemVo = this.vo.getShowSkinData();
        var topStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeSkinTopMsg", this.getTypeCode()), ["" + toolItemVo.num, toolItemVo.name]);
        var topDesc = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 + 2);
        container.addChild(topDesc);
        var topbgLine = BaseBitmap.create("ackite_skintopline");
        topbgLine.setPosition(container.width / 2 - topbgLine.width / 2, topbg.y + topbg.height);
        container.addChild(topbgLine);
        var exchangeContainer = new BaseDisplayObjectContainer();
        container.addChild(exchangeContainer);
        this._exchangeContainer = exchangeContainer;
        var exchangeBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_skinprocessbg", this.getTypeCode()));
        exchangeContainer.addChild(exchangeBg);
        exchangeContainer.width = exchangeBg.width;
        exchangeContainer.height = exchangeBg.height;
        exchangeContainer.setPosition(container.width / 2 - exchangeBg.width / 2, bg.y + bg.height - exchangeBg.height);
        var toolIcon = BaseLoadBitmap.create(toolItemVo.icon);
        toolIcon.width = 100;
        toolIcon.height = 100;
        toolIcon.setScale(0.7);
        toolIcon.setPosition(10, exchangeContainer.height / 2 - toolIcon.height * toolIcon.scaleY / 2 - 5);
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 300);
        progress.setPosition(toolIcon.x + toolIcon.width * toolIcon.scaleX - 15, exchangeContainer.height / 2 - progress.height / 2);
        exchangeContainer.addChild(progress);
        exchangeContainer.addChild(toolIcon);
        progress.name = "progress";
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acMouseComeDetailSkinget", this.getTypeCode()), this.exchangeBtnClick, this);
        exchangeBtn.setPosition(exchangeContainer.width - exchangeBtn.width - 5, exchangeContainer.height / 2 - exchangeBtn.height / 2);
        exchangeContainer.addChild(exchangeBtn);
        exchangeBtn.name = "exchangeBtn";
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        if (currNum < toolItemVo.num) {
            exchangeBtn.setEnable(false);
        }
        progress.setPercentage(currNum / toolItemVo.num);
        progress.setText("" + currNum + "/" + toolItemVo.num);
    };
    AcMouseComeDetailPopupViewTab4.prototype.exchangeBtnClick = function () {
        var toolItemVo = this.vo.getShowSkinData();
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        if (currNum >= toolItemVo.num) {
            //兑换
            NetManager.request(NetRequestConst.REQUEST_ACMOUSECOME_EXCHANGE, { activeId: this.vo.aidAndCode });
        }
    };
    AcMouseComeDetailPopupViewTab4.prototype.exchangeCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
        this.getRewardCallback();
    };
    AcMouseComeDetailPopupViewTab4.prototype.getRewardCallback = function () {
        var toolItemVo = this.vo.getShowSkinData();
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        var progress = this._exchangeContainer.getChildByName("progress");
        progress.setPercentage(currNum / toolItemVo.num);
        progress.setText("" + currNum + "/" + toolItemVo.num);
        var exchangeBtn = this._exchangeContainer.getChildByName("exchangeBtn");
        if (currNum < toolItemVo.num) {
            exchangeBtn.setEnable(false);
        }
        else {
            exchangeBtn.setEnable(true);
        }
    };
    AcMouseComeDetailPopupViewTab4.prototype.dealAttrChangeInfo = function (skinId) {
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
    Object.defineProperty(AcMouseComeDetailPopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailPopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailPopupViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailPopupViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcMouseComeDetailPopupViewTab4.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
    };
    AcMouseComeDetailPopupViewTab4.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSECOME_EXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSECOME_ACHIEVERWD, this.getRewardCallback, this);
        this._exchangeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcMouseComeDetailPopupViewTab4;
}(CommonViewTab));
__reflect(AcMouseComeDetailPopupViewTab4.prototype, "AcMouseComeDetailPopupViewTab4");
//# sourceMappingURL=AcMouseComeDetailPopupViewTab4.js.map