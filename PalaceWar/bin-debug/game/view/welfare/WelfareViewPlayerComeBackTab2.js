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
//我被召回
var WelfareViewPlayerComeBackTab2 = (function (_super) {
    __extends(WelfareViewPlayerComeBackTab2, _super);
    function WelfareViewPlayerComeBackTab2(param) {
        var _this = _super.call(this) || this;
        _this._inputTextField = null;
        _this._inputText = null;
        _this._collect = null;
        _this._collectBtn = null;
        _this._timeTxt = null;
        _this._bg = null;
        _this._group = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(WelfareViewPlayerComeBackTab2.prototype, "api", {
        get: function () {
            return Api.newrebackVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WelfareViewPlayerComeBackTab2.prototype, "cfg", {
        get: function () {
            return Config.PlayercomebackCfg;
        },
        enumerable: true,
        configurable: true
    });
    WelfareViewPlayerComeBackTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_REBACK_BIND, view.rewardCallback, view);
        var juzhou = BaseBitmap.create("newinvitelistbg1");
        view.addChild(juzhou);
        juzhou.height = GameConfig.stageHeigth - 89 - 66 - 168;
        juzhou.width = 490;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, 0], true);
        view._bg = juzhou;
        var group = new BaseDisplayObjectContainer();
        view._group = group;
        var kuang = BaseBitmap.create("newinvitelistbgkuang");
        view.addChild(kuang);
        kuang.width = juzhou.width + 10;
        kuang.height = juzhou.height + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, kuang, juzhou);
        var timecdTxt = ComponentManager.getTextField("a", 22, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timecdTxt, juzhou, [0, 25]);
        group.addChild(timecdTxt);
        view._timeTxt = timecdTxt;
        var myCode = view.api.getBindCode();
        var inputTxt = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 440, 40, "public_9_bg5", '', TextFieldConst.COLOR_LIGHT_YELLOW);
        group.addChild(inputTxt);
        view._inputText = inputTxt;
        view._inputTextField = inputTxt.getChildByName("textField");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, inputTxt, timecdTxt, [0, timecdTxt.height + 15]);
        //绑定
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "sysConfirm", function () {
            if (rewardBtn.getIsGray()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("playercomebackcodetip12"));
                return;
            }
            if (Api.playerVoApi.getPlayerPower() < Config.PlayercomebackCfg.needPower) {
                App.CommonUtil.showTip(LanguageManager.getlocal("playercomebackcodetip14", [App.StringUtil.changeIntToText(Config.PlayercomebackCfg.needPower)]));
                return;
            }
            if (view._inputTextField.text != "") {
                NetManager.request(NetRequestConst.REQUEST_REBACK_BIND, {
                    bindCode: view._inputTextField.text,
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("playercomebackcodetip1"));
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardBtn, inputTxt, [0, inputTxt.height + 15]);
        group.addChild(rewardBtn);
        view._collectBtn = rewardBtn;
        if (Api.playerVoApi.getPlayerPower() < Config.PlayercomebackCfg.needPower) {
            rewardBtn.setGray(true);
        }
        if (view.api.getIsBindWithUid()) {
            inputTxt.visible = rewardBtn.visible = timecdTxt.visible = false;
            var tipTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("playercomebackcodetip4", [view.api.getBindUid().toString()]), 20, TextFieldConst.COLOR_BLACK);
            group.addChild(tipTxt_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt_1, inputTxt);
            if (view.api.isSendApply() || view.api.isMyFriend(Api.newrebackVoApi.getBindUid())) {
                var sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.api.isSendApply() ? "newinvitecodetip5" : 'newinvitecodetip11'), 20, TextFieldConst.COLOR_BLACK);
                group.addChild(sendTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendTxt, tipTxt_1, [0, tipTxt_1.textHeight + 15]);
            }
            else {
                var sendBtn_1 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "newinvitecodetip6", function () {
                    if (Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("dailyTask_friendTip"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY, { fuid: Api.newrebackVoApi.getBindUid() });
                    sendBtn_1.visible = false;
                    App.CommonUtil.showTip(LanguageManager.getlocal("newinvitecodetip5"));
                    var sendTxt = ComponentManager.getTextField(LanguageManager.getlocal("newinvitecodetip5"), 20, TextFieldConst.COLOR_BLACK);
                    group.addChild(sendTxt);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendTxt, tipTxt_1, [0, tipTxt_1.textHeight + 15]);
                }, view);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn_1, inputTxt, [0, inputTxt.height + 15]);
                group.addChild(sendBtn_1);
                if (Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv) {
                    sendBtn_1.setGray(true);
                }
            }
        }
        var limitday = 7;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("playercomebackcodetip2", [Api.playerVoApi.getPlayerOfficeByLevel(Config.PlayerreturnCfg.playerStatusneed), Config.PlayerreturnCfg.timeGap[0].toString(), App.StringUtil.changeIntToText(Config.PlayercomebackCfg.needPower), limitday.toString()]), 20, 0x635346);
        group.addChild(tipTxt);
        tipTxt.width = 400;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, rewardBtn, [0, rewardBtn.height + 25]);
        tipTxt.x = 25;
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("playercomebackcodetip3"), 20, 0x3e1f0f);
        group.addChild(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, rewardBtn, [0, rewardBtn.height + 25 + tipTxt.height + 40]);
        //奖励
        var rewardBg = BaseBitmap.create("public_9_bg96");
        rewardBg.width = 450;
        rewardBg.height = 115;
        rewardBg.x = juzhou.x + 20;
        rewardBg.y = tipTxt2.y + tipTxt2.height + 7;
        group.addChild(rewardBg);
        var str = Config.PlayercomebackCfg.backReward;
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
            group.addChild(iconItem);
        }
        scroStartY += 93;
        rewardBg.height = scroStartY - rewardBg.y + 2;
        var tmpVo = Api.newrebackVoApi;
        var collectFlag = BaseBitmap.create("collectflag");
        collectFlag.anchorOffsetX = collectFlag.width / 2;
        collectFlag.anchorOffsetY = collectFlag.height / 2;
        collectFlag.setScale(0.7);
        collectFlag.x = rewardBg.x + (rewardBg.width - collectFlag.width) / 2 + collectFlag.anchorOffsetX;
        collectFlag.y = rewardBg.y + rewardBg.height + 15 + collectFlag.anchorOffsetY;
        group.addChild(collectFlag);
        collectFlag.visible = tmpVo.isGetInviteBind();
        view._collect = collectFlag;
        var scrollview = ComponentManager.getScrollView(group, new egret.Rectangle(0, 0, juzhou.width, juzhou.height - 10));
        view.addChild(scrollview);
        scrollview.horizontalScrollPolicy = "off";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, juzhou, [0, 0]);
        TickManager.addTick(view.tick, view);
        view.tick();
    };
    WelfareViewPlayerComeBackTab2.prototype.rewardCallback = function (evt) {
        var view = this;
        var group = view._group;
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
                    view._inputText.visible = view._collectBtn.visible = view._timeTxt.visible = false;
                    var tipTxt_2 = ComponentManager.getTextField(LanguageManager.getlocal("playercomebackcodetip4", [view.api.getBindUid().toString()]), 20, TextFieldConst.COLOR_BLACK);
                    group.addChild(tipTxt_2);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt_2, view._inputText);
                    if (view.api.isSendApply() || view.api.isMyFriend(Api.newrebackVoApi.getBindUid())) {
                        var sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.api.isSendApply() ? "newinvitecodetip5" : 'newinvitecodetip11'), 20, TextFieldConst.COLOR_BLACK);
                        group.addChild(sendTxt);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendTxt, tipTxt_2, [0, tipTxt_2.textHeight + 15]);
                    }
                    else {
                        var sendBtn_2 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "newinvitecodetip6", function () {
                            if (Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("dailyTask_friendTip"));
                                return;
                            }
                            NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY, { fuid: Api.newrebackVoApi.getBindUid() });
                            sendBtn_2.visible = false;
                            App.CommonUtil.showTip(LanguageManager.getlocal("newinvitecodetip5"));
                            var sendTxt = ComponentManager.getTextField(LanguageManager.getlocal("newinvitecodetip5"), 20, TextFieldConst.COLOR_BLACK);
                            group.addChild(sendTxt);
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendTxt, tipTxt_2, [0, tipTxt_2.textHeight + 15]);
                        }, view);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn_2, view._inputText, [0, view._inputText.height + 15]);
                        group.addChild(sendBtn_2);
                        if (Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv) {
                            sendBtn_2.setGray(true);
                        }
                    }
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("playercomebackbindtip" + rData.bindCode));
            }
        }
    };
    WelfareViewPlayerComeBackTab2.prototype.tick = function () {
        var view = this;
        var time = view.api.getLimitCD();
        if (time > 0 && view.api.isInReturnTime()) {
            view._timeTxt.text = LanguageManager.getlocal("playercomebackcodetip11", [App.DateUtil.getFormatBySecond(time, 17)]);
            view._collectBtn.setGray(false);
        }
        else {
            view._timeTxt.text = LanguageManager.getlocal("playercomebackcodetip12");
            view._collectBtn.setGray(true);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._timeTxt, view._bg, [0, 25]);
    };
    WelfareViewPlayerComeBackTab2.prototype.dispose = function () {
        var view = this;
        TickManager.removeTick(view.tick, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_REBACK_BIND, view.rewardCallback, view);
        view._inputTextField = null;
        view._inputText = null;
        view._collect = null;
        view._collectBtn = null;
        view._timeTxt = null;
        view._bg = null;
        view._group.dispose();
        view._group = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewPlayerComeBackTab2;
}(CommonViewTab));
__reflect(WelfareViewPlayerComeBackTab2.prototype, "WelfareViewPlayerComeBackTab2");
//# sourceMappingURL=WelfareViewPlayerComeBackTab2.js.map