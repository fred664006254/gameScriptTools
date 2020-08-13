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
  * 钱庄
  * @class AcBankBoxView2
  */
var BankBoxPopupView = (function (_super) {
    __extends(BankBoxPopupView, _super);
    function BankBoxPopupView() {
        var _this = _super.call(this) || this;
        _this._rechargeBtn = null;
        _this._receiveBtn = null;
        _this._allReceiveBM = null;
        _this._aid = null;
        _this._code = null;
        _this._boxNeedGem = null;
        _this._desc2 = null;
        return _this;
    }
    BankBoxPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWBANKBOXREWARD, this.getRewardHandler, this);
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._boxNeedGem = this.param.data.boxId;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var boxCfg = cfg.getBoxData(String(this._boxNeedGem));
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 250;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);
        var rewardbg = BaseBitmap.create("public_9_bg44");
        rewardbg.width = 502;
        rewardbg.height = 110;
        rewardbg.setPosition(bg.x + bg.width / 2 - rewardbg.width / 2, bg.y + 10);
        this.addChildToContainer(rewardbg);
        var rewardVoList = GameData.formatRewardItem(boxCfg.getReward);
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(0.8);
            var rewardDBWidth = rewardDB.width - 7;
            var startWidth = (rewardbg.width - rewardDBWidth * rewardVoList.length) / (rewardVoList.length + 1);
            rewardDB.setPosition(rewardbg.x + startWidth + 6 + (i * (rewardDBWidth + startWidth)), rewardbg.y + rewardbg.height / 2 - rewardDB.height / 2 + 10);
            this.addChildToContainer(rewardDB);
        }
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxPopupViewDesc1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        desc1.setPosition(rewardbg.x + rewardbg.width / 2 - desc1.width / 2, rewardbg.y + rewardbg.height + 10);
        this.addChildToContainer(desc1);
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxPopupViewDesc2", ["0"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        desc2.setPosition(desc1.x + desc1.width / 2 - desc2.width / 2, desc1.y + desc1.height + 5);
        this.addChildToContainer(desc2);
        this._desc2 = desc2;
        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, "acRechargeBoxPopupViewGoRecharge", this.rechargeClick, this);
        this._rechargeBtn.setPosition(desc2.x + desc2.width / 2 - this._rechargeBtn.width / 2, desc2.y + desc2.height + 5);
        this.addChildToContainer(this._rechargeBtn);
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acRechargeBoxPopupViewReceive", this.receiveClick, this);
        this._receiveBtn.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._receiveBtn.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._receiveBtn.height / 2);
        this.addChildToContainer(this._receiveBtn);
        this._allReceiveBM = BaseBitmap.create("acrechargeboxview_receive");
        this._allReceiveBM.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._allReceiveBM.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._allReceiveBM.height / 2);
        this.addChildToContainer(this._allReceiveBM);
        this.refreshView();
    };
    /**
     * 刷新界面
     */
    BankBoxPopupView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var boxCfg = cfg.getBoxData(this._boxNeedGem);
        var rechargeNum = vo.getBoxReChargeNum(this._boxNeedGem);
        var receiveNum = vo.getBoxReceiveNum(this._boxNeedGem);
        var numStr = Number(boxCfg.limit) - receiveNum;
        this._desc2.text = LanguageManager.getlocal("acRechargeBoxPopupViewDesc2", [String(numStr)]);
        if (Number(boxCfg.limit) <= receiveNum) {
            this._rechargeBtn.setVisible(false);
            this._receiveBtn.setVisible(false);
            this._allReceiveBM.setVisible(true);
        }
        else {
            if (rechargeNum > receiveNum) {
                this._rechargeBtn.setVisible(false);
                this._receiveBtn.setVisible(true);
                this._allReceiveBM.setVisible(false);
            }
            else {
                this._rechargeBtn.setVisible(true);
                this._receiveBtn.setVisible(false);
                this._allReceiveBM.setVisible(false);
            }
        }
    };
    BankBoxPopupView.prototype.getRewardHandler = function (event) {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var deltaT = vo.et - GameData.serverTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var data = event.data.data.data;
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.rewards, "otherRewards": data.otherrewards, "isPlayAni": true });
        this.refreshView();
    };
    /**
     * 前往充值按钮
     */
    BankBoxPopupView.prototype.rechargeClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var deltaT = vo.et - GameData.serverTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    /**
     * 领取按钮
     */
    BankBoxPopupView.prototype.receiveClick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var boxCfg = cfg.getBoxData(String(this._boxNeedGem));
        var activeId = this._aid + "-" + this._code;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETTWBANKBOXREWARD, { "activeId": activeId, "rechargeId": boxCfg.id });
    };
    BankBoxPopupView.prototype.getTitleStr = function () {
        return "acRechargeBoxPopupViewTitle";
    };
    BankBoxPopupView.prototype.getShowHeight = function () {
        return 340;
    };
    BankBoxPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWBANKBOXREWARD, this.getRewardHandler, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        this._rechargeBtn = null;
        this._receiveBtn = null;
        this._allReceiveBM = null;
        this._aid = null;
        this._code = null;
        this._boxNeedGem = null;
        _super.prototype.dispose.call(this);
    };
    return BankBoxPopupView;
}(PopupView));
__reflect(BankBoxPopupView.prototype, "BankBoxPopupView");
//# sourceMappingURL=BankBoxPopupView.js.map