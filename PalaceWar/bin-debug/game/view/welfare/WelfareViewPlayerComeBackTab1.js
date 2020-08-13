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
//召回好友
var WelfareViewPlayerComeBackTab1 = (function (_super) {
    __extends(WelfareViewPlayerComeBackTab1, _super);
    function WelfareViewPlayerComeBackTab1(param) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._inputTextField = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(WelfareViewPlayerComeBackTab1.prototype, "api", {
        get: function () {
            return Api.newrebackVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WelfareViewPlayerComeBackTab1.prototype, "cfg", {
        get: function () {
            return Config.PlayercomebackCfg;
        },
        enumerable: true,
        configurable: true
    });
    WelfareViewPlayerComeBackTab1.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD, view.rewardCallback, view);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK, this.update, this);
        var juzhou = BaseBitmap.create("newinvitelistbg1");
        view.addChild(juzhou);
        juzhou.height = 190;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [5, 0], true);
        var kuang = BaseBitmap.create("newinvitelistbgkuang");
        view.addChild(kuang);
        kuang.width = juzhou.width + 10;
        kuang.height = juzhou.height + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, kuang, juzhou);
        var tipBg = BaseBitmap.create("dailyrechargelistnamebg");
        view.addChild(tipBg);
        tipBg.width = 470;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipBg, juzhou, [15, 7]);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("playercomebackTitle"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, tipBg, [15, 0]);
        var myCode = view.api.getBindCode();
        var inputTxt = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 300, 40, "public_9_bg5", '', TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(inputTxt);
        inputTxt.touchEnabled = false;
        inputTxt.touchChildren = false;
        // view._inputTextField = <BaseTextField>inputTxt.getChildByName("textField");
        // view._inputTextField.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTxt, tipBg, [15, tipBg.height + 25]);
        view._inputTextField = ComponentManager.getTextField(myCode, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(view._inputTextField);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._inputTextField, inputTxt);
        // let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`playercomebackcodetip10`), 20, TextFieldConst.COLOR_BLACK);
        // view.addChild(tipTxt2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom,tipTxt2,juzhou,[0,10]);
        //复制
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "bureaucratGuide_copy", function () {
            if (App.DeviceUtil.IsHtml5()) {
                var str = myCode;
                var input = document.createElement("input");
                input.value = str;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length),
                    document.execCommand('Copy');
                document.body.removeChild(input);
                App.CommonUtil.showTip(LanguageManager.getlocal("playercomebackcodeSuccessdes"));
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rewardBtn, inputTxt, [inputTxt.width + 5, 0]);
        view.addChild(rewardBtn);
        //召回玩家列表
        var state = BaseBitmap.create("qingyuanitemtitlebg");
        view.addChild(state);
        state.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.PLAYERCOMEBACKUSERINFOPOPUPVIEW);
        }, view);
        var txt = ComponentManager.getTextField(LanguageManager.getlocal("playercomebackcodetip7"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(txt);
        state.width = txt.width + 65;
        txt.touchEnabled = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, state, juzhou, [0, 20]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, state);
        var list = ComponentManager.getScrollList(PlayerComeBackTaskItem, [], new egret.Rectangle(0, 0, 480, GameConfig.stageHeigth - 268 - 50 - juzhou.height - 10));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, juzhou, [0, juzhou.height + 5]);
        view.addChild(list);
        view._list = list;
        view.update();
    };
    WelfareViewPlayerComeBackTab1.prototype.updateArr = function (arr) {
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
                arr1.push(arr[i]);
            }
            else {
                if (rechareTotal >= arr[i].needGem) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        arr1.sort(function (a, b) {
            return b.id - a.id;
        });
        return arr2.concat(arr3).concat(arr1);
    };
    WelfareViewPlayerComeBackTab1.prototype.rewardCallback = function (evt) {
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
    WelfareViewPlayerComeBackTab1.prototype.update = function () {
        var view = this;
        var taskarr = view.updateArr(view.cfg.comeReward);
        //排名列表
        var obj = [];
        obj.push({
            data: taskarr[0],
            type: "invite"
        });
        view._list.refreshData(obj);
    };
    WelfareViewPlayerComeBackTab1.prototype.modelFresh = function () {
        var view = this;
    };
    WelfareViewPlayerComeBackTab1.prototype.dispose = function () {
        var view = this;
        view._inputTextField = null;
        view._list = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK, this.update, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD, view.rewardCallback, view);
        _super.prototype.dispose.call(this);
    };
    return WelfareViewPlayerComeBackTab1;
}(CommonViewTab));
__reflect(WelfareViewPlayerComeBackTab1.prototype, "WelfareViewPlayerComeBackTab1");
//# sourceMappingURL=WelfareViewPlayerComeBackTab1.js.map