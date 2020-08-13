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
 * 充值活动，累积充值列表节点
 * author yanyuling
 * date 2017/11/08
 * @class AcTotalRechargeScrollItem
 */
var AcTotalRechargeScrollItem = (function (_super) {
    __extends(AcTotalRechargeScrollItem, _super);
    function AcTotalRechargeScrollItem() {
        var _this = _super.call(this) || this;
        _this._uiData = undefined;
        _this._rechargeItem = null;
        _this._curIdx = 0;
        _this._lastReqIdx = null;
        return _this;
    }
    AcTotalRechargeScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V, this.refreshBtnStatus, this);
        this._uiData = data;
        this._curIdx = index;
        var totalVo = Api.acVoApi.getActivityVoByAidAndCode("totalRecharge");
        var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("totalRecharge", totalVo.code);
        var rechargeItem = cfgObj.getRechargeItemById(data);
        // let tmpVo = <AcTotalRechargeVo>Api.acVoApi.getActivityVoByAidAndCode("totalRecharge","1");
        this._rechargeItem = rechargeItem;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 598;
        bg.height = 158;
        this.addChild(bg);
        var charge_redBg = BaseBitmap.create("activity_charge_red");
        charge_redBg.y = 5;
        if (PlatformManager.checkIsEnLang()) {
            charge_redBg.width = 430;
        }
        this.addChild(charge_redBg);
        var Txt1 = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acTotal_recharge_txt1", [String(rechargeItem.needGem)]);
        Txt1.x = charge_redBg.x + 20;
        Txt1.y = charge_redBg.y + 10;
        this.addChild(Txt1);
        var Txt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        Txt2.text = LanguageManager.getlocal("acrecharge_return");
        Txt2.x = charge_redBg.x + 20;
        Txt2.y = 65;
        this.addChild(Txt2);
        var itemicon1 = BaseLoadBitmap.create("itemicon1");
        itemicon1.setScale(0.45);
        itemicon1.x = 130;
        itemicon1.y = Txt2.y - 12;
        this.addChild(itemicon1);
        var numLb = ComponentManager.getBitmapText(rechargeItem.getGem + "", "recharge_fnt");
        numLb.x = 175;
        numLb.y = Txt2.y + Txt2.height / 2 - numLb.height / 2;
        this.addChild(numLb);
        // getGem
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 386);
        progress.x = 20;
        progress.y = 100;
        this._progress = progress;
        this.addChild(progress);
        this.refreshBtnStatus();
    };
    AcTotalRechargeScrollItem.prototype.refreshBtnStatus = function () {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode("totalRecharge");
        if (tmpVo == null || tmpVo.v == null) {
            return;
        }
        this._progress.setText(LanguageManager.getlocal("acrecharge_yuan", [String(tmpVo.v), this._rechargeItem.needGem]));
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
        if (tmpVo.flags[this._uiData]) {
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
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "ac_recharge_Btntxt1", this.goRechargeHandler, this);
                chargeBtn.x = this._progress.x + this._progress.width + 20;
                chargeBtn.y = this._progress.y + this._progress.height / 2 - chargeBtn.height / 2;
                chargeBtn.name = "chargeBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
            }
        }
    };
    AcTotalRechargeScrollItem.prototype.refreshUI = function () {
        if (this.getChildByName("collectBtn")) {
            this.getChildByName("collectBtn").visible = false;
        }
        if (this._collectFlag)
            this.removeChild(this._collectFlag);
        this._collectFlag = null;
        /**
         * 展示已领取
         */
        this.createCollectFlag();
        this._collectFlag.visible = false;
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
    };
    AcTotalRechargeScrollItem.prototype.createCollectFlag = function () {
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        this._collectFlag.setScale(0.7);
        this._collectFlag.x = this._progress.x + this._progress.width + 100;
        this._collectFlag.y = this._progress.y + this._progress.height / 2 - 10;
        this.addChild(this._collectFlag);
    };
    AcTotalRechargeScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        this.removeUIListener();
        if (!event.data.ret) {
            return;
        }
        var rData = event.data.data.data;
        var ret = event.data.data.ret;
        if (ret != 0 || this._lastReqIdx != this._curIdx) {
            return;
        }
        this._lastReqIdx = null;
        this.refreshUI();
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = this._progress.localToGlobal(this._progress.width + 50, 20);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcTotalRechargeScrollItem.prototype.eventCollectHandler = function (event) {
        this.addUIListener();
        this._lastReqIdx = this._curIdx;
        var totalVo = Api.acVoApi.getActivityVoByAidAndCode("totalRecharge");
        NetManager.request(NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD, { activeId: "totalRecharge-" + totalVo.code, rkey: this._uiData });
    };
    AcTotalRechargeScrollItem.prototype.goRechargeHandler = function (event) {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcTotalRechargeScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcTotalRechargeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcTotalRechargeScrollItem.prototype.addUIListener = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD), this.eventCollectHandlerCallBack, this);
    };
    AcTotalRechargeScrollItem.prototype.removeUIListener = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD), this.eventCollectHandlerCallBack, this);
    };
    AcTotalRechargeScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V, this.refreshBtnStatus, this);
        this.removeUIListener();
        this._uiData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._curIdx = 0;
        this._rechargeItem = null;
        this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    return AcTotalRechargeScrollItem;
}(ScrollListItem));
__reflect(AcTotalRechargeScrollItem.prototype, "AcTotalRechargeScrollItem");
//# sourceMappingURL=AcTotalRechargeScrollItem.js.map