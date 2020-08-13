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
 * author : qianjun
 * date : 2018.4.14
 * desc : 七夕活动充值奖励itemrender
 */
var AcDoubleSeventhAwardScrollItem = (function (_super) {
    __extends(AcDoubleSeventhAwardScrollItem, _super);
    function AcDoubleSeventhAwardScrollItem() {
        var _this = _super.call(this) || this;
        //item数据
        _this._itemData = undefined;
        //序号
        _this._curIdx = 0;
        _this._rechargeItem = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcDoubleSeventhAwardScrollItem.prototype, "codeResStr", {
        get: function () {
            var str = "";
            switch (String(this._code)) {
                case "1":
                    str = "";
                    break;
                case "4":
                    str = "_code3";
                    break;
                default:
                    str = ("_code" + this._code);
                    break;
            }
            return str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhAwardScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACDOUBLESEVENTH, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhAwardScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACDOUBLESEVENTH, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhAwardScrollItem.prototype, "acTivityId", {
        get: function () {
            var seventhview = ViewController.getInstance().getView('AcDoubleSeventhView');
            return AcConst.AID_ACDOUBLESEVENTH + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcDoubleSeventhAwardScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 502;
        view.height = 342 + 7;
        this._itemData = data.key - 1;
        this._curIdx = this._itemData;
        var objList = view.vo.getArr("recharge");
        this._rechargeItem = view.cfg.recharge[this._itemData + 1]; //cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = 342;
        this.addChild(bg);
        var key = data.key;
        var topbg = BaseBitmap.create("acsevenitemtopbg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0, 5]);
        view.addChild(topbg);
        var buildTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhViewBuild" + key + this.codeResStr), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, buildTxt, topbg);
        view.addChild(buildTxt);
        var zsxian1 = BaseBitmap.create("acsevenitemzshi");
        zsxian1.x = buildTxt.x - 20 - zsxian1.width;
        zsxian1.y = buildTxt.y + buildTxt.height / 2 - zsxian1.height / 2;
        // view.setLayoutPosition(LayoutConst.leftverticalCenter, zsxian1, topbg, [80,0]);
        view.addChild(zsxian1);
        var zsxian2 = BaseBitmap.create("acsevenitemzshi");
        zsxian2.scaleX = -1;
        // view.setLayoutPosition(LayoutConst.rightverticalCenter, zsxian2, topbg, [199,0]);
        zsxian2.x = buildTxt.x + buildTxt.width + 20 + zsxian2.width;
        zsxian2.y = buildTxt.y + buildTxt.height / 2 - zsxian2.height / 2;
        view.addChild(zsxian2);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhChargeItem" + this.codeResStr, [view.cfg.recharge[key].needGem.toString(), buildTxt.text]), 18, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, topbg, [0, topbg.height + 10]);
        view.addChild(descTxt);
        // //消费红色标头   改变领取状态的时候需要更改这个图片
        // let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        // Txt1.text = LanguageManager.getlocal("acMayDayTotal_recharge",[String(this._rechargeItem.needGem)])
        // Txt1.x = this._detailBgImg.x+20;
        // Txt1.y = this._detailBgImg.y + 10;
        // this.addChild(Txt1);
        //创建奖励列表
        var rewardArr = GameData.formatRewardItem(this._rechargeItem.getReward);
        var scroStartY = descTxt.y + descTxt.textHeight + 20;
        var len = rewardArr.length >= 5 ? 5 : rewardArr.length;
        var tmpX = (bg.width - len * 84 - (len - 1) * 10) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(84 / 108);
            // tmpX =  20+ index * (iconItem.width+10);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 10);
            if (tmpX > bg.width - 10) {
                tmpX = (bg.width - len * 84 - (len - 1) * 10) / 2;
                scroStartY += iconItem.height * iconItem.scaleY + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 10);
            }
            this.addChild(iconItem);
        }
        scroStartY += 130;
        bg.height = scroStartY + 30;
        this.height = bg.height;
        var hua1 = BaseBitmap.create("acsevenhuawen");
        view.setLayoutPosition(LayoutConst.leftbottom, hua1, bg, [0, 0]);
        view.addChild(hua1);
        var hua2 = BaseBitmap.create("acsevenhuawen");
        hua2.scaleX = -1;
        view.setLayoutPosition(LayoutConst.rightbottom, hua2, bg, [85, 0]);
        view.addChild(hua2);
        //进度条
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 324);
        this.setLayoutPosition(LayoutConst.leftbottom, this._progress, bg, [10, 20]);
        this.addChild(this._progress);
        this.refreshBtnStatus();
    };
    //刷新按钮状态
    AcDoubleSeventhAwardScrollItem.prototype.refreshBtnStatus = function () {
        var tmpVo = this.vo;
        if (!tmpVo) {
            return;
        }
        var chargeTotal = tmpVo.getChargeNum();
        this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText", [String(chargeTotal), this._rechargeItem.needGem]));
        this._progress.setPercentage(chargeTotal / this._rechargeItem.needGem);
        if (this._collectFlag)
            this.removeChild(this._collectFlag);
        this._collectFlag = null;
        if (this._collectBtn)
            this.removeChild(this._collectBtn);
        this._collectBtn = null;
        if (this._chargeBtn)
            this.removeChild(this._chargeBtn);
        this._chargeBtn = null;
        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(this._itemData + 1) && AcDoubleSeventhAwardScrollItem._lastReqIdx != this._curIdx) {
            this.createCollectFlag();
        }
        else {
            if (chargeTotal >= this._rechargeItem.needGem) {
                var btr = "ac_recharge_Btntxt3";
                if (this._code == "5") {
                    btr = "ac_recharge_Btntxt4";
                }
                var collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, btr, this.eventCollectHandler, this);
                collectBtn.x = this._progress.x + this._progress.width + 20;
                collectBtn.y = this._progress.y + this._progress.height / 2 - collectBtn.height / 2;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
                chargeBtn.x = this._progress.x + this._progress.width + 20;
                chargeBtn.y = this._progress.y + this._progress.height / 2 - chargeBtn.height / 2;
                chargeBtn.name = "costBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
                if (!this.vo.isInActivity()) {
                    this._chargeBtn.setEnable(false);
                }
            }
        }
    };
    AcDoubleSeventhAwardScrollItem.prototype.refreshUI = function () {
        if (this.getChildByName("collectBtn")) {
            this.getChildByName("collectBtn").visible = false;
        }
        if (this._collectFlag) {
            this.removeChild(this._collectFlag);
            this._collectFlag = null;
        }
        /**
         * 展示已领取
         */
        this.createCollectFlag();
        this._collectFlag.visible = false;
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        egret.Tween.get(this._collectFlag).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
    };
    AcDoubleSeventhAwardScrollItem.prototype.createCollectFlag = function () {
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        this._collectFlag.setScale(0.7);
        this._collectFlag.x = this._progress.x + this._progress.width + 100;
        this._collectFlag.y = this._progress.y + this._progress.height / 2 - 10;
        this.addChild(this._collectFlag);
    };
    AcDoubleSeventhAwardScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (AcDoubleSeventhAwardScrollItem._lastReqIdx != this._curIdx) {
            return;
        }
        AcDoubleSeventhAwardScrollItem._lastReqIdx = null;
        this.refreshUI();
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = AcDoubleSeventhAwardScrollItem._lastPos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcDoubleSeventhAwardScrollItem.prototype.eventCollectHandler = function (event) {
        var view = this;
        if (!view.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var awardview = ViewController.getInstance().getView('AcDoubleSeventhAwardView');
        if (awardview) {
            awardview.hide();
        }
        // AcDoubleSeventhAwardScrollItem._lastReqIdx = this._curIdx;
        // AcDoubleSeventhAwardScrollItem._lastPos = this._collectBtn.localToGlobal(this._collectBtn.width/2 + 50,20);
        //NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE,{activeId:this.acTivityId,rechargeId:this._itemData + 1})
    };
    AcDoubleSeventhAwardScrollItem.prototype.goRechargeHandler = function (event) {
        var view = this;
        if (!view.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcDoubleSeventhAwardScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcDoubleSeventhAwardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcDoubleSeventhAwardScrollItem.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE),this.eventCollectHandlerCallBack,this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.refreshBtnStatus,this);
        this._itemData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._curIdx = 0;
        this._rechargeItem = null;
        // this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    AcDoubleSeventhAwardScrollItem._lastReqIdx = null;
    AcDoubleSeventhAwardScrollItem._lastPos = null;
    return AcDoubleSeventhAwardScrollItem;
}(ScrollListItem));
__reflect(AcDoubleSeventhAwardScrollItem.prototype, "AcDoubleSeventhAwardScrollItem");
//# sourceMappingURL=AcDoubleSeventhAwardScrollItem.js.map