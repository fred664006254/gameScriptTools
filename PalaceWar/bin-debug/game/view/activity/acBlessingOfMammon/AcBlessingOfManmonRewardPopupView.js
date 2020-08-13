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
 * 奖励详情
 * author ycg
 * date 2020.2.14
 * @class AcBlessingOfMammonRewardPopupView
 */
var AcBlessingOfMammonRewardPopupView = (function (_super) {
    __extends(AcBlessingOfMammonRewardPopupView, _super);
    function AcBlessingOfMammonRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._progress = null;
        _this._chargeBtn = null;
        _this._collect = null;
        _this._getBtn = null;
        return _this;
    }
    AcBlessingOfMammonRewardPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUI, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, this.getRewardCallback, this);
        var data = this.param.data.data;
        this._data = data;
        var rewards = null;
        if (data && data.getReward) {
            rewards = data.getReward;
        }
        var rewardArr = GameData.getRewardItemIcons(rewards, true, true);
        var listbg = BaseBitmap.create("public_9_bg94");
        listbg.width = 510;
        listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, 15);
        this.addChildToContainer(listbg);
        var arrLength = rewardArr.length;
        var scale = 0.8;
        var stX = listbg.x + (listbg.width - (5 * (rewardArr[0].width * scale + 10) - 10)) / 2;
        if (arrLength < 5) {
            stX = listbg.x + (listbg.width - (arrLength * (rewardArr[0].width * scale + 10) - 10)) / 2;
        }
        var lastIndex = 0;
        var lastStX = 0;
        var lastLength = arrLength % 5;
        if (Math.ceil(arrLength / 5) > 1 && lastLength > 0) {
            lastIndex = arrLength - lastLength;
            lastStX = listbg.x + (listbg.width - (lastLength * (rewardArr[0].width * scale + 10) - 10)) / 2;
        }
        for (var i = 0; i < arrLength; i++) {
            var item = rewardArr[i];
            item.setScale(scale);
            if (lastIndex != 0 && lastIndex <= i) {
                item.x = lastStX + (item.width * scale + 10) * (i % 5);
            }
            else {
                item.x = stX + (item.width * scale + 10) * (i % 5);
            }
            item.y = listbg.y + 15 + Math.floor(i / 5) * (item.height * scale + 15);
            this.addChildToContainer(item);
        }
        var itemOffY = listbg.y + 10 + Math.floor((arrLength - 1) / 5) * (108 * scale + 15) + 108 * scale;
        var infoBg = BaseBitmap.create("public_infobg3");
        infoBg.alpha = 0.7;
        infoBg.setPosition(listbg.x + listbg.width / 2 - infoBg.width / 2, itemOffY + 20);
        this.addChildToContainer(infoBg);
        var infoText = BaseBitmap.create("acblessingofmammon_chargeinfotxt");
        this.addChildToContainer(infoText);
        //currNum
        var extraData = this.vo.getExtraRewardNum(data.id);
        var extraInfoStr = LanguageManager.getlocal("acBlessingOfMonmonRewardPopupExtraInfo", ["" + extraData.min, "" + extraData.max]);
        var currNum = ComponentManager.getBitmapText("" + extraInfoStr, "acblessingmammon_fnt", TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_BIG, false);
        currNum.anchorOffsetX = currNum.width / 2;
        // currNum.setScale(0.6);
        infoText.width = infoText.width - 57 + currNum.width;
        infoText.setPosition(infoBg.x + infoBg.width / 2 - infoText.width / 2, infoBg.y + infoBg.height / 2 - infoText.height / 2);
        currNum.setPosition(infoText.x + 105 + (infoText.width - 105 - 64) / 2, infoText.y + infoText.height / 2 - currNum.height * currNum.scaleY / 2);
        this.addChildToContainer(currNum);
        if (!Api.switchVoApi.checkOpenBMFont()) {
            currNum.y = infoText.y + infoText.height / 2 - currNum.height / 2 + 4;
        }
        var progress = ComponentManager.getProgressBar("progress21", "progress21_bg", 400);
        progress.setPosition(infoBg.x + infoBg.width / 2 - progress.width / 2, infoBg.y + infoBg.height + 10);
        this.addChildToContainer(progress);
        var currCharge = this.vo.getCurrRecharge();
        var proText = LanguageManager.getlocal("acBlessingOfMonmonRewardPopupChargeInfo", ["" + currCharge, data.needGem]);
        progress.setPercentage(currCharge / Number(data.needGem), proText);
        this._progress = progress;
        listbg.height = progress.y + progress.height - listbg.y + 15;
        var collectFlag = BaseBitmap.create("collectflag");
        collectFlag.setScale(0.7);
        collectFlag.setPosition(listbg.x + listbg.width / 2 - collectFlag.width * collectFlag.scaleX / 2, listbg.y + listbg.height + 15);
        this.addChildToContainer(collectFlag);
        this._collect = collectFlag;
        collectFlag.visible = false;
        var chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_RED, "acBlessingOfMonmonRewardPopupChargeBtn", this.chargeBtnClick, this);
        chargeBtn.setPosition(listbg.x + listbg.width / 2 - chargeBtn.width / 2, listbg.y + listbg.height + 15);
        this.addChildToContainer(chargeBtn);
        this._chargeBtn = chargeBtn;
        chargeBtn.visible = false;
        var getBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "taskCollect", this.getRewardBtnClick, this);
        getBtn.setPosition(listbg.x + listbg.width / 2 - getBtn.width / 2, listbg.y + listbg.height + 15);
        this.addChildToContainer(getBtn);
        this._getBtn = getBtn;
        getBtn.visible = false;
        this.refreshUI();
    };
    AcBlessingOfMammonRewardPopupView.prototype.refreshUI = function () {
        var currCharge = this.vo.getCurrRecharge();
        var proText = LanguageManager.getlocal("acBlessingOfMonmonRewardPopupChargeInfo", ["" + currCharge, this._data.needGem]);
        this._progress.setPercentage(currCharge / Number(this._data.needGem), proText);
        if (this.vo.isGetChargeRewardById(this._data.id)) {
            this._collect.visible = true;
            this._chargeBtn.visible = false;
            this._getBtn.visible = false;
        }
        else {
            if (currCharge >= Number(this._data.needGem)) {
                this._collect.visible = false;
                this._chargeBtn.visible = false;
                this._getBtn.visible = true;
            }
            else {
                this._collect.visible = false;
                this._chargeBtn.visible = true;
                this._getBtn.visible = false;
            }
        }
    };
    //前往充值
    AcBlessingOfMammonRewardPopupView.prototype.chargeBtnClick = function () {
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    //领取奖励
    AcBlessingOfMammonRewardPopupView.prototype.getRewardBtnClick = function () {
        if (!this.vo.isStart) {
            this.vo.showAcEndTip();
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, { activeId: this.vo.aidAndCode, rkey: this._data.id });
    };
    AcBlessingOfMammonRewardPopupView.prototype.getRewardCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var rData = event.data.data.data;
        // let rInfo = this.vo.getFormatRewards(rData.rewards);
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rData.rewards, "otherRewards": rData.otherrewards, "isPlayAni": true });
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    };
    Object.defineProperty(AcBlessingOfMammonRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBlessingOfMammonRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBlessingOfMammonRewardPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcBlessingOfMammonRewardPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBlessingOfMammonRewardPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBlessingOfMammonRewardPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    AcBlessingOfMammonRewardPopupView.prototype.getTitleStr = function () {
        return "acBlessingOfMonmonRewardPopupTitle";
    };
    AcBlessingOfMammonRewardPopupView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcBlessingOfMammonRewardPopupView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcBlessingOfMammonRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress21_bg", "progress21", "collectflag", "acblessingofmammon_chargeinfotxt", "acblessingmammon_fnt"
        ]);
    };
    AcBlessingOfMammonRewardPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUI, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, this.getRewardCallback, this);
        this._data = null;
        this._progress = null;
        this._collect = null;
        this._chargeBtn = null;
        this._getBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcBlessingOfMammonRewardPopupView;
}(PopupView));
__reflect(AcBlessingOfMammonRewardPopupView.prototype, "AcBlessingOfMammonRewardPopupView");
//# sourceMappingURL=AcBlessingOfManmonRewardPopupView.js.map