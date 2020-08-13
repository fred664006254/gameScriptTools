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
 * 裁缝 皮肤兑换
 * author yanyuling
 * date 2018/03/01
 * @class AcTailorExchangeView
 */
var AcTailorExchangeView = (function (_super) {
    __extends(AcTailorExchangeView, _super);
    function AcTailorExchangeView() {
        var _this = _super.call(this) || this;
        _this._txtList = [];
        _this._skinIdList = [];
        _this._curSkinIdx = 0;
        _this._exchangeEnable = false;
        return _this;
    }
    AcTailorExchangeView.prototype.initView = function () {
        var pdata = this.param.data;
        this._aid = pdata.aid;
        this._code = pdata.code;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG, this.refreshSkin, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHER_ACTIVITY_EXCHANGE_SKIN), this.buyCallbackHandler, this);
        var tailorCfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, String(this._code));
        var tailorVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, String(this._code));
        this._nodeContainer = new BaseDisplayObjectContainer();
        // this._nodeContainer.y = 100;
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("tailor_bg2");
        bg.y = -100;
        this._nodeContainer.addChild(bg);
        //  let keys = Object.keys(tailorCfg.shop);
        var keys = Object.keys(tailorVo.getShowTimeList());
        var len = keys.length;
        this._skinIdList = keys;
        /**
         * 中间展示区域,如果数量过少，无法铺满横屏，则应不滚动
         */
        var scrolNode = new BaseDisplayObjectContainer();
        for (var index = 0; index < len; index++) {
            var card = new AcTailorSkinHeadItem();
            card.init(keys[index]);
            var movX = card.width * index;
            var tarLen = card.width * len;
            card.x = movX;
            scrolNode.addChild(card);
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, 110);
        var scrollList = ComponentManager.getScrollView(scrolNode, rect);
        this._nodeContainer.addChild(scrollList);
        this._skinScrollView = scrollList;
        this._skinScrollView.bounces = false;
        var bottomBg = BaseBitmap.create("public_9_bg22");
        // bottomBg.height = GameConfig.stageHeigth - wifeNameTxt.y - 35 -this.container.y;
        // bottomBg.y = wifeNameTxt.y + 40;
        bottomBg.height = 324;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.container.y + 10;
        bottomBg.name = "bottomBg";
        this._nodeContainer.addChild(bottomBg);
        var leftBtn = ComponentManager.getButton("btn_leftpage", "", this.switchBtnHandler, this, [-1]);
        leftBtn.x = 20;
        // leftBtn.y = 430;
        leftBtn.y = bottomBg.y - 120;
        this._nodeContainer.addChild(leftBtn);
        var rightBtn = ComponentManager.getButton("btn_leftpage", "", this.switchBtnHandler, this, [1]);
        rightBtn.scaleX = -1;
        rightBtn.x = GameConfig.stageWidth - 20;
        rightBtn.y = leftBtn.y;
        this._nodeContainer.addChild(rightBtn);
        var skinTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTailorskin"), 20);
        skinTxt.x = 70;
        skinTxt.y = leftBtn.y + 85;
        this._nodeContainer.addChild(skinTxt);
        var skinNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTailorskin"), 20, TextFieldConst.COLOR_QUALITY_GREEN);
        skinNameTxt.x = skinTxt.x + skinTxt.width + 10;
        skinNameTxt.y = skinTxt.y;
        this._nodeContainer.addChild(skinNameTxt);
        this._txtList.push(skinNameTxt);
        var ownerTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTailorowner"), 20);
        ownerTxt.y = skinTxt.y;
        ownerTxt.x = GameConfig.stageWidth / 2;
        this._nodeContainer.addChild(ownerTxt);
        var wifeNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTailorowner"), 20, TextFieldConst.COLOR_QUALITY_GREEN);
        wifeNameTxt.x = ownerTxt.x + ownerTxt.width + 10;
        wifeNameTxt.y = skinTxt.y;
        this._nodeContainer.addChild(wifeNameTxt);
        this._txtList.push(wifeNameTxt);
        var bottomBg2 = BaseBitmap.create("public_9_managebg");
        bottomBg2.height = 224;
        bottomBg2.width = 300;
        bottomBg2.x = 30;
        bottomBg2.y = bottomBg.y + 30;
        this._nodeContainer.addChild(bottomBg2);
        var skinDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(""), 20, TextFieldConst.COLOR_BROWN);
        skinDescTxt.multiline = true;
        skinDescTxt.lineSpacing = 3;
        skinDescTxt.width = GameConfig.stageWidth / 2 - 80;
        skinDescTxt.x = GameConfig.stageWidth / 2 + 40;
        skinDescTxt.y = bottomBg.y + 40;
        this._nodeContainer.addChild(skinDescTxt);
        this._txtList.push(skinDescTxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTailorExchangeTip"), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg.y + bottomBg.height - 45;
        this._nodeContainer.addChild(tipTxt);
        var buyTeneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.buyHandler, this, [10]);
        buyTeneBtn.setText("10", false);
        buyTeneBtn.addTextIcon("tailor_icon2");
        buyTeneBtn.x = 403;
        buyTeneBtn.y = bottomBg.y + 200;
        this._nodeContainer.addChild(buyTeneBtn);
        this._buyBtn = buyTeneBtn;
        this._ownNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTailorowner"), 20, TextFieldConst.COLOR_BROWN);
        this._ownNumTxt.y = buyTeneBtn.y - 25;
        this._ownNumTxt.x = buyTeneBtn.x + 10;
        this._nodeContainer.addChild(this._ownNumTxt);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acGobtnTxt", this.goHandler, this);
        this._goBtn.x = buyTeneBtn.x;
        this._goBtn.y = buyTeneBtn.y;
        this._goBtn.visible = false;
        this._nodeContainer.addChild(this._goBtn);
        var startY = bottomBg2.y + 10;
        for (var index = 0; index < 9; index++) {
            var attrNameTxt = ComponentManager.getTextField("0", 18, TextFieldConst.COLOR_BROWN);
            attrNameTxt.x = bottomBg2.x + 15;
            attrNameTxt.y = startY;
            startY = startY + attrNameTxt.height + 5;
            this._nodeContainer.addChild(attrNameTxt);
            this._txtList.push(attrNameTxt);
        }
        this._curSkinId = this._skinIdList[this._curSkinIdx];
        // this.refreshSkinInfo();
        this.switchBtnHandler(0, true);
    };
    AcTailorExchangeView.prototype.refreshSkin = function (params) {
        if (!params || !params.data) {
            return;
        }
        var tmpskinId = params.data;
        this._curSkinId = tmpskinId;
        for (var index = 0; index < this._skinIdList.length; index++) {
            if (tmpskinId == this._skinIdList[index]) {
                this._curSkinIdx = index;
                break;
            }
        }
        this.refreshSkinInfo();
    };
    AcTailorExchangeView.prototype.refreshSkinInfo = function () {
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(this._curSkinId);
        var ownSkin = Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._curSkinId);
        var wifeId = skinCfg.wifeId;
        var wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
        if (ownSkin) {
            this._goBtn.visible = true;
        }
        else {
            this._goBtn.visible = false;
        }
        // let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
        if (!this._curWifeImg) {
            var btY = this._nodeContainer.getChildByName("bottomBg").y;
            this._curWifeImg = BaseLoadBitmap.create("wife_skin_" + this._curSkinId);
            this._curWifeImg.width = 540;
            this._curWifeImg.height = 760;
            // this._curWifeImg.setScale(0.51);
            var Sca = (btY - 60 - this.container.y) / this._curWifeImg.height;
            this._curWifeImg.setScale(Sca);
            this._curWifeImg.anchorOffsetX = this._curWifeImg.width / 2;
            this._curWifeImg.anchorOffsetY = this._curWifeImg.height;
            this._curWifeImg.x = GameConfig.stageWidth / 2;
            // this._curWifeImg.y = 110;
            this._curWifeImg.y = btY - 50;
            if (this._curWifeImg.y < 498) {
                this._curWifeImg.y = 498;
            }
            this._nodeContainer.addChildAt(this._curWifeImg, 3);
        }
        else {
            this._curWifeImg.setload("wife_skin_" + this._curSkinId);
        }
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        // let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
        // wifePicStr = skinCfg.body;
        if (Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske")) {
            // egret.log("skinCfg.bone."+skinCfg.bone)
            this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            // this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_full3_3051");
            // this.addChildToContainer(this._droWifeIcon);
            this._nodeContainer.addChildAt(this._droWifeIcon, 2);
            this._droWifeIcon.setScale(0.8);
        }
        if (this._droWifeIcon) {
            // this._droWifeIcon.x = this._curWifeImg.x + 230;
            // this._droWifeIcon.y = this._curWifeImg.y + 760 + 40;
            this._droWifeIcon.x = this._curWifeImg.x;
            this._droWifeIcon.y = this._curWifeImg.y + 100;
            this._curWifeImg.visible = false;
        }
        else {
            this._curWifeImg.visible = true;
        }
        var cost = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, String(this._code)).shop[this._curSkinId];
        this._buyBtn.removeTextIcon();
        this._buyBtn.setText(cost.toString(), false);
        this._buyBtn.addTextIcon("tailor_icon2");
        var itemNum = Api.itemVoApi.getItemNumInfoVoById("2101");
        this._ownNumTxt.text = LanguageManager.getlocal("acTailorownNum", [itemNum.toString()]);
        this._txtList[0].text = LanguageManager.getlocal("skinName" + this._curSkinId);
        this._exchangeEnable = false;
        if (itemNum >= cost) {
            this._exchangeEnable = true;
        }
        var wifeName = LanguageManager.getlocal("wifeName_" + skinCfg.wifeId);
        if (Api.wifeVoApi.getWifeInfoVoById(skinCfg.wifeId)) {
            this._txtList[1].text = wifeName + LanguageManager.getlocal("servant_wife_own");
        }
        else {
            this._txtList[1].text = wifeName + LanguageManager.getlocal("servant_wife_not_own");
        }
        if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(skinCfg.id)) {
            this._ownNumTxt.setVisible(false);
        }
        else {
            this._ownNumTxt.setVisible(true);
        }
        this._txtList[2].text = LanguageManager.getlocal("skinDesc" + this._curSkinId);
        var resultStr = this.dealAttrChangeInfo();
        for (var index = 3; index < this._txtList.length; index++) {
            var str = resultStr[index - 3];
            if (str) {
                this._txtList[index].text = resultStr[index - 3];
            }
            else {
                this._txtList[index].text = "";
            }
        }
    };
    AcTailorExchangeView.prototype.dealAttrChangeInfo = function () {
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(this._curSkinId);
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
        if (atkAdd[0] == 1) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1]]));
        }
        else {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1] * 100 + "%"]));
        }
        if (inteAdd[0] == 1) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1]]));
        }
        else {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1] * 100 + "%"]));
        }
        if (politicsAdd[0] == 1) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1]]));
        }
        else {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1] * 100 + "%"]));
        }
        if (charmAdd[0] == 1) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1]]));
        }
        else {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1] * 100 + "%"]));
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
    AcTailorExchangeView.prototype.buyHandler = function (param) {
        var isOwn = Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._curSkinId);
        if (isOwn) {
            return;
        }
        /**
         * 资源不足
         */
        if (!this._exchangeEnable) {
            var tipMsg = LanguageManager.getlocal("acTailorExchangeFailTip");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: tipMsg,
                callback: this.hide,
                handler: this,
                needCancel: true
            });
            return;
        }
        /**
         * 未迎娶
         */
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(this._curSkinId);
        // let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
        if (!Api.wifeVoApi.getWifeInfoVoById(skinCfg.wifeId)) {
            var tipMsg = LanguageManager.getlocal("acTailorExchangeTip1");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: tipMsg,
                callback: this.doExchangeRequest,
                handler: this,
                needCancel: true
            });
            return;
        }
        this.doExchangeRequest();
    };
    AcTailorExchangeView.prototype.doExchangeRequest = function () {
        /**
        * 活动已结束
        */
        if (Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code).isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_OTHER_ACTIVITY_EXCHANGE_SKIN, { activeId: this._aid + "-" + this._code, shopId: this._curSkinId });
    };
    AcTailorExchangeView.prototype.goHandler = function () {
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(this._curSkinId);
        if (!Api.wifeVoApi.getWifeInfoVoById(skinCfg.wifeId)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acTailorGoTip1"));
            return;
        }
        // let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: skinCfg.wifeId, handler: this });
    };
    AcTailorExchangeView.prototype.buyCallbackHandler = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("acTailorExchangeTip2"));
        // this.refreshSkinInfo();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG, this._skinIdList[this._curSkinIdx]);
        // let rewards = rdata.data.rewards //6_1212_1
        // let rewardList =  GameData.formatRewardItem(rewards);
        // App.CommonUtil.playRewardFlyAction(rewardList);
    };
    AcTailorExchangeView.prototype.switchBtnHandler = function (param, init) {
        if (this._skinIdList.length == 0) {
            return;
        }
        if (init) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG, this._skinIdList[this._curSkinIdx]);
            return;
        }
        var max = this._skinIdList.length - 1;
        if ((this._curSkinIdx == 0 && param == -1) || (this._curSkinIdx == max && param == 1)) {
            return;
        }
        this._curSkinIdx += param;
        var tarDis = this._skinScrollView.scrollLeft;
        var moveDelta = 0;
        if (this._curSkinIdx * 113 - tarDis >= GameConfig.stageWidth) {
            moveDelta = this._curSkinIdx * 113 - tarDis - GameConfig.stageWidth;
            moveDelta += 113;
        }
        if (tarDis > this._curSkinIdx * 113) {
            moveDelta = this._curSkinIdx * 113 - tarDis;
        }
        this._skinScrollView.setScrollLeft(tarDis + moveDelta, 1000);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG, this._skinIdList[this._curSkinIdx]);
    };
    AcTailorExchangeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "tailor_bg2", "tailor_headmask",
        ]);
    };
    AcTailorExchangeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG, this.refreshSkin, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHER_ACTIVITY_EXCHANGE_SKIN), this.buyCallbackHandler, this);
        this._txtList = [];
        this._nodeContainer = null;
        this._ownNumTxt = null;
        this._curSkinId = null;
        this._txtList = [];
        this._aid = null;
        this._code = null;
        this._skinIdList = [];
        this._curSkinIdx = 0;
        this._skinScrollView = null;
        this._curWifeImg = null;
        this._buyBtn = null;
        this._goBtn = null;
        this._exchangeEnable = false;
        this._droWifeIcon = null;
        _super.prototype.dispose.call(this);
    };
    return AcTailorExchangeView;
}(CommonView));
__reflect(AcTailorExchangeView.prototype, "AcTailorExchangeView");
//# sourceMappingURL=AcTailorExchangeView.js.map