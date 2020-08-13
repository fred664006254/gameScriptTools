/**
  * 勤王除恶宝箱奖励
  * @author 张朝阳
  * date 2019/4/15
  * @class AllianceWeekEndReportView
  */
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
var AllianceWeekEndRewardInfoPopupView = (function (_super) {
    __extends(AllianceWeekEndRewardInfoPopupView, _super);
    function AllianceWeekEndRewardInfoPopupView() {
        var _this = _super.call(this) || this;
        _this._receiveBtn = null;
        _this._receiveBM = null;
        return _this;
    }
    AllianceWeekEndRewardInfoPopupView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, this.scoreHandle, this);
        var cfg = this.param.data.itemCfg;
        //public_9_probiginnerbg
        // let lockTF = ComponentManager.getTextField(LanguageManager.getlocal("ac" + aid + "lockTitle",[cfg.needNum]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        // lockTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - lockTF.width / 2 ,15)
        // this.addChildToContainer(lockTF);
        var rewardBg = BaseBitmap.create("public_9_probiginnerbg");
        rewardBg.width = 526;
        rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(rewardBg);
        var rewardsVoList = GameData.formatRewardItem(cfg.getReward);
        var rewardScale = 0.85;
        var itemHeight = 0;
        for (var i = 0; i < rewardsVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardsVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(rewardBg.x + (i % 5) * (rewardDB.width * rewardScale + 11) + 10, rewardBg.y + Math.floor(i / 5) * (rewardDB.height * rewardScale + 10) + 17);
            this.addChildToContainer(rewardDB);
            itemHeight = rewardDB.height * rewardScale;
        }
        var offsetHeight = rewardsVoList.length % 5 == 0 ? rewardsVoList.length / 5 * itemHeight : (Math.floor(rewardsVoList.length / 5) + 1) * itemHeight;
        rewardBg.height += offsetHeight;
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", function () {
            if (!Api.allianceWeekVoApi.checkActivityStart()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewAcTimeEndTip"));
                return;
            }
            _this.request(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, { rkey: cfg.id });
        }, this);
        this._receiveBtn.setPosition(rewardBg.x + rewardBg.width / 2 - this._receiveBtn.width / 2, rewardBg.y + rewardBg.height + 10);
        this.addChildToContainer(this._receiveBtn);
        var receiveBMScale = 0.75;
        this._receiveBM = BaseBitmap.create("collectflag");
        this._receiveBM.setScale(receiveBMScale);
        this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width * receiveBMScale / 2, rewardBg.y + rewardBg.height + 3);
        this.addChildToContainer(this._receiveBM);
        this.refreshView();
    };
    AllianceWeekEndRewardInfoPopupView.prototype.refreshView = function () {
        var cfg = this.param.data.itemCfg;
        if (Api.myAllianceWeekVoApi.getScore() >= cfg.score) {
            if (Api.myAllianceWeekVoApi.checkBoxReceive(cfg.id)) {
                this._receiveBtn.setVisible(false);
                this._receiveBM.setVisible(true);
            }
            else {
                this._receiveBtn.setVisible(true);
                this._receiveBtn.setEnable(true);
                this._receiveBM.setVisible(false);
            }
        }
        else {
            this._receiveBtn.setVisible(true);
            this._receiveBtn.setEnable(false);
            this._receiveBM.setVisible(false);
        }
    };
    AllianceWeekEndRewardInfoPopupView.prototype.scoreHandle = function (event) {
        if (event.data.ret) {
            var reward = GameData.formatRewardItem(event.data.data.data.rewards);
            App.CommonUtil.playRewardFlyAction(reward);
            this.refreshView();
            var replacerewards = event.data.data.data.replacerewards;
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    };
    AllianceWeekEndRewardInfoPopupView.prototype.getShowHeight = function () {
        return 315;
    };
    AllianceWeekEndRewardInfoPopupView.prototype.getTitleStr = function () {
        return "allianceWeekEndRewardInfoPopupViewTitle";
    };
    AllianceWeekEndRewardInfoPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, this.scoreHandle, this);
        this._receiveBtn = null;
        this._receiveBM = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndRewardInfoPopupView;
}(PopupView));
__reflect(AllianceWeekEndRewardInfoPopupView.prototype, "AllianceWeekEndRewardInfoPopupView");
//# sourceMappingURL=AllianceWeekEndRewardInfoPopupView.js.map