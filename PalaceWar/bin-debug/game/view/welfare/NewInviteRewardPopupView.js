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
var NewInviteRewardPopupView = (function (_super) {
    __extends(NewInviteRewardPopupView, _super);
    function NewInviteRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(NewInviteRewardPopupView.prototype, "api", {
        get: function () {
            return Api.newinviteVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewInviteRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.Invitefriend2Cfg;
        },
        enumerable: true,
        configurable: true
    });
    NewInviteRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress21_bg", "progress21", "public_popupscrollitembg"
        ]);
    };
    NewInviteRewardPopupView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    NewInviteRewardPopupView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    NewInviteRewardPopupView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWINVITE_GETPOWERREWARD, view.rewardCallback, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWINVITE_GETINVITEREWARD, view.rewardCallback, view);
        var isinviteTask = view.param.data.isinviteTask;
        var taskarr = view.updateArr(view.cfg.inviteTask);
        var powerTaskarr = view.updateArr2(view.cfg.powerTask);
        //排名列表
        var obj = isinviteTask ? taskarr : powerTaskarr;
        var list = ComponentManager.getScrollList(NewInviteRewardItem, obj, new egret.Rectangle(0, 0, 515, 616));
        view.addChildToContainer(list);
        view._list = list;
        list.setPosition(57, 10);
        // view.update();
    };
    NewInviteRewardPopupView.prototype.updateArr = function (arr) {
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
                if (rechareTotal >= arr[i].value) {
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
    NewInviteRewardPopupView.prototype.updateArr2 = function (arr) {
        var view = this;
        var vo = view.api;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var rechareTotal = vo.getInvitePowerNum(arr[i].needPower);
            if (vo.isGetInvitePowerTask(arr[i].id)) {
                arr1.push({
                    data: arr[i],
                    type: "power"
                });
            }
            else {
                if (rechareTotal >= arr[i].value) {
                    arr2.push({
                        data: arr[i],
                        type: "power"
                    });
                }
                else {
                    arr3.push({
                        data: arr[i],
                        type: "power"
                    });
                }
            }
        }
        arr1.sort(function (a, b) {
            return b.id - a.id;
        });
        return arr2.concat(arr3).concat(arr1);
    };
    NewInviteRewardPopupView.prototype.rewardCallback = function (evt) {
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
    NewInviteRewardPopupView.prototype.update = function () {
        var view = this;
        var taskarr = view.updateArr(view.cfg.inviteTask);
        var powerTaskarr = view.updateArr2(view.cfg.powerTask);
        var isinviteTask = view.param.data.isinviteTask;
        //排名列表
        var obj = isinviteTask ? taskarr : powerTaskarr;
        view._list.refreshData(obj, true);
    };
    NewInviteRewardPopupView.prototype.getTitleStr = function () {
        return "acNewYearPopupViewTitle";
    };
    NewInviteRewardPopupView.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWINVITE_GETINVITEREWARD, view.rewardCallback, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWINVITE_GETPOWERREWARD, view.rewardCallback, view);
        _super.prototype.dispose.call(this);
    };
    return NewInviteRewardPopupView;
}(PopupView));
__reflect(NewInviteRewardPopupView.prototype, "NewInviteRewardPopupView");
//# sourceMappingURL=NewInviteRewardPopupView.js.map