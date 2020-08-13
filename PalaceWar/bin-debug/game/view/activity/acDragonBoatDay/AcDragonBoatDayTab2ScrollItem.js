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
 * desc : 端午活动 累计充值itemrender
 */
var AcDragonBoatDayTab2ScrollItem = (function (_super) {
    __extends(AcDragonBoatDayTab2ScrollItem, _super);
    function AcDragonBoatDayTab2ScrollItem() {
        var _this = _super.call(this) || this;
        //item数据
        _this._itemData = undefined;
        //序号
        _this._curIdx = 0;
        _this._rechargeItem = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcDragonBoatDayTab2ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACDRAGONBOAT, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayTab2ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACDRAGONBOAT, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayTab2ScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_ACDRAGONBOAT + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcDragonBoatDayTab2ScrollItem.prototype.getTypeCode = function () {
        var code = this._code;
        if (code == '6') {
            code = '3';
        }
        return code;
    };
    AcDragonBoatDayTab2ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE), this.eventCollectHandlerCallBack, this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.refreshBtnStatus,this);
        view.width = 598;
        view.height = 248 + 10;
        this._itemData = data.key - 1;
        this._curIdx = this._itemData;
        var objList = view.vo.getArr("recharge");
        this._rechargeItem = view.cfg.recharge[this._itemData]; //cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 598;
        bg.height = 248;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("accarnivalview_tab_red");
        this._detailBgImg.y = 5;
        this._detailBgImg.x = 2;
        this.addChild(this._detailBgImg);
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acMayDayTotal_recharge", [String(this._rechargeItem.needGem)]);
        Txt1.x = this._detailBgImg.x + 20;
        Txt1.y = this._detailBgImg.y + 10;
        this.addChild(Txt1);
        //创建奖励列表
        // let servantId = '1049';
        // if(this._rechargeItem.getReward.indexOf(servantId) > -1){
        //     if(Api.servantVoApi.getServantObj(servantId)){
        //         let cfg = Config.ServantCfg.getServantItemById(servantId);
        //         if(cfg.exchange && cfg.exchange !== ''){
        //             this._rechargeItem.getReward = this._rechargeItem.getReward.replace('8_1049_1', cfg.exchange);
        //         }
        //     }
        // }
        var rewardArr = GameData.formatRewardItem(this._rechargeItem.getReward);
        var scroStartY = 80;
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
        this.height = bg.height;
        //进度条
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 386);
        this._progress.x = 20;
        // progress.y = 185;
        this._progress.y = scroStartY;
        this.addChild(this._progress);
        this.refreshBtnStatus();
    };
    //刷新按钮状态
    AcDragonBoatDayTab2ScrollItem.prototype.refreshBtnStatus = function () {
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
        if (chargeTotal >= this._rechargeItem.needGem) {
            this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_green");
        }
        else {
            this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_red");
        }
        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(this._itemData + 1) && AcDragonBoatDayTab2ScrollItem._lastReqIdx != this._curIdx) {
            this.createCollectFlag();
        }
        else {
            if (chargeTotal >= this._rechargeItem.needGem) {
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
                if (!this.vo.isInActivity()) {
                    this._chargeBtn.setEnable(false);
                }
            }
        }
    };
    AcDragonBoatDayTab2ScrollItem.prototype.refreshUI = function () {
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
    AcDragonBoatDayTab2ScrollItem.prototype.createCollectFlag = function () {
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        this._collectFlag.setScale(0.7);
        this._collectFlag.x = this._progress.x + this._progress.width + 100;
        this._collectFlag.y = this._progress.y + this._progress.height / 2 - 10;
        this.addChild(this._collectFlag);
    };
    AcDragonBoatDayTab2ScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (AcDragonBoatDayTab2ScrollItem._lastReqIdx != this._curIdx) {
            return;
        }
        AcDragonBoatDayTab2ScrollItem._lastReqIdx = null;
        this.refreshUI();
        var rewards = rData.rewards;
        if (this._rechargeItem.getReward !== rewards) {
            var rewardItemvo = GameData.formatRewardItem(this._rechargeItem.getReward)[0];
            var servantReward = null;
            var name_1 = '';
            var exchange = void 0;
            if (rewardItemvo.type == 8) {
                servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
                name_1 = servantReward.name;
                exchange = servantReward.exchange;
            }
            else if (rewardItemvo.type == 19) {
                servantReward = Config.ServantskinCfg.getServantSkinItemById(rewardItemvo.id);
                name_1 = servantReward.getSkinName();
                exchange = servantReward.returnItem;
            }
            else if (rewardItemvo.type == 10) {
                servantReward = Config.WifeCfg.getWifeCfgById(rewardItemvo.id);
                name_1 = servantReward.name;
                exchange = servantReward.exchange;
            }
            if (servantReward) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": name_1, "touch": exchange, "message": "changeOtherRewardTip", "callback": function () {
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
                    }, "handler": this });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
            }
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
        }
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
        // let rewardList =  GameData.formatRewardItem(rewards);
        // let pos = AcDragonBoatDayTab2ScrollItem._lastPos;
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
    };
    AcDragonBoatDayTab2ScrollItem.prototype.eventCollectHandler = function (event) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        AcDragonBoatDayTab2ScrollItem._lastReqIdx = this._curIdx;
        AcDragonBoatDayTab2ScrollItem._lastPos = this._collectBtn.localToGlobal(this._collectBtn.width / 2 + 50, 20);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE, { activeId: this.acTivityId, rechargeId: this._itemData + 1 });
    };
    AcDragonBoatDayTab2ScrollItem.prototype.goRechargeHandler = function (event) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcDragonBoatDayTab2ScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcDragonBoatDayTab2ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcDragonBoatDayTab2ScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE), this.eventCollectHandlerCallBack, this);
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
    AcDragonBoatDayTab2ScrollItem._lastReqIdx = null;
    AcDragonBoatDayTab2ScrollItem._lastPos = null;
    return AcDragonBoatDayTab2ScrollItem;
}(ScrollListItem));
__reflect(AcDragonBoatDayTab2ScrollItem.prototype, "AcDragonBoatDayTab2ScrollItem");
//# sourceMappingURL=AcDragonBoatDayTab2ScrollItem.js.map