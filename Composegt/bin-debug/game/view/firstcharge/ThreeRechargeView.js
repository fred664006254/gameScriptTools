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
var ThreeRechargeView = (function (_super) {
    __extends(ThreeRechargeView, _super);
    function ThreeRechargeView() {
        var _this = _super.call(this) || this;
        _this._container = null;
        _this.getBtnY = 0;
        _this._lightArr = [];
        return _this;
    }
    ThreeRechargeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_THREECHARGEREWARD), this.useCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.updateButton, this);
        var servantID = 9999;
        var bg2 = BaseLoadBitmap.create("threechargebg1");
        bg2.height = 942;
        bg2.width = 640;
        bg2.y = bg2.y + (GameConfig.stageHeigth - bg2.height) / 2;
        this.addChild(bg2);
        var cfg71 = Config.RechargeCfg.getRechargeItemCfgByKey("g71");
        this.showReward(bg2, bg2.y + 579, cfg71.getReward);
        var doButton = ComponentManager.getButton("acarrowbuttonbg", "", this.clickGetBtnHandler, this, null, null, 32);
        doButton.x = 180;
        doButton.y = bg2.y + 865;
        doButton.setColor(TextFieldConst.COLOR_BROWN);
        this.addChild(doButton);
        var btnStr = "";
        var rechargeFlag = Api.shopVoApi.getThreeRateCharge();
        if (rechargeFlag == 1) {
            btnStr = LanguageManager.getlocal("taskCollect");
        }
        else if (rechargeFlag == 2) {
            btnStr = LanguageManager.getlocal("candyGetAlready");
        }
        else {
            btnStr = LanguageManager.getlocal("anyMoney", [cfg71.cost + ""]);
        }
        doButton.setText(btnStr, false);
        this._getBtn = doButton;
        this.setChildIndex(this.closeBtn, -1);
    };
    ThreeRechargeView.prototype.showReward = function (bg, iconY, rewardStr) {
        if (iconY === void 0) { iconY = 0; }
        var temScale = 0.78;
        var spaceW = 8;
        var spaceH = 10;
        var rewardItemVoList = GameData.formatRewardItem(rewardStr);
        var rect = egret.Rectangle.create();
        if (rewardItemVoList.length > 5) {
            rect.setTo(0, 0, 580, 175);
        }
        var scrollListContainer = new BaseDisplayObjectContainer();
        scrollListContainer.width = rect.width;
        scrollListContainer.height = rect.height;
        scrollListContainer.x = bg.x + 2;
        scrollListContainer.y = bg.y + 635;
        this.addChild(scrollListContainer);
        var scrollList = ComponentManager.getScrollList(MailRewardScrollItem, rewardItemVoList, rect);
        scrollListContainer.addChild(scrollList);
        scrollList.y = 3;
        scrollList.x = 70;
        for (var i = 0; i < rewardItemVoList.length; i++) {
            var raeardItem = rewardItemVoList[i];
            if (raeardItem.type == 11) {
                var titlepath = Config.TitleCfg.getTitleIcon3WithLv(raeardItem.id);
                var _officerImg = BaseLoadBitmap.create(titlepath);
                _officerImg.setScale(1.3);
                _officerImg.x = bg.x + 20;
                _officerImg.y = bg.y + 240;
                this.addChild(_officerImg);
                var maskbg = BaseBitmap.create("public_9v_bg01");
                maskbg.x = 70;
                maskbg.y = bg.y + 200;
                maskbg.width = 500;
                maskbg.height = 380;
                maskbg.name = "maskbg";
                this.addChild(maskbg);
                var userPic = Api.playerVoApi.getPlayePicId();
                var roleNode = Api.playerVoApi.getPlayerPortrait(raeardItem.id, userPic);
                roleNode.y = bg.y + 215;
                roleNode.x = 170;
                roleNode.setScale(0.8);
                this.addChild(roleNode);
                roleNode.mask = maskbg;
                break;
            }
        }
    };
    ThreeRechargeView.prototype.useCallback = function () {
        var btnStr = "";
        var rechargeFlag = Api.shopVoApi.getThreeRateCharge();
        if (rechargeFlag == 1) {
            btnStr = LanguageManager.getlocal("taskCollect");
        }
        else if (rechargeFlag == 2) {
            btnStr = LanguageManager.getlocal("candyGetAlready");
            this._getBtn.setEnable(false);
        }
        this._getBtn.setText(btnStr, false);
        var cfg71 = Config.RechargeCfg.getRechargeItemCfgByKey("g71");
        var rewardList = GameData.formatRewardItem(cfg71.getReward);
        if (rewardList) {
            var globalPt = this.localToGlobal(this._getBtn.x, this._getBtn.y - 40);
            var runPos = new egret.Point(globalPt.x + 55, globalPt.y - 30);
            App.CommonUtil.playRewardFlyAction(rewardList, runPos);
        }
    };
    ThreeRechargeView.prototype.clickGetBtnHandler = function () {
        var rechargeFlag = Api.shopVoApi.getThreeRateCharge();
        if (rechargeFlag == 0) {
            var id = "g71";
            console.log(id);
            PlatformManager.pay(id);
        }
        else if (rechargeFlag == 1) {
            //发送购买请求
            NetManager.request(NetRequestConst.REQUEST_SHOP_THREECHARGEREWARD, { "gtype": "g71" });
        }
    };
    ThreeRechargeView.prototype.updateButton = function () {
        var btnStr = "";
        var rechargeFlag = Api.shopVoApi.getThreeRateCharge();
        if (rechargeFlag == 1) {
            btnStr = LanguageManager.getlocal("taskCollect");
        }
        else if (rechargeFlag == 2) {
            btnStr = LanguageManager.getlocal("candyGetAlready");
            this._getBtn.setEnable(false);
        }
        this._getBtn.setText(btnStr, false);
    };
    ThreeRechargeView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("firstchargebg01");
        this.addChild(this.viewBg);
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     * 仅适用于新的分享
     */
    ThreeRechargeView.prototype.resetBgSize = function () {
        if (PlatformManager.hasSpcialCloseBtn()) {
            this.closeBtn.setPosition(520, 100);
        }
        else {
            this.closeBtn.setPosition(545, 50);
        }
    };
    ThreeRechargeView.prototype.getTitleBgName = function () {
        return null;
    };
    ThreeRechargeView.prototype.getCloseBtnName = function () {
        return "btn_win_closebtn";
    };
    ThreeRechargeView.prototype.getTitleStr = function () {
        return null;
    };
    ThreeRechargeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "btn_win_closebtn",
            "threechargebg1",
            "acarrowbuttonbg",
        ]);
    };
    ThreeRechargeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_THREECHARGEREWARD), this.useCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.updateButton, this);
        this._getBtn = null;
        this._container = null;
        this._lightArr = [];
    };
    return ThreeRechargeView;
}(PopupView));
__reflect(ThreeRechargeView.prototype, "ThreeRechargeView");
