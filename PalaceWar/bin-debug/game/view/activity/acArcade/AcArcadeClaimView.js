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
 * 	电玩大本营任务
 * author 张朝阳
 * date 2019/6/12
 * @class AcArcadeTaskView
 */
var AcArcadeClaimView = (function (_super) {
    __extends(AcArcadeClaimView, _super);
    function AcArcadeClaimView() {
        var _this = _super.call(this) || this;
        _this.code = null;
        _this.aid = null;
        _this._scrollList = null;
        _this._myScoreTF = null;
        return _this;
    }
    AcArcadeClaimView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADESHOPBUY, this.christmasTaskRewardHandel, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var bg = BaseBitmap.create("public_9_bg22");
        bg.width = 640;
        bg.height = GameConfig.stageHeigth - 89;
        bg.setPosition(0, -15);
        this.addChildToContainer(bg);
        var bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 612;
        bg2.height = bg.height - 30 - 40;
        bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg.y + 15);
        this.addChildToContainer(bg2);
        // let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = cfg.claimListItemCfg;
        // taskData.sort((a, b) => { return a.sortId - b.sortId });
        var rect = new egret.Rectangle(0, 0, 608, bg2.height - 10);
        this._scrollList = ComponentManager.getScrollList(AcArcadeClaimScrollItem, taskData, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg2.x + bg2.width / 2 - this._scrollList.width / 2, bg2.y + 5);
        this.addChildToContainer(this._scrollList);
        var myScore = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeClaimViewMyScore-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        myScore.setPosition(bg.x + 30, bg2.y + bg2.height + 20 - myScore.height / 2);
        this.addChildToContainer(myScore);
        var moonCoin = BaseBitmap.create("acarcadeview_mooncoin-" + this.getUiCode());
        moonCoin.setPosition(myScore.x + myScore.width, myScore.y + myScore.height / 2 - moonCoin.height / 2);
        this.addChildToContainer(moonCoin);
        this._myScoreTF = ComponentManager.getTextField("X" + vo.getScore(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._myScoreTF.setPosition(moonCoin.x + moonCoin.width, moonCoin.y + moonCoin.height / 2 - this._myScoreTF.height / 2);
        this.addChildToContainer(this._myScoreTF);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeClaimViewTipDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        tip.setPosition(bg.x + bg.width - tip.width - 30, myScore.y + myScore.height / 2 - tip.height / 2);
        this.addChildToContainer(tip);
    };
    /**
     * 领奖回调
     */
    AcArcadeClaimView.prototype.christmasTaskRewardHandel = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardsVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVo);
        }
    };
    AcArcadeClaimView.prototype.refreashView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.claimListItemCfg;
        this._scrollList.refreshData(taskData, { aid: this.aid, code: this.code });
        this._myScoreTF.text = "X" + vo.getScore();
    };
    AcArcadeClaimView.prototype.getTitleStr = function () {
        return "acArcadeClaimViewTitle-" + this.param.data.code;
    };
    AcArcadeClaimView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acarcadeview_mooncoin-" + this.param.data.code
        ]);
    };
    AcArcadeClaimView.prototype.getUiCode = function () {
        if (this.param.data.code == "2") {
            return "1";
        }
        return this.param.data.code;
    };
    AcArcadeClaimView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADESHOPBUY, this.christmasTaskRewardHandel, this);
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcadeClaimView;
}(CommonView));
__reflect(AcArcadeClaimView.prototype, "AcArcadeClaimView");
//# sourceMappingURL=AcArcadeClaimView.js.map