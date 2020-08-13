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
 *新邀请好友邀请玩家列表
 * author qianjun
 */
var PlayerComeBackUserinfoPopupView = (function (_super) {
    __extends(PlayerComeBackUserinfoPopupView, _super);
    function PlayerComeBackUserinfoPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(PlayerComeBackUserinfoPopupView.prototype, "api", {
        get: function () {
            return Api.newrebackVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerComeBackUserinfoPopupView.prototype, "cfg", {
        get: function () {
            return Config.PlayercomebackCfg;
        },
        enumerable: true,
        configurable: true
    });
    PlayerComeBackUserinfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg", "public_popupscrollitembg"
        ]);
    };
    PlayerComeBackUserinfoPopupView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    PlayerComeBackUserinfoPopupView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    PlayerComeBackUserinfoPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
        }
    };
    PlayerComeBackUserinfoPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_REBACK_GETINFO, requestData: {} };
    };
    PlayerComeBackUserinfoPopupView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("playercomebackcodetip8", [view.api.getInviteFriendNum().toString()]), 22, TextFieldConst.COLOR_BLACK);
        view.addChildToContainer(tipTxt);
        tipTxt.setPosition(view.viewBg.x + (view.viewBg.width - tipTxt.width) / 2, 10);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 525;
        bg.height = 620;
        view.addChildToContainer(bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, tipTxt, [0, tipTxt.textHeight + 10]);
        var arr = view.api.getInviteFriendList();
        var list = ComponentManager.getScrollList(PlayerComeBackUserinfoItem, arr, new egret.Rectangle(0, 0, 515, 600));
        view.addChildToContainer(list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, bg, [0, 10]);
        list.setEmptyTip(LanguageManager.getlocal("playercomebackuserinfo4"), TextFieldConst.COLOR_BLACK);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("playercomebackcodetip9"), 22, TextFieldConst.COLOR_BLACK);
        view.addChildToContainer(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, bg, [0, bg.height + 20]);
    };
    PlayerComeBackUserinfoPopupView.prototype.getTitleStr = function () {
        return "playercomebackcodetip7";
    };
    PlayerComeBackUserinfoPopupView.prototype.getShowHeight = function () {
        return 800;
    };
    PlayerComeBackUserinfoPopupView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return PlayerComeBackUserinfoPopupView;
}(PopupView));
__reflect(PlayerComeBackUserinfoPopupView.prototype, "PlayerComeBackUserinfoPopupView");
//# sourceMappingURL=PlayerComeBackUserinfoPopupView.js.map