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
 * 锦鲤活动奖励
 * @author 张朝阳
 * date 2019/2/13
 * @class AcLuckyCarpRewardPopupView
 */
var AcLuckyCarpRewardPopupView = (function (_super) {
    __extends(AcLuckyCarpRewardPopupView, _super);
    function AcLuckyCarpRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._receiveBtn = null;
        _this._collectFlag = null;
        return _this;
    }
    AcLuckyCarpRewardPopupView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD, this.rewardHandle, this);
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var rewards = cfg.rechargeReward.getReward;
        var rewardVo = GameData.formatRewardItem(rewards);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 525;
        bg.height = Math.round(rewardVo.length / 4) * 130 + 55;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var rewardbg = BaseBitmap.create("public_9_probiginnerbg");
        rewardbg.width = 510;
        rewardbg.height = Math.round(rewardVo.length / 4) * 130;
        rewardbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardbg.width / 2, bg.y + bg.height / 2 - rewardbg.height / 2);
        this.addChildToContainer(rewardbg);
        for (var i = 0; i < rewardVo.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVo[i], true, true);
            rewardDB.setPosition(rewardbg.x + 16 + ((rewardDB.width + 16) * (i % 4)), rewardbg.y + 13 + ((rewardDB.height + 18) * Math.floor(i / 4)));
            this.addChildToContainer(rewardDB);
        }
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "taskCollect", function () {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.param.data.aid, _this.param.data.code);
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(_this.param.data.aid, _this.param.data.code);
            if (vo.getChargeNum() < cfg.rechargeReward.needGem) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acLuckyCarpRewardPopupViewTip-" + code));
            }
            else {
                _this.request(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD, { activeId: vo.aidAndCode });
            }
        }, this);
        this._receiveBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._receiveBtn.width / 2, bg.y + bg.height + 25);
        this.addChildToContainer(this._receiveBtn);
        // this.request(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD, { activeId: vo.aidAndCode })
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        this._collectFlag.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2, this._receiveBtn.y + this._receiveBtn.height / 2);
        this._collectFlag.setScale(0.8);
        this.addChildToContainer(this._collectFlag);
        this.refreshView();
    };
    AcLuckyCarpRewardPopupView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        if (vo.getChargeNum() < cfg.rechargeReward.needGem) {
            this._receiveBtn.setVisible(true);
            this._collectFlag.setVisible(false);
            this._receiveBtn.setGray(true);
        }
        else {
            if (vo.isReceive()) {
                this._receiveBtn.setVisible(false);
                this._collectFlag.setVisible(true);
            }
            else {
                this._receiveBtn.setVisible(true);
                this._collectFlag.setVisible(false);
                this._receiveBtn.setGray(false);
            }
        }
    };
    /**领取奖励返回 */
    AcLuckyCarpRewardPopupView.prototype.rewardHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardsVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVo);
            this.receiveEffect();
        }
    };
    AcLuckyCarpRewardPopupView.prototype.receiveEffect = function () {
        this._collectFlag.setScale(2);
        this._receiveBtn.setVisible(false);
        this._collectFlag.setVisible(true);
        egret.Tween.get(this._collectFlag).to({ scaleX: 0.8, scaleY: 0.8 }, 300);
    };
    AcLuckyCarpRewardPopupView.prototype.getTitleStr = function () {
        return "acLuckyCarpRewardPopupViewTitle-" + this.param.data.code;
    };
    AcLuckyCarpRewardPopupView.prototype.getShowHeight = function () {
        return 400;
    };
    AcLuckyCarpRewardPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD, this.rewardHandle, this);
        this._collectFlag = null;
        this._receiveBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyCarpRewardPopupView;
}(PopupView));
__reflect(AcLuckyCarpRewardPopupView.prototype, "AcLuckyCarpRewardPopupView");
//# sourceMappingURL=AcLuckyCarpRewardPopupView.js.map