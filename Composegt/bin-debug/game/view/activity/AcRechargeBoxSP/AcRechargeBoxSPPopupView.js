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
  * 特别宝箱物品展示
  * author  jiangliuyang
  * date 2019/1/7
  * @class AcRechargeBoxSPPopupView
  */
var AcRechargeBoxSPPopupView = (function (_super) {
    __extends(AcRechargeBoxSPPopupView, _super);
    function AcRechargeBoxSPPopupView() {
        var _this = _super.call(this) || this;
        _this._rechargeBtn = null;
        _this._receiveBtn = null;
        _this._allReceiveBM = null;
        _this._aid = null;
        _this._code = null;
        _this._boxNeedGem = null;
        _this._desc2 = null;
        _this._scrollList = null;
        _this._isSingle = true;
        _this._boxCfg = null;
        return _this;
    }
    AcRechargeBoxSPPopupView.prototype.initView = function () {
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._boxNeedGem = this.param.data.boxId;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var boxCfg = cfg.getBoxData(String(this._boxNeedGem));
        this._boxCfg = boxCfg;
        if (boxCfg.childList.length == 1) {
            this._isSingle = true;
            App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshSingleView, this);
            App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, this.getRewardSingleHandler, this);
            //只有一个档位
            this.initSingleView(boxCfg);
        }
        else {
            this._isSingle = false;
            App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshMultiView, this);
            App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, this.getRewardMultiHandler, this);
            //多个档位
            this.initMultiView(boxCfg);
        }
    };
    AcRechargeBoxSPPopupView.prototype.initSingleView = function (boxCfg) {
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
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN); //0x20eb37
        desc1.setPosition(rewardbg.x + rewardbg.width / 2 - desc1.width / 2, rewardbg.y + rewardbg.height + 10);
        this.addChildToContainer(desc1);
        if (this._code == "3") {
            desc1.visible = false;
        }
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc2", ["0"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2.setPosition(desc1.x + desc1.width / 2 - desc2.width / 2, desc1.y + desc1.height + 8);
        this.addChildToContainer(desc2);
        this._desc2 = desc2;
        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRechargeBoxSPPopupViewGoRecharge", this.rechargeClick, this);
        this._rechargeBtn.setPosition(desc2.x + desc2.width / 2 - this._rechargeBtn.width / 2, bg.y + bg.height + 20);
        this.addChildToContainer(this._rechargeBtn);
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acRechargeBoxSPPopupViewReceive", this.receiveClick, this);
        this._receiveBtn.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._receiveBtn.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._receiveBtn.height / 2);
        this.addChildToContainer(this._receiveBtn);
        if (ResourceManager.hasRes("acrechargeboxspview_receive_" + this._code)) {
            this._allReceiveBM = BaseBitmap.create("acrechargeboxspview_receive_" + this._code);
        }
        else {
            this._allReceiveBM = BaseBitmap.create("acrechargeboxspview_receive_1");
        }
        this._allReceiveBM.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._allReceiveBM.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._allReceiveBM.height / 2);
        this.addChildToContainer(this._allReceiveBM);
        this.refreshSingleView();
    };
    AcRechargeBoxSPPopupView.prototype.initMultiView = function (boxCfg) {
        var boxCfgList = boxCfg.childList;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, 705);
        this._scrollList = ComponentManager.getScrollList(AcRechargeBoxSPPopupScrollItem, boxCfgList, rect, { aid: this._aid, code: this._code });
        this._scrollList.x = this.viewBg.width / 2 - this._scrollList.width / 2; //this.container.width/2 - this._scrollList.width/2;
        this._scrollList.y = 10;
        this.addChildToContainer(this._scrollList);
    };
    /**
     * 刷新界面
     */
    AcRechargeBoxSPPopupView.prototype.refreshSingleView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var boxCfg = cfg.getBoxData(this._boxNeedGem);
        var rechargeNum = vo.getBoxReChargeNum(this._boxNeedGem);
        var receiveNum = vo.getBoxReceiveNum(this._boxNeedGem);
        var numStr = Number(boxCfg.limit) - receiveNum;
        this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc2", [String(numStr)]);
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
    AcRechargeBoxSPPopupView.prototype.refreshMultiView = function () {
        var boxCfgList = this._boxCfg.childList;
        this._scrollList.refreshData(boxCfgList, { aid: this._aid, code: this._code });
    };
    AcRechargeBoxSPPopupView.prototype.getRewardSingleHandler = function (event) {
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
        Api.servantVoApi.checkServantChangeRewards(data.cfrewards, data.rewards, data.otherrewards);
        // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards,"otherRewards":data.otherrewards,"isPlayAni":true});
        this.refreshSingleView();
    };
    AcRechargeBoxSPPopupView.prototype.getRewardMultiHandler = function (event) {
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
        Api.servantVoApi.checkServantChangeRewards(data.cfrewards, data.rewards, data.otherrewards);
        // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards,"otherRewards":data.otherrewards,"isPlayAni":true});
        this.refreshMultiView();
    };
    /**
     * 前往充值按钮
     */
    AcRechargeBoxSPPopupView.prototype.rechargeClick = function () {
        if ("" + this._code == "5") {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRechargeBoxSP_rechargetip-code5"));
            return;
        }
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
    AcRechargeBoxSPPopupView.prototype.receiveClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (!vo || !vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var boxCfg = cfg.getBoxData(String(this._boxNeedGem));
        var activeId = this._aid + "-" + this._code;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, { "activeId": activeId, "rechargeId": boxCfg.id });
    };
    AcRechargeBoxSPPopupView.prototype.getTitleStr = function () {
        return "acRechargeBoxSPPopupViewTitle";
    };
    AcRechargeBoxSPPopupView.prototype.getShowHeight = function () {
        if (this._isSingle) {
            return 380;
        }
        else {
            return 800;
        }
    };
    AcRechargeBoxSPPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, this.getRewardSingleHandler, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshSingleView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, this.getRewardMultiHandler, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshMultiView, this);
        this._rechargeBtn = null;
        this._receiveBtn = null;
        this._allReceiveBM = null;
        this._aid = null;
        this._code = null;
        this._boxNeedGem = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxSPPopupView;
}(PopupView));
__reflect(AcRechargeBoxSPPopupView.prototype, "AcRechargeBoxSPPopupView");
