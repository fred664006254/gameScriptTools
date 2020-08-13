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
 * 狂欢节活动每日消费的列表item
 * author jiangliuyang
 * date 2018/4/11
 * @class AcCarnivalChargeScrollItem
 */
var AcCarnivalCostScrollItem = (function (_super) {
    __extends(AcCarnivalCostScrollItem, _super);
    function AcCarnivalCostScrollItem() {
        var _this = _super.call(this) || this;
        //item数据
        _this._itemData = undefined;
        //序号
        _this._curIdx = 0;
        _this._rechargeItem = null;
        return _this;
    }
    AcCarnivalCostScrollItem.prototype.initItem = function (index, data) {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.eventCollectHandlerCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_COST, this.refreshBtnStatus, this);
        this._itemData = data;
        this._curIdx = index;
        var totalVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCost");
        var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("carnivalCost", totalVo.code);
        this._rechargeItem = cfgObj.getRechargeItemById(this._itemData);
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 598;
        bg.height = 246;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("accarnivalview_tab_red");
        this._detailBgImg.y = 5;
        this._detailBgImg.x = 2;
        this.addChild(this._detailBgImg);
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acCarnivalCostItemTitle", [String(this._rechargeItem.needGem)]);
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
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 386);
        this._progress.x = 20;
        // progress.y = 185;
        this._progress.y = scroStartY;
        this.addChild(this._progress);
        this.refreshBtnStatus();
    };
    //刷新按钮状态
    AcCarnivalCostScrollItem.prototype.refreshBtnStatus = function () {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCost");
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
        //检查是否创建已经领取标签
        if (tmpVo.flags[this._itemData]) {
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
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "acCarnivalToCostBtnText", this.goRechargeHandler, this);
                chargeBtn.x = this._progress.x + this._progress.width + 20;
                chargeBtn.y = this._progress.y + this._progress.height / 2 - chargeBtn.height / 2;
                chargeBtn.name = "costBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
            }
        }
    };
    AcCarnivalCostScrollItem.prototype.refreshUI = function () {
        if (this.getChildByName("collectBtn")) {
            this.getChildByName("collectBtn").visible = false;
        }
        /**
         * 展示已领取
         */
        if (!this._collectFlag) {
            this.createCollectFlag();
        }
        this._collectFlag.visible = false;
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
    };
    AcCarnivalCostScrollItem.prototype.createCollectFlag = function () {
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        this._collectFlag.setScale(0.7);
        this._collectFlag.x = this._progress.x + this._progress.width + 100;
        this._collectFlag.y = this._progress.y + this._progress.height / 2 - 10;
        this.addChild(this._collectFlag);
    };
    AcCarnivalCostScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST), this.eventCollectHandlerCallBack, this);
        var rData = event.data.data.data;
        var ret = event.data.data.ret;
        if (ret != 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if (AcCarnivalCostScrollItem._lastReqIdx != this._curIdx) {
            return;
        }
        AcCarnivalCostScrollItem._lastReqIdx = null;
        this.refreshUI();
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = AcCarnivalCostScrollItem._lastPos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcCarnivalCostScrollItem.prototype.eventCollectHandler = function (event) {
        AcCarnivalCostScrollItem._lastReqIdx = this._curIdx;
        AcCarnivalCostScrollItem._lastPos = this._progress.localToGlobal(this._progress.width + 50, 20);
        var totalVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCost");
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST), this.eventCollectHandlerCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST, { activeId: "carnivalCost-" + totalVo.code, rkey: this._itemData });
    };
    AcCarnivalCostScrollItem.prototype.goRechargeHandler = function (event) {
        ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
    };
    AcCarnivalCostScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcCarnivalCostScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCarnivalCostScrollItem.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.eventCollectHandlerCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_COST, this.refreshBtnStatus, this);
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
    AcCarnivalCostScrollItem._lastReqIdx = null;
    AcCarnivalCostScrollItem._lastPos = null;
    return AcCarnivalCostScrollItem;
}(ScrollListItem));
__reflect(AcCarnivalCostScrollItem.prototype, "AcCarnivalCostScrollItem");
//# sourceMappingURL=AcCarnivalCostScrollItem.js.map