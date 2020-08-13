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
//接受邀请
var WelfareViewNewInviteTab2 = (function (_super) {
    __extends(WelfareViewNewInviteTab2, _super);
    function WelfareViewNewInviteTab2(param) {
        var _this = _super.call(this) || this;
        _this._inputTextField = null;
        _this._inputText = null;
        _this._collect = null;
        _this._collectBtn = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(WelfareViewNewInviteTab2.prototype, "api", {
        get: function () {
            return Api.newinviteVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WelfareViewNewInviteTab2.prototype, "cfg", {
        get: function () {
            return Config.Invitefriend2Cfg;
        },
        enumerable: true,
        configurable: true
    });
    WelfareViewNewInviteTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWINVITE_BIND, view.rewardCallback, view);
        var juzhou = BaseBitmap.create("newinvitelistbg1");
        view.addChild(juzhou);
        juzhou.height = GameConfig.stageHeigth - 89 - 66 - 168;
        juzhou.width = 490;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, 0], true);
        var kuang = BaseBitmap.create("newinvitelistbgkuang");
        view.addChild(kuang);
        kuang.width = juzhou.width + 10;
        kuang.height = juzhou.height + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, kuang, juzhou);
        var myCode = view.api.getBindCode();
        var inputTxt = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 440, 40, "public_9_bg5", '', TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(inputTxt);
        view._inputText = inputTxt;
        view._inputTextField = inputTxt.getChildByName("textField");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, inputTxt, juzhou, [0, 33]);
        //绑定
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "sysConfirm", function () {
            if (view._inputTextField.text != "") {
                NetManager.request(NetRequestConst.REQUEST_NEWINVITE_BIND, {
                    bindCode: view._inputTextField.text,
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("newinvitecodetip1"));
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardBtn, inputTxt, [0, inputTxt.height + 15]);
        view.addChild(rewardBtn);
        view._collectBtn = rewardBtn;
        if (view.api.getIsBindWithUid()) {
            inputTxt.visible = rewardBtn.visible = false;
            var tipTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("newinvitecodetip4", [view.api.getBindUid().toString()]), 20, TextFieldConst.COLOR_BLACK);
            view.addChild(tipTxt_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt_1, inputTxt);
            if (view.api.isSendApply() || view.api.isMyFriend(Api.newinviteVoApi.getBindUid())) {
                var sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.api.isSendApply() ? "newinvitecodetip5" : 'newinvitecodetip11'), 20, TextFieldConst.COLOR_BLACK);
                view.addChild(sendTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendTxt, tipTxt_1, [0, tipTxt_1.textHeight + 15]);
            }
            else {
                var sendBtn_1 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "newinvitecodetip6", function () {
                    if (Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("dailyTask_friendTip"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY, { fuid: Api.newinviteVoApi.getBindUid() });
                    sendBtn_1.visible = false;
                    App.CommonUtil.showTip(LanguageManager.getlocal("newinvitecodetip5"));
                    var sendTxt = ComponentManager.getTextField(LanguageManager.getlocal("newinvitecodetip5"), 20, TextFieldConst.COLOR_BLACK);
                    view.addChild(sendTxt);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendTxt, tipTxt_1, [0, tipTxt_1.textHeight + 15]);
                }, view);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn_1, inputTxt, [0, inputTxt.height + 15]);
                view.addChild(sendBtn_1);
                if (Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv) {
                    sendBtn_1.setGray(true);
                }
            }
        }
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("newinvitecodetip2"), 20, 0x635346);
        view.addChild(tipTxt);
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, rewardBtn, [0, rewardBtn.height + 25]);
        tipTxt.x = 25;
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("newinvitecodetip3"), 20, 0x3e1f0f);
        view.addChild(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, rewardBtn, [0, rewardBtn.height + 155]);
        //奖励
        var rewardBg = BaseBitmap.create("public_9_bg96");
        rewardBg.width = 450;
        rewardBg.height = 115;
        rewardBg.x = juzhou.x + 20;
        rewardBg.y = tipTxt2.y + tipTxt2.height + 7;
        view.addChild(rewardBg);
        var str = Config.Invitefriend2Cfg.bindReward;
        var contentList = GameData.formatRewardItem(str);
        var reward = "";
        var scroStartY = rewardBg.y + 13;
        var tmpX = rewardBg.x + 10;
        var deltaS = 0.74;
        for (var index = 0; index < contentList.length; index++) {
            var tmpData = contentList[index];
            var iconItem = GameData.getItemIcon(tmpData, true, true);
            iconItem.setScale(deltaS);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * deltaS + 7);
            if (tmpX > (rewardBg.x + rewardBg.width)) {
                tmpX = rewardBg.x + 13;
                scroStartY += iconItem.height * deltaS + 7;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * deltaS + 7);
            }
            view.addChild(iconItem);
        }
        scroStartY += 93;
        rewardBg.height = scroStartY - rewardBg.y + 2;
        var tmpVo = Api.newinviteVoApi;
        var collectFlag = BaseBitmap.create("collectflag");
        collectFlag.anchorOffsetX = collectFlag.width / 2;
        collectFlag.anchorOffsetY = collectFlag.height / 2;
        collectFlag.setScale(0.7);
        collectFlag.x = rewardBg.x + (rewardBg.width - collectFlag.width) / 2 + collectFlag.anchorOffsetX;
        collectFlag.y = rewardBg.y + rewardBg.height + 15 + collectFlag.anchorOffsetY;
        view.addChild(collectFlag);
        collectFlag.visible = tmpVo.isGetInviteBind();
        view._collect = collectFlag;
    };
    WelfareViewNewInviteTab2.prototype.rewardCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var rData = evt.data.data.data;
            //绑定成功
            if (rData.bindFlag == 1) {
                var rewards = rData.rewards;
                var rewardList = GameData.formatRewardItem(rewards);
                // App.CommonUtil.playRewardFlyAction(rewardList,  view._collectBtn.localToGlobal(view._collectBtn.width/2 + 50,20));
                ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW, {
                    rewards: rewards,
                });
                view._collect.visible = false;
                view._collect.setScale(1.3);
                view._collect.visible = true;
                egret.Tween.get(view._collect).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
                if (view.api.getIsBindWithUid()) {
                    view._inputText.visible = view._collectBtn.visible = false;
                    var tipTxt_2 = ComponentManager.getTextField(LanguageManager.getlocal("newinvitecodetip4", [view.api.getBindUid().toString()]), 20, TextFieldConst.COLOR_BLACK);
                    view.addChild(tipTxt_2);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt_2, view._inputText);
                    if (view.api.isSendApply() || view.api.isMyFriend(Api.newinviteVoApi.getBindUid())) {
                        var sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.api.isSendApply() ? "newinvitecodetip5" : 'newinvitecodetip11'), 20, TextFieldConst.COLOR_BLACK);
                        view.addChild(sendTxt);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendTxt, tipTxt_2, [0, tipTxt_2.textHeight + 15]);
                    }
                    else {
                        var sendBtn_2 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "newinvitecodetip6", function () {
                            if (Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("dailyTask_friendTip"));
                                return;
                            }
                            NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY, { fuid: Api.newinviteVoApi.getBindUid() });
                            sendBtn_2.visible = false;
                            App.CommonUtil.showTip(LanguageManager.getlocal("newinvitecodetip5"));
                            var sendTxt = ComponentManager.getTextField(LanguageManager.getlocal("newinvitecodetip5"), 20, TextFieldConst.COLOR_BLACK);
                            view.addChild(sendTxt);
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendTxt, tipTxt_2, [0, tipTxt_2.textHeight + 15]);
                        }, view);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn_2, view._inputText, [0, view._inputText.height + 15]);
                        view.addChild(sendBtn_2);
                        if (Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv) {
                            sendBtn_2.setGray(true);
                        }
                    }
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("newinvitebindtip" + rData.bindCode));
            }
        }
    };
    WelfareViewNewInviteTab2.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWINVITE_BIND, view.rewardCallback, view);
        view._inputTextField = null;
        view._collect = null;
        view._collectBtn = null;
        view._inputText = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewNewInviteTab2;
}(CommonViewTab));
__reflect(WelfareViewNewInviteTab2.prototype, "WelfareViewNewInviteTab2");
//# sourceMappingURL=WelfareViewNewInviteTab2.js.map