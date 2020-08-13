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
 * 狂欢节活动每日充值的列表item
 * author jiangliuyang
 * date 2018/4/11
 * @class AcCarnivalChargeScrollItem
 */
var AcCarnivalChargeScrollItem = (function (_super) {
    __extends(AcCarnivalChargeScrollItem, _super);
    function AcCarnivalChargeScrollItem() {
        var _this = _super.call(this) || this;
        //item数据
        _this._itemData = undefined;
        //序号
        _this._curIdx = 0;
        _this._rechargeItem = null;
        return _this;
    }
    AcCarnivalChargeScrollItem.prototype.initItem = function (index, data) {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE),this.eventCollectHandlerCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_CHARGE, this.refreshBtnStatus, this);
        // App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.refreshBtnStatus,this);
        this._itemData = data;
        this._curIdx = index;
        var totalVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCharge");
        var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("carnivalCharge", totalVo.code);
        this._rechargeItem = cfgObj.getRechargeItemById(this._itemData);
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_9v_bg04");
        bg.width = 598;
        bg.height = 246;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("accarnivalview_tab_red"); //activity_charge_red accarnivalview_tab_red
        this._detailBgImg.y = 5;
        this._detailBgImg.x = 2;
        this.addChild(this._detailBgImg);
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acCarnivalChargeItemTitle", [String(this._rechargeItem.needGem)]);
        Txt1.x = this._detailBgImg.x + 20;
        Txt1.y = this._detailBgImg.y + 10;
        this.addChild(Txt1);
        //创建奖励列表
        var rewardArr = GameData.formatRewardItem(this._rechargeItem.reward);
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
        this.height = bg.height;
        //进度条
        this._progress = ComponentManager.getProgressBar("progress_type1_yellow", "progress_type1_bg", 386);
        this._progress.x = 20;
        // progress.y = 185;
        this._progress.y = scroStartY;
        this.addChild(this._progress);
        this.refreshBtnStatus();
    };
    AcCarnivalChargeScrollItem.prototype.refreshBtnStatus = function () {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCharge");
        // if(!tmpVo || !tmpVo.v)
        // {
        //     return;
        // }
        this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText", [String(tmpVo.v), this._rechargeItem.needGem]));
        this._progress.setPercentage(tmpVo.v / this._rechargeItem.needGem);
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
        if (tmpVo.v >= this._rechargeItem.needGem) {
            this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_green");
        }
        else {
            this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_red");
        }
        if (tmpVo.flags[this._itemData] && AcCarnivalChargeScrollItem._lastReqIdx != this._curIdx) {
            this.createCollectFlag();
        }
        else {
            if (tmpVo.v >= this._rechargeItem.needGem) {
                var collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ac_recharge_Btntxt2", this.eventCollectHandler, this);
                collectBtn.x = this._progress.x + this._progress.width + 20;
                collectBtn.y = this._progress.y + this._progress.height / 2 - collectBtn.height / 2;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
                chargeBtn.x = this._progress.x + this._progress.width + 20;
                chargeBtn.y = this._progress.y + this._progress.height / 2 - chargeBtn.height / 2;
                chargeBtn.name = "chargeBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
            }
        }
    };
    AcCarnivalChargeScrollItem.prototype.refreshUI = function () {
        if (this.getChildByName("collectBtn")) {
            this.getChildByName("collectBtn").visible = false;
        }
        /**
         * 展示已领取
         */
        this.createCollectFlag();
        this._collectFlag.visible = false;
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
    };
    AcCarnivalChargeScrollItem.prototype.createCollectFlag = function () {
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        this._collectFlag.setScale(0.7);
        this._collectFlag.x = this._progress.x + this._progress.width + 100;
        this._collectFlag.y = this._progress.y + this._progress.height / 2 - 10;
        this.addChild(this._collectFlag);
    };
    AcCarnivalChargeScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE), this.eventCollectHandlerCallBack, this);
        var rData = event.data.data.data;
        var ret = event.data.data.ret;
        if (ret != 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if (AcCarnivalChargeScrollItem._lastReqIdx != this._curIdx) {
            return;
        }
        AcCarnivalChargeScrollItem._lastReqIdx = null;
        this.refreshUI();
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        // let pos = this._progress.localToGlobal(this._progress.width + 50,20);
        var pos = AcCarnivalChargeScrollItem._lastPos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcCarnivalChargeScrollItem.prototype.eventCollectHandler = function (event) {
        AcCarnivalChargeScrollItem._lastReqIdx = this._curIdx;
        AcCarnivalChargeScrollItem._lastPos = this._progress.localToGlobal(this._progress.width + 50, 20);
        var totalVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCharge");
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE), this.eventCollectHandlerCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE, { activeId: "carnivalCharge-" + totalVo.code, rkey: this._itemData });
    };
    AcCarnivalChargeScrollItem.prototype.goRechargeHandler = function (event) {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcCarnivalChargeScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcCarnivalChargeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCarnivalChargeScrollItem.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE),this.eventCollectHandlerCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_CHARGE, this.refreshBtnStatus, this);
        // App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshBtnStatus,this);
        this._itemData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._curIdx = 0;
        this._rechargeItem = null;
        //AcCarnivalChargeScrollItem._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    AcCarnivalChargeScrollItem._lastReqIdx = null;
    AcCarnivalChargeScrollItem._lastPos = null;
    return AcCarnivalChargeScrollItem;
}(ScrollListItem));
__reflect(AcCarnivalChargeScrollItem.prototype, "AcCarnivalChargeScrollItem");
