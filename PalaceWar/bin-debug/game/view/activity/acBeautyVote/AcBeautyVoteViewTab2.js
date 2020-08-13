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
  * 花魁活动view--充值奖励
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteViewTab2
  */
var AcBeautyVoteViewTab2 = (function (_super) {
    __extends(AcBeautyVoteViewTab2, _super);
    function AcBeautyVoteViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        egret.callLater(_this.initView, _this);
        return _this;
    }
    AcBeautyVoteViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETRECHARGERWD, this.rechargeRewardHandle, this);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var bg = BaseBitmap.create("public_9_bg32");
        bg.width = 620;
        bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 34;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, -213 + 15);
        this.addChild(bg); //785 570
        var list = vo.getSortRechargeCfg();
        list.sort(function (a, b) { return a.sortId - b.sortId; });
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 10 - 60);
        this._scrollList = ComponentManager.getScrollList(AcBeautyVoteViewTab2ScrollItem, list, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg.x + 5, bg.y + 5);
        this._scrollList.bounces = false;
        this.addChild(this._scrollList);
        var rechargeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab2TipDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeDesc.setPosition(this._scrollList.x + this._scrollList.width / 2 - rechargeDesc.width / 2, this._scrollList.y + this._scrollList.height + 30 - rechargeDesc.height / 2);
        this.addChild(rechargeDesc);
    };
    AcBeautyVoteViewTab2.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var list = vo.getSortRechargeCfg();
        list.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(list, { aid: this.aid, code: this.code });
    };
    AcBeautyVoteViewTab2.prototype.rechargeRewardHandle = function (event) {
        if (event.data.ret) {
            var specialGift = event.data.data.data.specialGift;
            var rewards = "1008_0_" + specialGift + "_" + this.code + "|" + event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            this.refreshView();
        }
    };
    AcBeautyVoteViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETRECHARGERWD, this.rechargeRewardHandle, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcBeautyVoteViewTab2;
}(AcCommonViewTab));
__reflect(AcBeautyVoteViewTab2.prototype, "AcBeautyVoteViewTab2");
//# sourceMappingURL=AcBeautyVoteViewTab2.js.map