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
  * 黄忠活动充值奖励item
  * author 张朝阳
  * date 2018/6/21
  * @class AcArcherRechargeScrollItem
  */
var AcArcherRechargeScrollItem = (function (_super) {
    __extends(AcArcherRechargeScrollItem, _super);
    function AcArcherRechargeScrollItem() {
        var _this = _super.call(this) || this;
        /**
         * 充值进度条
         */
        _this._progress = null;
        /**
         * 充值奖励数据
         */
        _this._rewardData = null;
        /**
         * 当前的index
         */
        _this._id = null;
        /**
         * item的bg
         */
        _this._itembg = null;
        /**
         * 是否是这个档位
         */
        _this._isNowRecharge = false;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcArcherRechargeScrollItem.prototype, "vo", {
        /**
         * 服务器返回数据
         */
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACARCHER, this._code);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化item
     */
    AcArcherRechargeScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._code = itemParam.code;
        this._rewardData = data;
        this._id = index + 1;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMB), this.rechargeRewardHandler, this);
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.updateView, this);
        this._itembg = BaseBitmap.create("public_9_bg14");
        this._itembg.width = 498;
        this._itembg.height = 216;
        this.addChild(this._itembg);
        var detailBg = BaseBitmap.create("accarnivalview_tab_red");
        detailBg.setPosition(this._itembg.x, this._itembg.y + 5);
        this.addChild(detailBg);
        var detailTF = ComponentManager.getTextField(LanguageManager.getlocal("acMayDayTotal_recharge", [this._rewardData.needGem]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        detailTF.setPosition(detailBg.x + 10, detailBg.y + detailBg.height / 2 - detailTF.height / 2);
        this.addChild(detailTF);
        var rewardArr = GameData.formatRewardItem(this._rewardData.getReward);
        var itemHeigth;
        for (var i = 0; i < rewardArr.length; i++) {
            var rewardItem = GameData.getItemIcon(rewardArr[i], true, true);
            rewardItem.setScale(0.83);
            rewardItem.setPosition(detailTF.x + i % 5 * (rewardItem.width - 12), detailBg.y + detailBg.height + Math.floor(i / 5) * (rewardItem.height - 10) + 10);
            this.addChild(rewardItem);
            //记录item的高度
            itemHeigth = rewardItem.height;
        }
        this._itembg.height += Math.floor(rewardArr.length / 5) * itemHeigth + 20;
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 320);
        this._progress.setPosition(detailTF.x, this._itembg.y + this._itembg.height - this._progress.height - 22);
        this.addChild(this._progress);
        this.updateView();
    };
    /**
     * 更新UI
     */
    AcArcherRechargeScrollItem.prototype.updateView = function () {
        this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText", [String(this.vo.getChargeNum()), this._rewardData.needGem]));
        var percent = this.vo.getChargeNum() / this._rewardData.needGem;
        this._progress.setPercentage(percent);
        if (this.vo.isReceive(this._id)) {
            var receiveBM = void 0;
            receiveBM = this.getChildByName("receiveBM");
            if (receiveBM == null) {
                receiveBM = BaseBitmap.create("collectflag");
            }
            receiveBM.anchorOffsetX = receiveBM.width / 2;
            receiveBM.anchorOffsetY = receiveBM.height / 2;
            var numScale = 0.6;
            receiveBM.setScale(numScale);
            receiveBM.setPosition(this._itembg.x + this._itembg.width - receiveBM.width / 2 * numScale - 15, this._itembg.y + this._itembg.height - receiveBM.height / 2 * numScale - 10);
            this.addChild(receiveBM);
            receiveBM.name = "receiveBM";
            if (this.getChildByName("rechargeBtn") != null) {
                this.removeChild(this.getChildByName("rechargeBtn"));
            }
            if (this.getChildByName("receiveBtn") != null) {
                this.removeChild(this.getChildByName("receiveBtn"));
                receiveBM.setScale(1.2);
                egret.Tween.get(receiveBM).to({ scaleX: numScale, scaleY: numScale }, 300);
            }
        }
        else {
            if (this.vo.getChargeNum() < this._rewardData.needGem) {
                var rechargeBtn = void 0;
                rechargeBtn = this.getChildByName("rechargeBtn");
                if (rechargeBtn == null) {
                    rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acCarnivalToChargeBtnText", this.rechargeHandler, this);
                }
                rechargeBtn.setPosition(this._itembg.x + this._itembg.width - rechargeBtn.width - 15, this._itembg.y + this._itembg.height - rechargeBtn.height - 10);
                rechargeBtn.name = "rechargeBtn";
                this.addChild(rechargeBtn);
                if (this.getChildByName("receiveBM") != null) {
                    this.removeChild(this.getChildByName("receiveBM"));
                }
                if (this.getChildByName("receiveBtn") != null) {
                    this.removeChild(this.getChildByName("receiveBtn"));
                }
            }
            else {
                var receiveBtn = void 0;
                receiveBtn = this.getChildByName("receiveBtn");
                if (receiveBtn == null) {
                    receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "ac_recharge_Btntxt2", this.receiveHandler, this);
                }
                receiveBtn.setPosition(this._itembg.x + this._itembg.width - receiveBtn.width - 15, this._itembg.y + this._itembg.height - receiveBtn.height - 10);
                receiveBtn.name = "receiveBtn";
                this.addChild(receiveBtn);
                if (this.getChildByName("receiveBM") != null) {
                    this.removeChild(this.getChildByName("receiveBM"));
                }
                if (this.getChildByName("rechargeBtn") != null) {
                    this.removeChild(this.getChildByName("rechargeBtn"));
                }
            }
        }
    };
    /**
     * 更新充值奖励进度
     */
    AcArcherRechargeScrollItem.prototype.rechargeRewardHandler = function (event) {
        if (!this._isNowRecharge) {
            return;
        }
        var data = event.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        var rewards = data.rewards;
        var rList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rList);
        this._isNowRecharge = false;
        this.updateView();
    };
    /**
     * 打开充值界面
     */
    AcArcherRechargeScrollItem.prototype.rechargeHandler = function (event) {
        var deltaT = this.vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    /**
     * 领取按钮
     */
    AcArcherRechargeScrollItem.prototype.receiveHandler = function () {
        this._isNowRecharge = true;
        var activeId = AcConst.AID_ACARCHER + "-" + this._code;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMB, { activeId: activeId, rechargeId: this._id });
    };
    AcArcherRechargeScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcArcherRechargeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcArcherRechargeScrollItem.prototype.dispose = function () {
        this._progress = null;
        this._rewardData = null;
        this._id = null;
        this._itembg = null;
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.updateView, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMB), this.rechargeRewardHandler, this);
        _super.prototype.dispose.call(this);
    };
    return AcArcherRechargeScrollItem;
}(ScrollListItem));
__reflect(AcArcherRechargeScrollItem.prototype, "AcArcherRechargeScrollItem");
//# sourceMappingURL=AcArcherRechargeScrollItem.js.map