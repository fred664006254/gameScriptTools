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
 * 进度奖励
 * author yangchengguo
 * date 2019.12.12
 * @class EmperorOutAchievePopupView
 */
var EmperorOutAchievePopupView = (function (_super) {
    __extends(EmperorOutAchievePopupView, _super);
    function EmperorOutAchievePopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._isAuthor = false;
        return _this;
    }
    EmperorOutAchievePopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETPOPULARRWD, this.freshList, this);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 670;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var data = Config.EmperoroutingCfg.getAchievement1CfgList();
        var playerId = Api.playerVoApi.getPlayerID();
        if (playerId == this.param.data.uid) {
            data = Config.EmperoroutingCfg.getAchievement2CfgList();
            this._isAuthor = true;
        }
        var processCfg = Api.emperorAchieveVoApi.getSortOutAchieveCfg(this.param.data.uid, data);
        var currId = null;
        if (this.param && this.param.data && this.param.data.id) {
            currId = this.param.data.id;
        }
        App.LogUtil.log("currId: " + this.param.data.uid);
        var rect = new egret.Rectangle(0, 0, 520, 660);
        this._scrollList = ComponentManager.getScrollList(EmperorOutAchieveScrollItem, processCfg, rect, { id: currId, uid: this.param.data.uid, isAuthor: this._isAuthor });
        this._scrollList.setPosition(bg.x + 3, bg.y + 5);
        // this._scrollList.bounces = false;
        this.addChildToContainer(this._scrollList);
        if (currId) {
            for (var i = 0; i < processCfg.length; i++) {
                if (processCfg[i].id == currId) {
                    this._scrollList.setScrollTopByIndex(i, 800);
                    break;
                }
            }
        }
    };
    EmperorOutAchievePopupView.prototype.freshList = function (evt) {
        if (evt && evt.data && evt.data.ret) {
            var rData = evt.data.data.data;
            var rewardVo = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            if (this._scrollList) {
                var data = Config.EmperoroutingCfg.getAchievement1CfgList();
                if (this._isAuthor) {
                    data = Config.EmperoroutingCfg.getAchievement2CfgList();
                }
                var processCfg = Api.emperorAchieveVoApi.getSortOutAchieveCfg(this.param.data.uid, data);
                this._scrollList.refreshData(processCfg, { id: null, uid: this.param.data.uid, isAuthor: this._isAuthor });
            }
        }
    };
    EmperorOutAchievePopupView.prototype.getTitleStr = function () {
        return "emperorOutAchieveTitle";
    };
    EmperorOutAchievePopupView.prototype.getShowHeight = function () {
        return 760;
    };
    EmperorOutAchievePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress3_bg", "progress3", "countrywarrewardview_itembg"
        ]);
    };
    EmperorOutAchievePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETPOPULARRWD, this.freshList, this);
        this._scrollList = null;
        this._isAuthor = false;
        _super.prototype.dispose.call(this);
    };
    return EmperorOutAchievePopupView;
}(PopupView));
__reflect(EmperorOutAchievePopupView.prototype, "EmperorOutAchievePopupView");
//# sourceMappingURL=EmperorOutAchievePopupView.js.map