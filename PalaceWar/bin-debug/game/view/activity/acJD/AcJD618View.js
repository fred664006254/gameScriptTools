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
 * 京东618活动
 * author yanyuling
 * date 2018/05/25
 * @class AcJD618View
 */
var AcJD618View = (function (_super) {
    __extends(AcJD618View, _super);
    function AcJD618View() {
        return _super.call(this) || this;
    }
    AcJD618View.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_JD618_GETREWARD), this.collect618RewardCallBack, this);
        var acImg = BaseBitmap.create("jd_activityimg");
        acImg.x = GameConfig.stageWidth / 2 - acImg.width / 2;
        acImg.y = GameConfig.stageHeigth / 2 - acImg.height / 2;
        this.addChild(acImg);
        var collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "collect618BtnTxt", this.collect618Reward, this);
        collectBtn.x = GameConfig.stageWidth / 2 - collectBtn.width / 2;
        collectBtn.y = acImg.y + acImg.height - collectBtn.height - 10;
        this.addChild(collectBtn);
    };
    AcJD618View.prototype.collect618Reward = function () {
        if (Api.otherInfoVoApi.isJD618RewardEnable()) {
            NetManager.request(NetRequestConst.REQUEST_JD618_GETREWARD, {});
        }
    };
    AcJD618View.prototype.collect618RewardCallBack = function (event) {
        var ret = event.data.data.ret;
        if (ret == 0) {
            var rewardStr = event.data.data.data.rewards;
            var rList = GameData.formatRewardItem(rewardStr);
            App.CommonUtil.playRewardFlyAction(rList);
        }
        this.hide();
    };
    AcJD618View.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "jd_activityimg",
        ]);
    };
    AcJD618View.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_JD618_GETREWARD), this.collect618RewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcJD618View;
}(BaseView));
__reflect(AcJD618View.prototype, "AcJD618View");
//# sourceMappingURL=AcJD618View.js.map