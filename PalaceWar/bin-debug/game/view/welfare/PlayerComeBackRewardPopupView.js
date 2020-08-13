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
 *新邀请好友奖励预览
 * author qianjun
 */
var PlayerComeBackRewardPopupView = (function (_super) {
    __extends(PlayerComeBackRewardPopupView, _super);
    function PlayerComeBackRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(PlayerComeBackRewardPopupView.prototype, "api", {
        get: function () {
            return Api.newrebackVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerComeBackRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.PlayercomebackCfg;
        },
        enumerable: true,
        configurable: true
    });
    PlayerComeBackRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress21_bg", "progress21", "public_popupscrollitembg"
        ]);
    };
    PlayerComeBackRewardPopupView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    PlayerComeBackRewardPopupView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    PlayerComeBackRewardPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    PlayerComeBackRewardPopupView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD, view.rewardCallback, view);
        var isinviteTask = view.param.data.isinviteTask;
        var taskarr = view.updateArr(view.cfg.comeReward);
        //排名列表
        var obj = taskarr;
        var list = ComponentManager.getScrollList(PlayerComeBackRewardItem, obj, new egret.Rectangle(0, 0, 515, 616));
        view.addChildToContainer(list);
        view._list = list;
        list.setPosition(57, 10);
        // view.update();
    };
    PlayerComeBackRewardPopupView.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.api;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var rechareTotal = vo.getInviteFriendNum();
        for (var i = 0; i < arr.length; i++) {
            if (vo.isGetInviteFriendTask(arr[i].id)) {
                arr1.push({
                    data: arr[i],
                    type: "invite"
                });
            }
            else {
                if (rechareTotal >= arr[i].needGem) {
                    arr2.push({
                        data: arr[i],
                        type: "invite"
                    });
                }
                else {
                    arr3.push({
                        data: arr[i],
                        type: "invite"
                    });
                }
            }
        }
        arr1.sort(function (a, b) {
            return b.id - a.id;
        });
        return arr2.concat(arr3).concat(arr1);
    };
    PlayerComeBackRewardPopupView.prototype.rewardCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var rData = evt.data.data.data;
            var rewards = rData.rewards;
            var rewardList = GameData.formatRewardItem(rewards);
            var pos = view.api.lastpos;
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
            view.update();
        }
    };
    PlayerComeBackRewardPopupView.prototype.update = function () {
        var view = this;
        var taskarr = view.updateArr(view.cfg.comeReward);
        var isinviteTask = view.param.data.isinviteTask;
        //排名列表
        var obj = taskarr;
        view._list.refreshData(obj, true);
    };
    PlayerComeBackRewardPopupView.prototype.getTitleStr = function () {
        return "acNewYearPopupViewTitle";
    };
    PlayerComeBackRewardPopupView.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD, view.rewardCallback, view);
        _super.prototype.dispose.call(this);
    };
    return PlayerComeBackRewardPopupView;
}(PopupView));
__reflect(PlayerComeBackRewardPopupView.prototype, "PlayerComeBackRewardPopupView");
//# sourceMappingURL=PlayerComeBackRewardPopupView.js.map