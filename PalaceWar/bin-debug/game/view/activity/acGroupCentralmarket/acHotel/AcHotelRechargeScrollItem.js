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
  * 客栈活动充值item
  * author 张朝阳
  * date 2018/12/7
  * @class AcHotelRechargeScrollItem
  */
var AcHotelRechargeScrollItem = (function (_super) {
    __extends(AcHotelRechargeScrollItem, _super);
    function AcHotelRechargeScrollItem() {
        var _this = _super.call(this) || this;
        /**
        * 充值进度条
        */
        _this._progress = null;
        /**
         * 充值奖励数据
         */
        _this._itemData = null;
        _this._aidAndCode = null;
        /**
         * item的bg
         */
        _this._itembg = null;
        _this._receiveBM = null;
        _this._receiveBtn = null;
        _this._rechargeBtn = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcHotelRechargeScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        this.width = 608;
        this._itembg = BaseBitmap.create("public_9_bg14");
        this._itembg.width = this.width;
        this._itembg.height = 210;
        this.addChild(this._itembg);
        var titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
        titleBg.width = 600;
        titleBg.height = 35;
        titleBg.setPosition(this._itembg.x + this._itembg.width / 2 - titleBg.width / 2, this._itembg.y + 5);
        this.addChild(titleBg);
        var titleTFKey = this._aidAndCode.code == "1" ? "acHotelRechargeTitle" : "acHotelRechargeTitle-" + this._aidAndCode.code;
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal(titleTFKey, [String(this._itemData.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var rewardBg = BaseBitmap.create("public_9_managebg");
        // 113 X 420;
        rewardBg.width = 420;
        rewardBg.height = 113;
        rewardBg.setPosition(titleBg.x + 10, titleBg.y + titleBg.height + 5);
        this.addChild(rewardBg);
        var rewardArr = GameData.formatRewardItem(this._itemData.getReward);
        // let scrolNode : BaseDisplayObjectContainer =  new  BaseDisplayObjectContainer();
        var itemHeight;
        for (var i = 0; i < rewardArr.length; i++) {
            var rewardItem = GameData.getItemIcon(rewardArr[i], true);
            rewardItem.anchorOffsetX = rewardItem.width / 2;
            rewardItem.anchorOffsetY = rewardItem.height / 2;
            rewardItem.setScale(0.9);
            rewardItem.setPosition(rewardBg.x + rewardItem.width / 2 + i % 4 * (rewardItem.width - 5), rewardBg.y + rewardItem.height / 2 + (Math.floor((i) / 4)) * rewardItem.height + 3);
            this.addChild(rewardItem);
            itemHeight = rewardItem.height;
        }
        rewardBg.height += (Math.floor(rewardArr.length / 4) - 1) * itemHeight;
        this._itembg.height += (Math.floor(rewardArr.length / 4) - 1) * itemHeight;
        this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 576);
        this._progress.setPosition(this._itembg.x + 10, this._itembg.y + this._itembg.height - this._progress.height - 22);
        this.addChild(this._progress);
        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "acCarnivalToChargeBtnText", this.rechargeHandler, this);
        this._rechargeBtn.setPosition(this._itembg.x + this._itembg.width - this._rechargeBtn.width - 5, this._itembg.y + this._itembg.height / 2 - this._rechargeBtn.height / 2);
        this.addChild(this._rechargeBtn);
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ac_recharge_Btntxt2", this.receiveHandler, this);
        this._receiveBtn.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._receiveBtn.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._receiveBtn.height / 2);
        this.addChild(this._receiveBtn);
        this._receiveBM = BaseBitmap.create("collectflag");
        this._receiveBM.anchorOffsetX = this._receiveBM.width / 2;
        this._receiveBM.anchorOffsetY = this._receiveBM.height / 2;
        this._receiveBM.setScale(0.6);
        this._receiveBM.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2);
        this.addChild(this._receiveBM);
        this.refreshView();
    };
    /**
     * 刷新UI
     */
    AcHotelRechargeScrollItem.prototype.refreshView = function () {
        this.refreshProgress();
        this.refreshBtn();
    };
    /**
     * 刷新进度
     */
    AcHotelRechargeScrollItem.prototype.refreshProgress = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var percentTxt = LanguageManager.getlocal("acCarnivalProgressText", [String(vo.getRechargeValue()), String(this._itemData.needGem)]);
        var percent = vo.getRechargeValue() / this._itemData.needGem;
        this._progress.setText(percentTxt);
        this._progress.setPercentage(percent);
    };
    /**
     * 更新Btn
     */
    AcHotelRechargeScrollItem.prototype.refreshBtn = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        if (vo.isReceiveRecharge(this._itemData.id)) {
            this._receiveBM.setVisible(true);
            this._rechargeBtn.setVisible(false);
            this._receiveBtn.setVisible(false);
        }
        else {
            if (vo.getRechargeValue() < this._itemData.needGem) {
                this._receiveBM.setVisible(false);
                this._rechargeBtn.setVisible(true);
                this._receiveBtn.setVisible(false);
            }
            else {
                this._receiveBM.setVisible(false);
                this._rechargeBtn.setVisible(false);
                this._receiveBtn.setVisible(true);
            }
        }
    };
    /**
     * 打开充值界面
     */
    AcHotelRechargeScrollItem.prototype.rechargeHandler = function (event) {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    /**
     * 领取按钮
     */
    AcHotelRechargeScrollItem.prototype.receiveHandler = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMC, { "activeId": activityId, "rechargeId": this._itemData.id });
    };
    AcHotelRechargeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcHotelRechargeScrollItem.prototype.dispose = function () {
        this._progress = null;
        this._itemData = null;
        // this._id = null;
        this._itembg = null;
        this._receiveBM = null;
        this._receiveBtn = null;
        this._rechargeBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcHotelRechargeScrollItem;
}(ScrollListItem));
__reflect(AcHotelRechargeScrollItem.prototype, "AcHotelRechargeScrollItem");
//# sourceMappingURL=AcHotelRechargeScrollItem.js.map