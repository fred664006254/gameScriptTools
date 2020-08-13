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
var AcLotteryScrollItem = (function (_super) {
    __extends(AcLotteryScrollItem, _super);
    function AcLotteryScrollItem() {
        var _this = _super.call(this) || this;
        //item数据
        _this._itemData = undefined;
        //序号
        _this._curIdx = 0;
        _this._rechargeItem = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcLotteryScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACMAYDAY, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotteryScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_LOTTERY, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotteryScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_LOTTERY + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcLotteryScrollItem.prototype.initItem = function (index, data, itemParam) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLOTTERYREWARD), this.eventCollectHandlerCallBack, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOTTERY_REFRESHVO, this.refreshBtnStatus, this);
        this._itemData = data;
        this._code = itemParam;
        this._curIdx = index;
        var cfgObj = this.cfg;
        // let objList = cfgObj.recharge;
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_9_bg14");
        bg.x = 5;
        bg.width = 512;
        bg.height = 246;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("accarnivalview_tab_red");
        this._detailBgImg.y = 5;
        this._detailBgImg.x = 2;
        this.addChild(this._detailBgImg);
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        Txt1.text = LanguageManager.getlocal("acMayDayTotal_recharge", [String(data.needGem)]);
        Txt1.x = this._detailBgImg.x + 20;
        Txt1.y = this._detailBgImg.y + 10;
        this.addChild(Txt1);
        //创建奖励列表
        var rewardArr = GameData.formatRewardItem(this._itemData.getReward);
        var scroStartY = 60;
        var tmpX = 24;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            iconItem.setScale(0.8);
            tmpX += (iconItem.width + 7 - 15);
            if (tmpX > bg.width - 8) {
                tmpX = 14;
                scroStartY += iconItem.height + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width + 7 - 15);
            }
            this.addChild(iconItem);
        }
        scroStartY += 130;
        bg.height = scroStartY + 60;
        this.height = bg.height;
        //进度条
        this._progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 300);
        this._progress.x = 20;
        this._progress.y = scroStartY;
        this.addChild(this._progress);
        this.refreshBtnStatus();
    };
    //刷新按钮状态
    AcLotteryScrollItem.prototype.refreshBtnStatus = function () {
        var tmpVo = this.vo;
        if (!tmpVo) {
            return;
        }
        var chargeTotal = tmpVo.getChargeNum();
        this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText", [String(chargeTotal), this._itemData.needGem]));
        this._progress.setPercentage(chargeTotal / this._itemData.needGem);
        if (this._collectFlag)
            this.removeChild(this._collectFlag);
        this._collectFlag = null;
        if (this._collectBtn)
            this.removeChild(this._collectBtn);
        this._collectBtn = null;
        if (this._chargeBtn)
            this.removeChild(this._chargeBtn);
        this._chargeBtn = null;
        // //根据是否达到金额设置title颜色
        // if (chargeTotal >= this._itemData.needGem)
        // {
        //     this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_green");
        // } else {
        //     this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_red");
        // }
        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(this._curIdx + 1) && AcLotteryScrollItem._lastReqIdx != this._curIdx) {
            this.createCollectFlag();
        }
        else {
            if (chargeTotal >= this._itemData.needGem) {
                var collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ac_recharge_Btntxt2", this.eventCollectHandler, this);
                collectBtn.x = this._progress.x + this._progress.width + 20;
                collectBtn.y = this._progress.y + this._progress.height / 2 - collectBtn.height / 2;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
                chargeBtn.x = this._progress.x + this._progress.width + 20;
                chargeBtn.y = this._progress.y + this._progress.height / 2 - chargeBtn.height / 2;
                chargeBtn.name = "costBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
                var t = this.vo.et - GameData.serverTime - 86400 * 1;
                if (t < 0) {
                    this._chargeBtn.touchEnabled = false;
                    App.DisplayUtil.changeToGray(this._chargeBtn);
                }
            }
        }
    };
    AcLotteryScrollItem.prototype.refreshUI = function () {
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
    AcLotteryScrollItem.prototype.createCollectFlag = function () {
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        this._collectFlag.setScale(0.7);
        this._collectFlag.x = this._progress.x + this._progress.width + 100;
        this._collectFlag.y = this._progress.y + this._progress.height / 2 - 10;
        this.addChild(this._collectFlag);
    };
    AcLotteryScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if (AcLotteryScrollItem._lastReqIdx != this._curIdx) {
            return;
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLOTTERYREWARD), this.eventCollectHandlerCallBack, this);
        AcLotteryScrollItem._lastReqIdx = null;
        this.refreshUI();
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
    };
    AcLotteryScrollItem.prototype.eventCollectHandler = function (event) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        AcLotteryScrollItem._lastReqIdx = this._curIdx;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB), this.eventCollectHandlerCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETLOTTERYREWARD, { activeId: this.acTivityId, rkey: this._curIdx + 1 });
    };
    AcLotteryScrollItem.prototype.goRechargeHandler = function (event) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcLotteryScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcLotteryScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcLotteryScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLOTTERYREWARD), this.eventCollectHandlerCallBack, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LOTTERY_REFRESHVO, this.refreshBtnStatus, this);
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
    AcLotteryScrollItem._lastReqIdx = null;
    AcLotteryScrollItem._lastPos = null;
    return AcLotteryScrollItem;
}(ScrollListItem));
__reflect(AcLotteryScrollItem.prototype, "AcLotteryScrollItem");
//# sourceMappingURL=AcLotteryScrollItem.js.map