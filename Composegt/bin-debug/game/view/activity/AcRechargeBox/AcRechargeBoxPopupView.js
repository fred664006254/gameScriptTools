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
  * 百服活动-储值宝箱物品展示
  * author  jiangliuyang
  * date 2018/9/26
  * @class AcRechargeBoxPopupView
  */
var AcRechargeBoxPopupView = (function (_super) {
    __extends(AcRechargeBoxPopupView, _super);
    function AcRechargeBoxPopupView() {
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
    AcRechargeBoxPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD, this.getRewardHandler, this);
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._boxNeedGem = this.param.data.boxId;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var boxCfg = cfg.getBoxData(String(this._boxNeedGem));
        //public_9_bg4 。 public_9_bg1	
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 520;
        bg.height = 200;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);
        var rewardbg = BaseBitmap.create("public_tc_bg03");
        rewardbg.width = 502;
        rewardbg.height = 110;
        rewardbg.setPosition(bg.x + bg.width / 2 - rewardbg.width / 2, bg.y + 10);
        this.addChildToContainer(rewardbg);
        var rewardVoList = GameData.formatRewardItem(boxCfg.getReward);
        // let baseWidth = 106 * 0.8 * rewardVoList.length + (rewardVoList.length - 1) * 10;
        // let startX = rewardbg.x + rewardbg.width/2 - baseWidth / 2;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(0.8);
            var rewardDBWidth = rewardDB.width - 7;
            var startWidth = (rewardbg.width - rewardDBWidth * rewardVoList.length - 10) / (rewardVoList.length + 1);
            rewardDB.setPosition(5 + rewardbg.x + startWidth + 6 + (i * (rewardDBWidth + startWidth)), rewardbg.y + rewardbg.height / 2 - rewardDB.height / 2 + 10);
            // rewardDB.x = 0;
            // rewardDB.y = rewardbg.y + rewardbg.height / 2 - rewardDB.height / 2 + 10;
            this.addChildToContainer(rewardDB);
        }
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxPopupViewDesc1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x20eb37);
        desc1.setPosition(rewardbg.x + rewardbg.width / 2 - desc1.width / 2, rewardbg.y + rewardbg.height + 10);
        this.addChildToContainer(desc1);
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxPopupViewDesc2", ["0"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2.setPosition(desc1.x + desc1.width / 2 - desc2.width / 2, desc1.y + desc1.height + 8);
        this.addChildToContainer(desc2);
        this._desc2 = desc2;
        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRechargeBoxPopupViewGoRecharge", this.rechargeClick, this);
        this._rechargeBtn.setPosition(desc2.x + desc2.width / 2 - this._rechargeBtn.width / 2, bg.y + bg.height + 20);
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
    AcRechargeBoxPopupView.prototype.refreshView = function () {
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
    AcRechargeBoxPopupView.prototype.getRewardHandler = function (event) {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var deltaT = vo.et - GameData.serverTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var ret = event.data.data.ret;
        if (ret != 0) {
            return;
        }
        var data = event.data.data.data;
        // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards,"otherRewards":data.otherrewards,"isPlayAni":true});
        // Api.servantVoApi.checkServantChangeRewards(data.otherrewards,data.rewards);
        Api.wifeVoApi.checkWifeChangeRewards(data.cfrewards, data.rewards, data.otherrewards);
        this.refreshView();
    };
    /**
     * 前往充值按钮
     */
    AcRechargeBoxPopupView.prototype.rechargeClick = function () {
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
    AcRechargeBoxPopupView.prototype.receiveClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (!vo || !vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var boxCfg = cfg.getBoxData(String(this._boxNeedGem));
        var activeId = this._aid + "-" + this._code;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD, { "activeId": activeId, "rechargeId": boxCfg.id });
    };
    AcRechargeBoxPopupView.prototype.getTitleStr = function () {
        return "acRechargeBoxPopupViewTitle";
    };
    AcRechargeBoxPopupView.prototype.getShowHeight = function () {
        return 380;
    };
    AcRechargeBoxPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD, this.getRewardHandler, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        this._rechargeBtn = null;
        this._receiveBtn = null;
        this._allReceiveBM = null;
        this._aid = null;
        this._code = null;
        this._boxNeedGem = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxPopupView;
}(PopupView));
__reflect(AcRechargeBoxPopupView.prototype, "AcRechargeBoxPopupView");
