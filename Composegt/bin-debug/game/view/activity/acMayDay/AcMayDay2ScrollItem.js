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
 * desc : 转盘活动 累计充值itemrender
 */
var AcMayDay2ScrollItem = (function (_super) {
    __extends(AcMayDay2ScrollItem, _super);
    function AcMayDay2ScrollItem() {
        var _this = _super.call(this) || this;
        //item数据
        _this._itemData = undefined;
        //序号
        _this._curIdx = 0;
        _this._rechargeItem = null;
        return _this;
    }
    Object.defineProperty(AcMayDay2ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDay2ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDay2ScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.refreshBtnStatus, this);
        this._itemData = data;
        this._curIdx = index;
        var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        var objList = cfgObj.recharge;
        this._rechargeItem = cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 610;
        bg.height = 246;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("activity_charge_red");
        this._detailBgImg.width = 470;
        this._detailBgImg.y = 3;
        this.addChild(this._detailBgImg);
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acMayDayTotal_recharge", [String(this._rechargeItem.needGem)]);
        Txt1.x = this._detailBgImg.x + 20;
        Txt1.y = this._detailBgImg.y + this._detailBgImg.height / 2 - Txt1.height / 2;
        this.addChild(Txt1);
        //创建奖励列表
        var rewardArr = GameData.formatRewardItem(this._rechargeItem.getReward);
        var scroStartY = 60;
        var tmpX = 14;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            // tmpX =  20+ index * (iconItem.width+10);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width + 7);
            if (tmpX > bg.width - 8) {
                tmpX = 14;
                scroStartY += iconItem.height + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width + 7);
            }
            this.addChild(iconItem);
        }
        scroStartY += 130;
        bg.height = scroStartY + 60;
        this.height = bg.height + 5;
        //进度条
        this._progress = ComponentManager.getProgressBar("progress_type1_yellow", "progress_type1_bg", 386);
        this._progress.x = 20;
        // progress.y = 185;
        this._progress.y = scroStartY;
        this.addChild(this._progress);
        this.refreshBtnStatus();
    };
    //刷新按钮状态
    AcMayDay2ScrollItem.prototype.refreshBtnStatus = function () {
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
        //根据是否达到金额设置title颜色
        // if (chargeTotal >= this._rechargeItem.needGem)
        // {
        //     this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_green");
        // } else {
        //     this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_red");
        // }
        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(this._curIdx + 1) && AcMayDay2ScrollItem._lastReqIdx != this._curIdx) {
            this.createCollectFlag();
        }
        else {
            if (chargeTotal >= this._rechargeItem.needGem) {
                var collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "ac_recharge_Btntxt2", this.eventCollectHandler, this);
                collectBtn.x = 440;
                collectBtn.y = this._progress.y + this._progress.height / 2 - collectBtn.height / 2;
                ;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
                chargeBtn.x = 440;
                chargeBtn.y = this._progress.y + this._progress.height / 2 - chargeBtn.height / 2;
                chargeBtn.name = "costBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
            }
        }
    };
    AcMayDay2ScrollItem.prototype.refreshUI = function () {
        if (this._collectBtn) {
            this._collectBtn.visible = false;
        }
        if (!this._collectFlag) {
            /**
             * 展示已领取
             */
            this.createCollectFlag();
            this._collectFlag.setScale(1.5);
            egret.Tween.get(this._collectFlag).to({ scaleX: 1, scaleY: 1 }, 300);
        }
    };
    AcMayDay2ScrollItem.prototype.createCollectFlag = function () {
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        // this._collectFlag.setScale(0.7);
        this._collectFlag.x = 450 + this._collectFlag.width / 2;
        this._collectFlag.y = this._progress.y + this._progress.height / 2 - 10;
        this.addChild(this._collectFlag);
    };
    AcMayDay2ScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if (AcMayDay2ScrollItem._lastReqIdx != this._curIdx) {
            return;
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB), this.eventCollectHandlerCallBack, this);
        AcMayDay2ScrollItem._lastReqIdx = null;
        this.refreshUI();
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = AcMayDay2ScrollItem._lastPos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    Object.defineProperty(AcMayDay2ScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcMayDayView.AID + "-" + AcMayDayView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcMayDay2ScrollItem.prototype.eventCollectHandler = function (event) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        AcMayDay2ScrollItem._lastReqIdx = this._curIdx;
        AcMayDay2ScrollItem._lastPos = this._progress.localToGlobal(this._progress.width + 80, 20);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB), this.eventCollectHandlerCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB, { activeId: this.acTivityId, rechargeId: this._curIdx + 1 });
    };
    AcMayDay2ScrollItem.prototype.goRechargeHandler = function (event) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcMayDay2ScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcMayDay2ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcMayDay2ScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB), this.eventCollectHandlerCallBack, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.refreshBtnStatus, this);
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
    AcMayDay2ScrollItem._lastReqIdx = null;
    AcMayDay2ScrollItem._lastPos = null;
    return AcMayDay2ScrollItem;
}(ScrollListItem));
__reflect(AcMayDay2ScrollItem.prototype, "AcMayDay2ScrollItem");
