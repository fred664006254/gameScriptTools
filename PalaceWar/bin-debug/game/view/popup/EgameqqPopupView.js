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
var EgameqqPopupView = (function (_super) {
    __extends(EgameqqPopupView, _super);
    function EgameqqPopupView() {
        var _this = _super.call(this) || this;
        _this._rewardBtn = null;
        return _this;
    }
    EgameqqPopupView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("egameqqpopupview_bg");
        this.viewBg.height = 774;
        this.viewBg.width = 620;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    EgameqqPopupView.prototype.initView = function () {
        this._rewardBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "wanbaegameqq_reward", this.rewardHandle, this);
        this._rewardBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._rewardBtn.width / 2, 220);
        this.addChildToContainer(this._rewardBtn);
        if (Api.otherInfoVoApi.checkWanbaEGameHasReward()) {
            this._rewardBtn.setEnable(false);
            this._rewardBtn.setText("candyGetAlready");
        }
        var lookBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "wanbaegameqq_look", this.lookHandle, this);
        lookBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - lookBtn.width / 2, 618);
        this.addChildToContainer(lookBtn);
        var rewardList = GameData.formatRewardItem(Config.GameprojectCfg.rewardWB7);
        if (rewardList) {
            for (var index = 0; index < rewardList.length; index++) {
                var iconItem = GameData.getItemIcon(rewardList[index], true);
                iconItem.setScale(0.9);
                var posX = this.viewBg.x + this.viewBg.width / 2 - rewardList.length * 55 + 10 + index * 110;
                iconItem.setPosition(posX, 94);
                this.addChildToContainer(iconItem);
            }
        }
    };
    EgameqqPopupView.prototype.rewardHandle = function () {
        this.request(NetRequestConst.REQUEST_OTHERINFO_GETQQESREWARD, {});
    };
    EgameqqPopupView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETQQESREWARD) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
                this._rewardBtn.setEnable(false);
                this._rewardBtn.setText("candyGetAlready");
            }
        }
    };
    EgameqqPopupView.prototype.lookHandle = function () {
        // RSDKHelper.openUrl("https://m.egame.qq.com/download/app?adtag=lmxldy",null,null);
        RSDKHelper.openUrl("http%253a%252f%252fm.egame.qq.com%252fdownload%252fapp%253fchannel%253dh5ldy2%2526type%253dact%2526url%253dqgameapi%253a%252f%252fbrowser%253furl%253dhttp%253a%252f%252fcdn.egame.qq.com%252fgame-weex%252fpage%252fdetailV2.html%253fappid%253d101477809%2526_pggwv%253d8%2526_wv%253d1%2526v%253d20180730%2526ADTAG%253dkjldy%2526weex%253dhttp%253a%252f%252fcdn.egame.qq.com%252fgame-weex%252fweex%252fdetailV2%252fapp.js%253fappid%253d101477809%2526_pggwv%253d8%2526_wv%253d1%2526v%253d20180730%2526ADTAG%253dkjldy", null, null);
    };
    EgameqqPopupView.prototype.getTitleStr = function () {
        return null;
    };
    EgameqqPopupView.prototype.dispose = function () {
        this._rewardBtn = null;
        _super.prototype.dispose.call(this);
    };
    return EgameqqPopupView;
}(PopupView));
__reflect(EgameqqPopupView.prototype, "EgameqqPopupView");
//# sourceMappingURL=EgameqqPopupView.js.map