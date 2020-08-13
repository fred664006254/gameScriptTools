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
var ComposeNeedLvupNewView = (function (_super) {
    __extends(ComposeNeedLvupNewView, _super);
    function ComposeNeedLvupNewView() {
        return _super.call(this) || this;
    }
    ComposeNeedLvupNewView.prototype.initView = function () {
        var _this = this;
        //上方左侧
        var playerContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(playerContainer);
        var nextPlayer = Api.playerVoApi.getMyNextLvPortrait();
        nextPlayer.anchorOffsetX = nextPlayer.width / 2;
        nextPlayer.setPosition(190, 220);
        nextPlayer.setScale(0.65);
        playerContainer.addChild(nextPlayer);
        var mask = egret.Rectangle.create();
        mask.setTo(0, 0, this.viewBg.width, 487);
        playerContainer.mask = mask;
        var nextOfficeBg = BaseBitmap.create("composeneedlvupviewbg_new_tipbg");
        this.addChildToContainer(nextOfficeBg);
        nextOfficeBg.setPosition(70, 440);
        var nextOfficeNeedTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeneedlvup_new_office"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        nextOfficeNeedTxt.setPosition(nextOfficeBg.x + 20, nextOfficeBg.y + 12);
        this.addChildToContainer(nextOfficeNeedTxt);
        var nextOfficeTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerMinLevelStr(Api.playerVoApi.getPlayerMinLevelId() + 1), 24, TextFieldConst.COLOR_QUALITY_YELLOW_NEW);
        nextOfficeTxt.setPosition(nextOfficeBg.x + 120, nextOfficeBg.y + 9);
        this.addChildToContainer(nextOfficeTxt);
        //上方右侧
        var nextChallengeBg = BaseBitmap.create("composeneedlvupviewbg_new_tipbg");
        this.addChildToContainer(nextChallengeBg);
        nextChallengeBg.setPosition(335, 440);
        var nextChallengeNeedTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeneedlvup_new_challenge"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        nextChallengeNeedTxt.setPosition(nextChallengeBg.x + 20, nextChallengeBg.y + 12);
        this.addChildToContainer(nextChallengeNeedTxt);
        var nextAddPersonId = Config.ChallengelvCfg.getNextAddChallengeId(Api.challengeVoApi.getHasPassId());
        var nextChallengeTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeneedlvup_new_challengeTitle", [Api.challengeVoApi.getBigChannelIdByCid2(nextAddPersonId) + '']), 24, TextFieldConst.COLOR_QUALITY_YELLOW_NEW);
        nextChallengeTxt.setPosition(nextChallengeBg.x + 110, nextChallengeBg.y + 9);
        this.addChildToContainer(nextChallengeTxt);
        //下方展示
        var curMinLv = Api.playerVoApi.getPlayerMinLevelId();
        var nextLvCfg = Config.MinlevelCfg.getCfgByMinLevelId(curMinLv + 1);
        var isShowGold = Api.mainTaskVoApi.getHistoryMaxLevyRate() < nextLvCfg.needRate;
        var isShowPromp = Api.playerVoApi.getPlayerExp() < nextLvCfg.exp;
        isShowPromp = false;
        isShowGold = false;
        var leftPartCenterX = 193;
        var rightPartCenterX = 458;
        //赚速
        if (isShowGold) {
            var needGoldStr = LanguageManager.getlocal("composeneedlvup_new_needGoldSpeed", [App.StringUtil.changeIntToText3(nextLvCfg.needRate - Api.mainTaskVoApi.getHistoryMaxLevyRate())]);
            var goldTxt = ComponentManager.getTextField(needGoldStr, 18, TextFieldConst.COLOR_BROWN_NEW);
            goldTxt.textAlign = egret.HorizontalAlign.CENTER;
            goldTxt.setPosition(leftPartCenterX - goldTxt.width / 2, 495);
            this.addChildToContainer(goldTxt);
            var conBtnKey = "composeGoCompose";
            var conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, conBtnKey, function () {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
                _this.hide();
            }, this);
            conBtn.setPosition(leftPartCenterX - conBtn.width / 2, goldTxt.y + goldTxt.height - 3);
            this.addChildToContainer(conBtn);
            if (!isShowPromp) {
                goldTxt.y += 44;
                conBtn.y += 44;
            }
        }
        //政绩
        if (isShowPromp) {
            var needPrompStr = LanguageManager.getlocal("composeneedlvup_new_needPromp", [String(nextLvCfg.exp - Api.playerVoApi.getPlayerExp())]);
            var prompTxt = ComponentManager.getTextField(needPrompStr, 18, TextFieldConst.COLOR_BROWN_NEW);
            prompTxt.textAlign = egret.HorizontalAlign.CENTER;
            prompTxt.setPosition(leftPartCenterX - prompTxt.width / 2, 597);
            this.addChildToContainer(prompTxt);
            var conBtnKey = "composeGoChallenge";
            var conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, conBtnKey, function () {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK);
                _this.hide();
            }, this);
            conBtn.setPosition(leftPartCenterX - conBtn.width / 2, prompTxt.y + prompTxt.height - 3);
            this.addChildToContainer(conBtn);
            if (!isShowGold) {
                prompTxt.y -= 58;
                conBtn.y -= 58;
            }
        }
        //赚速政绩都没有 去升官
        if (!isShowPromp && !isShowGold) {
            var canUpStr = LanguageManager.getlocal("composeneedlvup_new_canLevelUp");
            var canUpTxt = ComponentManager.getTextField(canUpStr, 18, TextFieldConst.COLOR_BROWN_NEW);
            canUpTxt.textAlign = egret.HorizontalAlign.CENTER;
            canUpTxt.setPosition(leftPartCenterX - canUpTxt.width / 2, 557);
            this.addChildToContainer(canUpTxt);
            var conBtnKey = "composeGoUpLv";
            var conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, conBtnKey, function () {
                PlayerBottomUI.getInstance().show();
                _this.hide();
            }, this);
            conBtn.setPosition(leftPartCenterX - conBtn.width / 2, canUpTxt.y + canUpTxt.height - 3);
            this.addChildToContainer(conBtn);
        }
        //右边去关卡
        var needChallengeStr = LanguageManager.getlocal("composeneedlvup_new_needChallenge", [String(nextAddPersonId - Api.challengeVoApi.getHasPassId())]);
        var challengeTxt = ComponentManager.getTextField(needChallengeStr, 18, TextFieldConst.COLOR_BROWN_NEW);
        challengeTxt.textAlign = egret.HorizontalAlign.CENTER;
        challengeTxt.setPosition(rightPartCenterX - challengeTxt.width / 2, 557);
        this.addChildToContainer(challengeTxt);
        var rightConBtnKey = "composeGoChallenge";
        var rightConBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, rightConBtnKey, function () {
            //  App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK);
            ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
            _this.hide();
        }, this);
        rightConBtn.setPosition(rightPartCenterX - rightConBtn.width / 2, challengeTxt.y + challengeTxt.height - 3);
        this.addChildToContainer(rightConBtn);
    };
    ComposeNeedLvupNewView.prototype.getTitleStr = function () {
        return null;
    };
    ComposeNeedLvupNewView.prototype.getCloseBtnName = function () {
        return "btn_win_closebtn";
    };
    ComposeNeedLvupNewView.prototype.getBgName = function () {
        return "composeneedlvupviewbg_new_bg";
    };
    ComposeNeedLvupNewView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.y = this.viewBg.y + 5;
    };
    ComposeNeedLvupNewView.prototype.getResourceList = function () {
        var resArr = [
            "composeneedlvupviewbg_new_tipbg"
        ];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    ComposeNeedLvupNewView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ComposeNeedLvupNewView;
}(PopupView));
__reflect(ComposeNeedLvupNewView.prototype, "ComposeNeedLvupNewView");
